import React, { useState } from 'react';

const Skills = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  return (
    <div>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>Skills</h2>
      <div className='flex items-center gap-2 mb-4'>
        <input
          type='text'
          className='border rounded px-2 py-2 w-4/5'
          placeholder='Enter a skill (e.g., JavaScript, Project Management)'
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button
          type='button'
          className='px-5 py-2 rounded-full bg-blue-600 text-white font-medium text-sm flex items-center gap-1 hover:bg-blue-200 transition'
          onClick={handleAddSkill}
        >
          Add
        </button>
      </div>
      <div className='flex flex-wrap gap-2 mb-4'>
        {skills.map((skill, index) => (
          <span
            key={index}
            className='px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-sm flex items-center gap-2'
          >
            {skill}
            <button
              type='button'
              className='text-blue-600 hover:text-blue-800 transition'
              onClick={() => handleRemoveSkill(skill)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <p className='text-sm text-blue-600 bg-blue-50 p-2 rounded'>
        Tip: Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).
      </p>
    </div>
  );
};

export default Skills;