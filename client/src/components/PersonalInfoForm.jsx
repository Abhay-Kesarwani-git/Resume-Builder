import React from "react";
import { ImageIcon, User, FileText, Briefcase as BriefcaseIcon, MapPin, Linkedin, Globe } from 'lucide-react';

const PersonalInfoForm = ({ avatar, setAvatar, removeBackground, setRemoveBackground, resumeData, setResumeData }) => {
  const info = resumeData.professional_info || {};
  return (
    <>
      <div className='flex flex-col items-center px-6'>
        <label className='flex flex-col items-center gap-2 cursor-pointer mb-4'>
          {avatar ? (
            <span className='w-16 h-16 flex items-center justify-center rounded-full overflow-hidden border-2 border-green-400 bg-gray-50'>
              <img src={avatar} alt='avatar' className='w-full h-full object-cover'/>
            </span>
          ) : (
            <span className='w-16 h-16 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 text-2xl'>
              <ImageIcon className='w-8 h-8'/>
            </span>
          )}
          <span className='text-xs text-gray-500'>upload user image</span>
          <input type='file' className='hidden' accept='image/*' onChange={e => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) => setAvatar(ev.target.result);
              reader.readAsDataURL(file);
            }
          }} />
        </label>
        {avatar && (
          <button
            type='button'
            className={`mt-2 px-4 py-1.5 rounded-full bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition`}
            onClick={() => setRemoveBackground(true)}
          >
            Remove Background
          </button>
        )}
        {removeBackground && avatar && (
          <span className='text-xs text-green-700 mt-1'>Background removed (demo)</span>
        )}
      </div>
      <div className='space-y-4 px-6 pb-6'>
        <div className='flex flex-col gap-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <User className='w-4 h-4' /> Full Name <span className='text-red-500'>*</span>
          </label>
          <input type='text' className='w-full border rounded px-3 py-2' placeholder='Enter your full name' value={info.full_name || ''} onChange={e => setResumeData(d => ({ ...d, professional_info: { ...d.professional_info, full_name: e.target.value } }))} />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <FileText className='w-4 h-4' /> Email Address <span className='text-red-500'>*</span>
          </label>
          <input type='email' className='w-full border rounded px-3 py-2' placeholder='Enter your email address' value={info.email || ''} onChange={e => setResumeData(d => ({ ...d, professional_info: { ...d.professional_info, email: e.target.value } }))} />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <BriefcaseIcon className='w-4 h-4' /> Profession
          </label>
          <input type='text' className='w-full border rounded px-3 py-2' placeholder='Enter your profession' value={info.profession || ''} onChange={e => setResumeData(d => ({ ...d, professional_info: { ...d.professional_info, profession: e.target.value } }))} />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <MapPin className='w-4 h-4' /> Location
          </label>
          <input type='text' className='w-full border rounded px-3 py-2' placeholder='Enter your location' value={info.location || ''} onChange={e => setResumeData(d => ({ ...d, professional_info: { ...d.professional_info, location: e.target.value } }))} />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <User className='w-4 h-4' /> Phone Number
          </label>
          <input type='text' className='w-full border rounded px-3 py-2' placeholder='Enter your phone number' value={info.phone || ''} onChange={e => setResumeData(d => ({ ...d, professional_info: { ...d.professional_info, phone: e.target.value } }))} />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <Linkedin className='w-4 h-4' /> LinkedIn Profile
          </label>
          <input type='text' className='w-full border rounded px-3 py-2' placeholder='Enter your linkedin profile' value={info.linkedin || ''} onChange={e => setResumeData(d => ({ ...d, professional_info: { ...d.professional_info, linkedin: e.target.value } }))} />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <Globe className='w-4 h-4' /> Personal Website
          </label>
          <input type='text' className='w-full border rounded px-3 py-2' placeholder='Enter your personal website' value={info.website || ''} onChange={e => setResumeData(d => ({ ...d, professional_info: { ...d.professional_info, website: e.target.value } }))} />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
