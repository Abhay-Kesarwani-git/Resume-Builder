import React from 'react'
import Title from './Title'

const Feature = () => {
  return (
    
        <div id='features' className='flex flex-col items-center justify-items-start min-h-[80vh] w-full scroll-mt-12 pb-60'>
             <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1">
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.613 8.2a.62.62 0 0 1-.553-.341.59.59 0 0 1 .076-.637l6.048-6.118a.31.31 0 0 1 .375-.069c.061.033.11.084.137.147a.3.3 0 0 1 .014.197L6.537 4.991a.59.59 0 0 0 .07.552.61.61 0 0 0 .504.257h4.276a.62.62 0 0 1 .553.341.59.59 0 0 1-.076.637l-6.048 6.119a.31.31 0 0 1-.375.067.295.295 0 0 1-.15-.344l1.172-3.61a.59.59 0 0 0-.07-.553.61.61 0 0 0-.504-.257z"
                    stroke="#1E4BAF" strokeMiterlimit="5.759" strokeLinecap="round" />
            </svg>
            <span>Simple Process</span>
        </div>
                <Title
                    title={'Build your resume'}
                    description={'Create a standout resume effortlessly with our modern templates, smart suggestions, and instant downloads. Perfect for job seekers who want to impress recruiters and land interviews faster.'}
                />
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl mx-auto">
                <img className="max-w-2xl w-full md:w-1/2 rounded-2xl object-cover" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/card-image-1.png" alt="Resume Builder Features" />
                <div className="flex flex-col items-center justify-center space-y-10 w-full md:w-1/2">
                    <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full">
                        <div className="p-6 aspect-square bg-violet-100 rounded-full flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="text-base font-semibold text-slate-700">Instant Resume Creation</h3>
                            <p className="text-sm text-slate-600">Build your professional resume in minutes with our intuitive editor and beautiful templates. No design skills required!</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full">
                        <div className="p-6 aspect-square bg-green-100 rounded-full flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.832 22.75C6.415 21 6.999 17.5 6.999 14a7 7 0 0 1 .396-2.333m2.695 13.999c.245-.77.525-1.54.665-2.333m-.255-15.4A7 7 0 0 1 21 14v2.333" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="text-base font-semibold text-slate-700">ATS-Optimized & Secure</h3>
                            <p className="text-sm text-slate-600">Our resumes are optimized for Applicant Tracking Systems and your data is protected with industry-leading security.</p>
                        </div>
                    </div>
                    {/* <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full">
                        <div className="p-6 aspect-square bg-orange-100 rounded-full flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="text-base font-semibold text-slate-700">One-Click Download & Sharing</h3>
                            <p className="text-sm text-slate-600">Easily export your resume as PDF or share it online. Stand out to recruiters with a professional, modern resume.</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
  )
}

export default Feature
