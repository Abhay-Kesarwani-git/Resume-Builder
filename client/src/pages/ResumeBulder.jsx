import { useEffect, useState } from 'react'
import { useParams , Link} from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon , Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, SparkleIcon, User, ImageIcon, MapPin, Briefcase as BriefcaseIcon, Linkedin, Globe, Download, EyeOff, Eye, LocateIcon, Locate, Share } from 'lucide-react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ProfessionalSummary from '../components/ProfessionalSummary';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import ResumePreview from '../components/ResumePreview';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';


const ResumeBulder = () => {
const {resumeId} = useParams();
const {token} = useSelector(state => state.auth);
  const[resumeData,setResumeData] = useState({
    _id : '',
    title : '',
    professional_info : {
      full_name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      profession: '',
      image: ''
    },
    professional_summary : "",
    experience : [],
    education : [],
    projects : [],
    skills : [],
    template : 'classic',
    accent_color : '#2563eb',
    public : false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [avatar, setAvatar] = useState(null);



  const sections = [
    { id: 'personal', name : "Personal Info" ,  icon : User },
    { id: 'summary', name : "Summary" ,  icon : FileText },
    { id: 'experience', name : "Experience" ,  icon : Briefcase },
    { id: 'education', title: 'Education' , icon : GraduationCap },
    { id: 'projects', title: 'Projects' , icon : FolderIcon },
    { id: 'skills', title: 'Skills',  icon : SparkleIcon },

  ]

  const activeSection = sections[activeSectionIndex]; 

  const loadExistingResume = async(resumeId) => {
    try {
        const {data} = await api.get('/api/resumes/get/' + resumeId, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      })
    let resume = data.resume;
    if (resume) {
      // Patch for backward compatibility: map personal_info to professional_info if needed
      let patchedResume = { ...resume };
      if (resume.personal_info) {
        patchedResume.professional_info = { ...resume.personal_info };
      }
      // Ensure skills is always an array
      if (!Array.isArray(patchedResume.skills)) {
        patchedResume.skills = Array.isArray(patchedResume.professional_info?.skills)
          ? patchedResume.professional_info.skills
          : [];
      }
      // Patch for backward compatibility: map 'project' to 'projects' if needed
      if (!patchedResume.projects && Array.isArray(patchedResume.project)) {
        patchedResume.projects = patchedResume.project;
      }
      // Ensure experience, education, projects are arrays
      if (!Array.isArray(patchedResume.experience)) patchedResume.experience = [];
      if (!Array.isArray(patchedResume.education)) patchedResume.education = [];
      if (!Array.isArray(patchedResume.projects)) patchedResume.projects = [];
      setResumeData(patchedResume);
      console.log(patchedResume);
      // Prefill avatar if image exists
      if (patchedResume.professional_info && patchedResume.professional_info.image) {
        setAvatar(patchedResume.professional_info.image);
      }
      document.title = `Editing - ${resume.title}`;
    }
    } catch (error) {
        
        toast.error(error.message)
    }

  }
  
  const changeResumeVisibility = async () => {
   try {
     const formData = new FormData();
     formData.append('resumeId', resumeId)
     formData.append('resumeData', JSON.stringify({public : !resumeData.public}))
     const {data} = await api.put('/api/resumes/update', formData , {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      })
      setResumeData({...resumeData, public : !resumeData.public})
      toast.success(data.message);
   } catch (error) {
      toast.error(error.message)
   }
  }

const saveResume = async () => {
  try {
    if (!resumeData) return;

    // Work on a local clone (avoid relying on stale state)
    const patchedResume = structuredClone(resumeData);

    // Normalize backwards-compat fields
    if (patchedResume.personal_info && !patchedResume.professional_info) {
      patchedResume.professional_info = { ...patchedResume.personal_info };
      delete patchedResume.personal_info;
    }

    // Ensure arrays
    patchedResume.skills = Array.isArray(patchedResume.skills)
      ? patchedResume.skills
      : (Array.isArray(patchedResume.professional_info?.skills)
         ? patchedResume.professional_info.skills
         : []);

    if (!patchedResume.projects && Array.isArray(patchedResume.project)) {
      patchedResume.projects = patchedResume.project;
      delete patchedResume.project;
    }

    patchedResume.experience = Array.isArray(patchedResume.experience) ? patchedResume.experience : [];
    patchedResume.education = Array.isArray(patchedResume.education) ? patchedResume.education : [];
    patchedResume.projects = Array.isArray(patchedResume.projects) ? patchedResume.projects : [];

    // Remove image object (File) if present — JSON can't carry File objects
    if (typeof patchedResume.professional_info?.image === "object") {
      delete patchedResume.professional_info.image;
    }

    // === DEBUG: show exactly what we will send ===
    console.log("Sending patchedResume:", patchedResume);

    // Let axios serialize JSON automatically (no JSON.stringify needed)
    const payload = { resumeId, resumeData: patchedResume };

    const { data } = await api.put("/api/resumes/update", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response from server:", data);
    setResumeData(patchedResume);
    if (data.resume.professional_info?.image) setAvatar(data.resume.professional_info.image);
    document.title = `Editing - ${data.resume.title}`;
    toast.success(data.message);
  } catch (error) {
    console.error("saveResume error:", error.response?.data || error.message || error);
    toast.error(error.response?.data?.message || error.message);
  }
};



  
  
  useEffect(() => {
    loadExistingResume(resumeId);
  }
  , []);

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/app' className='inline-flex items-center gap-2 text-lg font-medium text-gray-700 hover:text-gray-900'>
          <ArrowLeftIcon className='w-5 h-5' />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-2xl overflow-hidden bg-white shadow p-0 border border-gray-100">
            {/* Tabs and Next */}
            <div className='flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-100'>
              <div className='flex gap-2'>
                <button className='px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-sm hover:bg-blue-100 transition'>
                  Template
                </button>
                <button className='px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-medium text-sm hover:bg-purple-100 transition'>
                  Accent
                </button>
              </div>
              <div className='flex gap-2'>
                {activeSectionIndex > 0 && (
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                    className='px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition 
                    flex items-center gap-1'
                  >
                    <ChevronLeft className='w-4 h-4' /> Previous
                  </button>
                )}
                <button
                  onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                  className='px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition flex items-center gap-1 ' disabled = {activeSectionIndex === sections.length -1}
                >
                  Next <ChevronRight className='w-4 h-4' />
                </button>
              </div>
            </div>
            {/* Section Title and Subtitle */}
            <div className='px-6 pt-4 pb-2'>
              <div className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                {activeSection.icon && <activeSection.icon className='w-5 h-5 text-green-600' />}
                {activeSection.name || activeSection.title}
              </div>
              <div className='text-gray-500 text-sm mb-4'>Get Started with the personal information</div>
            </div>
            {/* Avatar Upload */}
            {activeSection.id === 'personal' && (
              <PersonalInfoForm
                avatar={avatar}
                setAvatar={setAvatar}
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
            {/* Section Form Fields */}
            <form className='space-y-4 px-6 pb-6'>
              {/* Personal info fields moved to PersonalInfoForm */}
              {activeSection.id === 'summary' && (
                <ProfessionalSummary
                  professionalSummary={resumeData.professional_summary}
                  setProfessionalSummary={summary => setResumeData(d => ({ ...d, professional_summary: summary }))}
                />
              )}
              {activeSection.id === 'experience' && (
                <Experience
                  experiences={resumeData.experience}
                  setExperiences={(updatedExperience) => setResumeData(d => ({ ...d, experience: updatedExperience }))}
                />
              )}
              {activeSection.id === 'education' && (
                <Education
                  education={resumeData.education}
                  setEducation={(updatedEducation) => setResumeData(d => ({ ...d, education: updatedEducation }))}
                />
              )}
              {activeSection.id === 'projects' && (
                <Projects
                  projects={resumeData.projects}
                  setProjects={(updatedProjects) => setResumeData(d => ({ ...d, projects: updatedProjects }))}
                />
              )}
              {activeSection.id === 'skills' && (
                <Skills
                  skills={resumeData.skills}
                  setSkills={(updatedSkills) => setResumeData(d => ({ ...d, skills: updatedSkills }))}
                />
              )}
              <div className='pt-2'>
                <button onClick={()=> {toast.promise(saveResume, {loading : 'Saving...'})}} type='button' className='w-full py-2 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition'>Save Changes</button>
              </div>
            </form>
          </div>
           
          {/* Right Panel - Preview */}
          <ResumePreview resumeData = {resumeData} setResumeData = {setResumeData}/>
        </div>
      </div>
    </div>
  )
}

export default ResumeBulder
