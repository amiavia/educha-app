import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';

const ExperienceForm = ({ data, onChange, completed }) => {
  const [experiences, setExperiences] = useState(data.experiences || [{ title: '', organization: '', type: '', duration: '', description: '' }]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const addExperience = () => {
    const newExperiences = [...experiences, { title: '', organization: '', type: '', duration: '', description: '' }];
    setExperiences(newExperiences);
    handleChange('experiences', newExperiences);
  };

  const removeExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    handleChange('experiences', newExperiences);
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
    handleChange('experiences', newExperiences);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-blue">
          💼 <strong>Real-world experience matters!</strong> Internships, volunteer work, and projects show your initiative.
        </p>
      </div>

      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
            {experiences.length > 1 && (
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <HiOutlineTrash size={20} />
              </button>
            )}

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`title-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Role/Position
                  </label>
                  <input
                    id={`title-${index}`}
                    type="text"
                    value={experience.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    placeholder="e.g., Research Intern"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor={`organization-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization/Company
                  </label>
                  <input
                    id={`organization-${index}`}
                    type="text"
                    value={experience.organization}
                    onChange={(e) => updateExperience(index, 'organization', e.target.value)}
                    placeholder="e.g., Microsoft, Local NGO"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`type-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    id={`type-${index}`}
                    value={experience.type}
                    onChange={(e) => updateExperience(index, 'type', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="internship">Internship</option>
                    <option value="volunteer">Volunteer Work</option>
                    <option value="project">Project</option>
                    <option value="research">Research</option>
                    <option value="part-time">Part-time Job</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={`duration-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    id={`duration-${index}`}
                    type="text"
                    value={experience.duration}
                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    placeholder="e.g., 3 months, Summer 2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`description-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                  Description & Key Responsibilities
                </label>
                <textarea
                  id={`description-${index}`}
                  value={experience.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder="What did you do? What did you learn? What impact did you make?"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-primary-blue font-medium hover:border-primary-blue hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >
        <HiOutlinePlus size={20} />
        Add Another Experience
      </button>

      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          💡 <strong>Pro Tip:</strong> Even small experiences count! A school project, community service, or online course project shows initiative and passion.
        </p>
      </div>
    </div>
  );
};

export default ExperienceForm;
