import { LoaderCircleIcon, PencilIcon, PlusIcon, Trash2Icon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { all } from 'axios';
import toast from 'react-hot-toast';
import api from '../configs/api';
import pfdfToText from 'react-pdftotext'

const Dashboard = () => {

const {user , token} = useSelector(state => state.auth)
const [allResumes, setallResumes] = useState([]);

const [showCreateResume, setShowCreateResume] = useState(false);
const [showUploadResume, setShowUploadResume] = useState(false);
const [title, setTitle] = useState("");
const [resume, setResume] = useState(null);
const [editResumeId, setEditResumeId] = useState('');
const [uploading, setUploading] = useState(false);
const [uploadSuccess, setUploadSuccess] = useState(false);
const [uploadError, setUploadError] = useState("");
const [isLoading, setIsLoading] = useState(false);
const handleFileChange = (e) => {
  setResume(e.target.files[0]);
  setUploadError("");
  setUploadSuccess(false);
};

const handleUpload = async (e) => {
 e.preventDefault()
 setIsLoading(true);
 try {
  const resumeText = await pfdfToText(resume);
  const { data } = await api.post(
      '/api/ai/upload-resume',
      { title, resumeText },
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    );
    setTitle('');
    setShowUploadResume(false);
    navigate(`/app/builder/${data.resumeId}`)
 } catch (error) {
  toast.error(error.message)
 }
 setIsLoading(false);
};


const navigate = useNavigate();

const loadResumes = async() => {
    try {
      const { data } = await api.get(
      '/api/users/resumes',
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    console.log(data.resumes);
    setallResumes(data.resumes)
      
    } catch (error) {
      toast.error(error.message);
    }
}
const createResume = async (e) => {
  try {
    e.preventDefault();
    const { data } = await api.post(
      '/api/resumes/create',
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    setallResumes([...allResumes, data.resume]);
    setTitle('');
    setShowCreateResume(false);
    navigate(`/app/builder/${data.resume._id}`);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

const deleteResume = async(resumeId) => {
  try {
    const confimmDelete = window.confirm("Are you sure you want to delete this resume?");
    if (confimmDelete) {
       const {data} = await api.delete(
      `/api/resumes/delete/${resumeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
        // Logic to delete resume
        setallResumes(allResumes.filter(resume => resume._id !== resumeId));
        toast.success(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

useEffect(() => {
    loadResumes();
}, []);
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl'>Welcome Abhay</p>
        <div className='flex gap-6 mt-8'>
          <button onClick={()=> setShowCreateResume(true)}
            className='flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400'
          >
            <PlusIcon className='w-7 h-7 mb-1'/>
            <p className='font-semibold text-base'>Create Resume</p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className='flex flex-col items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-500 text-white hover:bg-green-600 shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400'
          >
            <UploadCloudIcon className='w-7 h-7 mb-1'/>
            <p className='font-semibold text-base'>Upload Resume</p>
          </button>
        </div>
        <hr className='border-slate-800 my-6 sm:w-[340px]'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {allResumes.map((resume, idx) => (
            <div key={idx} className='relative flex flex-col border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 bg-white group'>
              <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button  className="p-1 rounded-full hover:bg-gray-100 transition" title="Edit Resume">
                  <PencilIcon onClick={(e)=>navigate(`/app/builder/${resume._id}`)} className="w-5 h-5 text-blue-500" />
                </button>
                <button onClick={()=>deleteResume(resume._id)} className="p-1 rounded-full hover:bg-gray-100 transition" title="Delete Resume">
                  <Trash2Icon className="w-5 h-5 text-red-500" />
                </button>
              </div>
              <img src="https://marketplace.canva.com/EAFszEvkM50/2/0/1131w/canva-simple-professional-cv-resume-36p5VOFVDxY.jpg" alt={resume?.name} className='w-full h-40 object-cover rounded-md'/>
              <p className='mt-2 font-semibold text-lg truncate'>{resume.title}</p>
              <p className='text-sm text-gray-400 '> Updated on {new Date(resume.updatedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        {showCreateResume && (
            <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)}className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>

                <div onClick= {e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                    <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
                    <input onChange={(e)=> setTitle(e.target.value)} value={title} type="text"  placeholder='Enter Resume title' className='w-full px-4 py-2 mb-4 focus:border-y-green-600 ring-green-600' required/>
                    <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
                    <XIcon onClick={() => {setShowCreateResume(false); setTitle('')}}className='w-6 h-6 absolute top-4 right-4 cursor-pointer text-gray-800'/>
                </div>
            </form>
        )}

              {showUploadResume && (
                <form
                  onSubmit={handleUpload}
                  onClick={() => { if (!uploading) setShowUploadResume(false); }}
                  className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-20 flex items-center justify-center'
                >
                  <div
                    onClick={e => e.stopPropagation()}
                    className='relative bg-white border border-green-200 shadow-2xl rounded-2xl w-full max-w-sm p-8 flex flex-col items-center animate-fadeIn'
                  >
                    <XIcon
                      onClick={() => { setShowUploadResume(false); setResume(null); setUploadError(""); setUploadSuccess(false); }}
                      className='w-6 h-6 absolute top-4 right-4 cursor-pointer text-green-600 hover:bg-green-100 rounded-full p-1 transition'/>
                    <UploadCloudIcon className='w-12 h-12 text-green-500 mb-2'/>
                    <h2 className='text-2xl font-bold mb-2 text-green-700'>Upload a Resume</h2>
                    <p className='text-gray-500 mb-4 text-center'>Accepted formats: PDF, DOC, DOCX</p>
                    <label className='w-full flex flex-col items-center px-4 py-6 bg-green-50 text-green-700 rounded-lg border-2 border-dashed border-green-300 cursor-pointer hover:bg-green-100 transition mb-4'>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className='hidden'
                        onChange={handleFileChange}
                        disabled={uploading}
                      />
                      {resume ? (
                        <span className='truncate w-full text-green-800 font-medium'>{resume.name}</span>
                      ) : (
                        <span className='text-green-600'>Click to select a file</span>
                      )}
                    </label>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className={`w-full py-2 rounded font-semibold transition-colors ${uploading ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'} text-white mt-2 flex items-center justify-center`}
                    >
                      {isLoading &&  <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
                      {isLoading ? ' Uploading...' : 'Upload Resume'}
                    </button>
                    {uploadSuccess && (
                      <div className='mt-3 text-green-600 font-semibold text-center'>Upload successful!</div>
                    )}
                    {uploadError && (
                      <div className='mt-3 text-red-500 font-medium text-center'>{uploadError}</div>
                    )}
                  </div>
                </form>
              )}

      </div>
    </div>
  )
}

export default Dashboard
