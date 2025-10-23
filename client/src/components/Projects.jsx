import React from 'react';

const Projects = ({ projects, setProjects }) => {
  const handleAddProject = () => {
    setProjects([...projects, {
      name: '',
      type: '',
      description: ''
    }]);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleChange = (index, field, value) => {
    const updatedProjects = projects.map((proj, i) => (
      i === index ? { ...proj, [field]: value } : proj
    ));
    setProjects(updatedProjects);
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>Projects</h2>
        <button
          type='button'
          className='px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm flex items-center gap-1 hover:bg-green-200 transition'
          onClick={handleAddProject}
        >
          + Add Project
        </button>
      </div>
      {projects.map((proj, index) => (
        <div key={index} className='border rounded-lg p-4 mb-4'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm font-medium text-gray-700'>Project #{index + 1}</span>
            <button
              type='button'
              className='text-red-500 hover:text-red-700 transition'
              onClick={() => handleRemoveProject(index)}
            >
              Delete
            </button>
          </div>
          <input
            type='text'
            className='border rounded px-3 py-2 w-full mb-2'
            placeholder='Project Name'
            value={proj.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
          />
          <input
            type='text'
            className='border rounded px-3 py-2 w-full mb-2'
            placeholder='Project Type'
            value={proj.type}
            onChange={(e) => handleChange(index, 'type', e.target.value)}
          />
          <textarea
            className='border rounded px-3 py-2 w-full'
            placeholder='Describe your project...'
            value={proj.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Projects;