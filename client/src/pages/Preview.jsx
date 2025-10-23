import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import Loader from '../components/Loader';
import ResumePreview from '../components/ResumePreview';

const Preview = () => {
  const { resumeId } = useParams();
  const nav = useNavigate();

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    professional_info: {
      full_name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      profession: '',
      image: ''
    },
    professional_summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: 'classic',
    accent_color: '#2563eb',
    public: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async (id) => {
  const data = dummyResumeData.find((resume) => resume._id === id);
  console.log('Loaded resume data:', data);

  if (data) {
    const normalizedData = {
      ...data,
      professional_info: data?.professional_info || data.personal_info || {},
      projects: data?.projects || data.project || [],
    };
    setResumeData(normalizedData);
  }

  setIsLoading(false);
};
const navigateToHomee = () => {
    nav('/');
  };

  // Load resume when component mounts or when resumeId changes
  useEffect(() => {
    loadResume(resumeId);
  }, []);

  // Log only when resumeData actually updates (for debugging)
  useEffect(() => {
    console.log('Updated resumeData:', resumeData);
  }, [resumeData]);

  // Proper conditional rendering
  if (isLoading) {
    return <Loader />;
  }

  if (!resumeData || !resumeData._id) {
    return (
        <div className='flex items-center justify-center h-screen'>
            <p className="text-center mt-20 text-gray-600 flex flex-col gap-4 text-8xl items-center">
        Resume not found.
        <button onClick={navigateToHomee} className='px-4 py-2 flex items-center justify-center text-white bg-green-400 rounded-xl text-xl w-fit'>Return to homepage</button>
      </p>
        </div>

    );
  }

  return (
    <div className="bg-slate-500 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview resumeData={resumeData} setResumeData={setResumeData} />
      </div>
    </div>
  );
};

export default Preview;
