import React from 'react';

const Education = ({ education, setEducation }) => {
  const handleAddEducation = () => {
    setEducation([...education, {
      institution: '',
      degree: '',
      field: '',
      graduation_date: '',
      gpa: ''
    }]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleChange = (index, field, value) => {
    const updatedEducation = education.map((edu, i) => (
      i === index ? { ...edu, [field]: value } : edu
    ));
    setEducation(updatedEducation);
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>Education</h2>
        <button
          type='button'
          className='px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm flex items-center gap-1 hover:bg-green-200 transition'
          onClick={handleAddEducation}
        >
          + Add Education
        </button>
      </div>
      {education.map((edu, index) => (
        <div key={index} className='border rounded-lg p-4 mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm font-medium text-gray-700'>Education #{index + 1}</span>
            <button
              type='button'
              className='text-red-500 hover:text-red-700 transition'
              onClick={() => handleRemoveEducation(index)}
            >
              Delete
            </button>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-2'>
            <input
              type='text'
              className='border rounded px-3 py-2 w-full'
              placeholder='Institution Name'
              value={edu.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
            />
            <input
              type='text'
              className='border rounded px-3 py-2 w-full'
              placeholder="Degree (e.g., Bachelor's, Master's)"
              value={edu.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-2'>
            <input
              type='text'
              className='border rounded px-3 py-2 w-full'
              placeholder='Field of Study'
              value={edu.field}
              onChange={(e) => handleChange(index, 'field', e.target.value)}
            />
            <input
              type='date'
              className='border rounded px-3 py-2 w-full'
              value={edu.graduation_date}
              onChange={(e) => handleChange(index, 'graduation_date', e.target.value)}
            />
          </div>
          <input
            type='text'
            className='border rounded px-3 py-2 w-full mb-2'
            placeholder='GPA (optional)'
            value={edu.gpa}
            onChange={(e) => handleChange(index, 'gpa', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Education;