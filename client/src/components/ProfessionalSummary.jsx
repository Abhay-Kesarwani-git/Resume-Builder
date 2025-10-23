import React from 'react';

const ProfessionalSummary = ({ professionalSummary, setProfessionalSummary }) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>Professional Summary</label>
      <div className='flex items-center justify-between mb-2'>
        <span className='text-gray-500 text-sm'>Add summary for your resume here</span>
        <button
          type='button'
          className='px-4 py-1 rounded-full bg-purple-100 text-purple-600 font-medium text-sm flex items-center gap-1 hover:bg-purple-200 transition'
        >
          AI Enhance
        </button>
      </div>
      <textarea
        className='w-full border rounded px-3 py-2 min-h-[80px]'
        value={professionalSummary}
        onChange={e => setProfessionalSummary(e.target.value)}
        placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
      />
      <p className='text-gray-500 text-xs mt-1'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
    </div>
  );
};

export default ProfessionalSummary;