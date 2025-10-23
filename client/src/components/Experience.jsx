import React from 'react';

const Experience = ({ experiences, setExperiences }) => {
  const handleAddExperience = () => {
    setExperiences([...experiences, {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      is_current: false
    }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) => {
      if (i === index) {
        if (field === 'is_current' && value === true) {
          return { ...exp, [field]: value, end_date: 'Present' };
        } else if (field === 'is_current' && value === false) {
          return { ...exp, [field]: value, end_date: '' };
        } else {
          return { ...exp, [field]: value };
        }
      }
      return exp;
    });
    setExperiences(updatedExperiences);
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>Professional Experience</h2>
        <button
          type='button'
          className='px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm flex items-center gap-1 hover:bg-green-200 transition'
          onClick={handleAddExperience}
        >
          + Add Experience
        </button>
      </div>
      {experiences.map((exp, index) => (
        <div key={index} className='border rounded-lg p-4 mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm font-medium text-gray-700'>Experience #{index + 1}</span>
            <button
              type='button'
              className='text-red-500 hover:text-red-700 transition'
              onClick={() => handleRemoveExperience(index)}
            >
              Delete
            </button>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-2'>
            <input
              type='text'
              className='border rounded px-3 py-2 w-full'
              placeholder='Company Name'
              value={exp.company}
              onChange={(e) => handleChange(index, 'company', e.target.value)}
            />
            <input
              type='text'
              className='border rounded px-3 py-2 w-full'
              placeholder='Job Title'
              value={exp.position}
              onChange={(e) => handleChange(index, 'position', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-2'>
            <input
              type='date'
              className='border rounded px-3 py-2 w-full'
              value={exp.start_date}
              onChange={(e) => handleChange(index, 'start_date', e.target.value)}
            />
            <input
              type='date'
              className='border rounded px-3 py-2 w-full'
              value={exp.end_date}
              onChange={(e) => handleChange(index, 'end_date', e.target.value)}
              disabled={exp.is_current}
            />
          </div>
          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              className='mr-2'
              checked={exp.is_current}
              onChange={(e) => handleChange(index, 'is_current', e.target.checked)}
            />
            <span className='text-sm text-gray-700'>Currently working here</span>
          </div>
          <textarea
            className='border rounded px-3 py-2 w-full'
            placeholder='Describe your key responsibilities and achievements...'
            value={exp.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
          />
          <button
            type='button'
            className='mt-2 px-4 py-1 rounded-full bg-purple-100 text-purple-600 font-medium text-sm flex items-center gap-1 hover:bg-purple-200 transition'
          >
            Enhance with AI
          </button>
        </div>
      ))}
    </div>
  );
};

export default Experience;