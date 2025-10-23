import { Download, Eye, EyeOff, Share } from 'lucide-react';
import React, { useState } from 'react'

const ResumePreview = ({resumeData , setResumeData}) => {
  const [isPrivate, setIsPrivate] = useState(true);
  
  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + `/view/${resumeData._id}`;

    if(navigator.share){
        navigator.share({
            title : 'Check out my resume',
            url : resumeUrl
        })
    } else {
        alert("Share not supported" );
  }
}

  const handlePrintPDF = () => {
    const content = document.getElementById('resume');
    if (content) {
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = content.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
    } else {
      console.error('Content not found for printing');
    }
  };

  return (
    <div id = 'resume'className='lg:col-span-7 flex flex-col items-end '>
            {/* Buttons above the right panel */}
            <div className='flex gap-2 -mt-7 mb-1'>
              <button
                className={`px-4 py-1 rounded-full ${isPrivate ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'} font-medium text-sm flex items-center gap-1 hover:bg-purple-200 transition`}
                onClick={() => setIsPrivate(!isPrivate)}
              >
                {isPrivate ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                {isPrivate ? 'Private' : 'Public'}
              </button>
              {!isPrivate && (
                <button onClick={handleShare}
                  className='px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm flex items-center gap-1 hover:bg-blue-200 transition'
                >
                  <Share className='w-4 h-4' /> Share
                </button>
              )}
              <button
                className='px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm flex items-center gap-1 hover:bg-green-200 transition'
                onClick={handlePrintPDF}
              >
                <Download className='w-4 h-4' /> Download
              </button>
            </div>
            <div className='w-full bg-white rounded-2xl shadow p-8 relative font-[Inter,Arial,sans-serif] text-gray-900'>
              {/* Top right controls */}
             
              {/* Header: Links, Name, Contact */}
              <div className='flex flex-col items-center mb-2 pt-2'>
                <div className='flex w-full justify-between text-xs text-blue-700 font-medium mb-2'>
                  <div className='flex flex-col gap-1'>
                    {resumeData.personal_info?.linkedin && <a href={resumeData.professional_info.linkedin} className='hover:underline' target='_blank' rel='noopener noreferrer'>{resumeData.professional_info.linkedin}</a>}
                    {resumeData.professional_info?.website && <a href={resumeData.professional_info.website} className='hover:underline' target='_blank' rel='noopener noreferrer'>{resumeData.professional_info.website}</a>}
                  </div>
                  <div className='flex flex-col gap-1 text-right'>
                    {resumeData.professional_info?.email && <a href={`mailto:${resumeData.professional_info.email}`} className='hover:underline'>{resumeData.professional_info.email}</a>}
                    {resumeData.professional_info?.phone && <span>{resumeData.professional_info.phone}</span>}
                  </div>
                </div>
                <div className='text-2xl sm:text-3xl font-bold tracking-widest text-center mb-1 '>{resumeData.professional_info.full_name || 'YOUR NAME'}</div>
                <div className='text-2xl sm:text-sm font-bold tracking-widest text-center mb-1 flex gap-2'>{resumeData.professional_info.profession || 'YOUR NAME'} 
                    {/* |  <MapPin/> {resumeData.professional_info.location} */}
                    </div>
              </div>
              {/* Section: Education */}
              {(resumeData.education && resumeData.education.length > 0) && (
                <div className='mt-4 mb-2'>
                  <div className='font-bold tracking-wide text-base border-b-2 border-gray-800 pb-1 mb-2'>EDUCATION</div>
                  <table className='w-full text-xs border border-gray-800 mb-2'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='border border-gray-800 px-2 py-1 text-left'>Course</th>
                        <th className='border border-gray-800 px-2 py-1 text-left'>Educational Institution</th>
                        <th className='border border-gray-800 px-2 py-1 text-left'>Year Of Passing</th>
                        <th className='border border-gray-800 px-2 py-1 text-left'>Aggregate Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumeData.education.map((edu, idx) => {
                        // Support both object and string for backward compatibility
                        if (typeof edu === 'object' && edu !== null) {
                          return (
                            <tr key={idx}>
                              <td className='border border-gray-800 px-2 py-1'>{edu.degree || ''}</td>
                              <td className='border border-gray-800 px-2 py-1'>{edu.institution || ''}</td>
                              <td className='border border-gray-800 px-2 py-1'>{edu.graduation_date || ''}</td>
                              <td className='border border-gray-800 px-2 py-1'>{edu.gpa || ''}</td>
                            </tr>
                          );
                        } else if (typeof edu === 'string') {
                          const parts = edu.split(',').map(s => s.trim());
                          return (
                            <tr key={idx}>
                              <td className='border border-gray-800 px-2 py-1'>{parts[0] || ''}</td>
                              <td className='border border-gray-800 px-2 py-1'>{parts[1] || ''}</td>
                              <td className='border border-gray-800 px-2 py-1'>{parts[2] || ''}</td>
                              <td className='border border-gray-800 px-2 py-1'>{parts[3] || ''}</td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Section: Experience */}
              {(resumeData.experience && resumeData.experience.length > 0) && (
                <div className='mb-2'>
                  <div className='font-bold tracking-wide text-base border-b-2 border-gray-800 pb-1 mb-2'>EXPERIENCE</div>
                  {resumeData.experience.map((exp, idx) => {
                    // Support both object and string for backward compatibility
                    if (typeof exp === 'object' && exp !== null) {
                      return (
                        <div className='mb-2' key={idx}>
                          <div className='flex flex-wrap justify-between font-semibold'>
                            <span>{exp.position || ''}</span>
                            <span>{exp.company || ''}</span>
                            <span>{exp.start_date || ''} - {exp.end_date || ''}</span>
                          </div>
                          {exp.description && (
                            <ul className='list-disc pl-5 text-xs mt-1'>
                              {exp.description.split('\n').map((point, i) => (
                                <li key={i}>{point.trim()}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    } else if (typeof exp === 'string') {
                      const parts = exp.split('|');
                      return (
                        <div className='mb-2' key={idx}>
                          <div className='flex flex-wrap justify-between font-semibold'>
                            <span>{parts[0] || ''}</span>
                            <span>{parts[1] || ''}</span>
                            <span>{parts[2] || ''}</span>
                          </div>
                          {parts[3] && (
                            <ul className='list-disc pl-5 text-xs mt-1'>
                              {parts[3].split(';').map((point, i) => (
                                <li key={i}>{point.trim()}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              )}
              {/* Section: Technical Projects */}
              {(resumeData.projects && resumeData.projects.length > 0) && (
                <div className='mb-2'>
                  <div className='font-bold tracking-wide text-base border-b-2 border-gray-800 pb-1 mb-2'>TECHNICAL PROJECTS</div>
                  {resumeData.projects.map((proj, idx) => {
                    if (typeof proj === 'string') {
                      const parts = proj.split('|');
                      return (
                        <div className='mb-2' key={idx}>
                          <div className='font-semibold'>{parts[0] || ''} <span className='font-normal text-xs'>{parts[1] ? `(${parts[1]})` : ''}</span></div>
                          {parts[2] && (
                            <ul className='list-disc pl-5 text-xs mt-1'>
                              {parts[2].split(';').map((point, i) => (
                                <li key={i}>{point.trim()}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    } else if (typeof proj === 'object' && proj !== null) {
                      return (
                        <div className='mb-2' key={idx}>
                          <div className='font-semibold'>{proj.name || ''} <span className='font-normal text-xs'>{proj.type ? `(${proj.type})` : ''}</span></div>
                          {proj.description && (
                            <ul className='list-disc pl-5 text-xs mt-1'>
                              {proj.description.split('\n').map((point, i) => (
                                <li key={i}>{point.trim()}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              )}
              {/* Section: Certifications */}
              {(resumeData.certifications && resumeData.certifications.length > 0) && (
                <div className='mb-2'>
                  <div className='font-bold tracking-wide text-base border-b-2 border-gray-800 pb-1 mb-2'>CERTIFICATIONS</div>
                  <ul className='list-disc pl-5 text-xs'>
                    {resumeData.certifications.map((cert, idx) => (
                      <li key={idx}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Section: Technologies & Skills */}
              {(resumeData.skills && resumeData.skills.length > 0) && (
                <div className='mb-2'>
                  <div className='font-bold tracking-wide text-base border-b-2 border-gray-800 pb-1 mb-2'>TECHNOLOGIES & SKILLS</div>
                  <ul className='list-disc pl-5 text-xs'>
                    {resumeData.skills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
  )
}

export default ResumePreview
