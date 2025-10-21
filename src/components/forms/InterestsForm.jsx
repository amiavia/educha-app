import React, { useState } from 'react';

const InterestsForm = ({ data, onChange, completed }) => {
  const [selectedFields, setSelectedFields] = useState(data.fields || []);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fieldOptions = [
    'Computer Science', 'Engineering', 'Medicine', 'Business', 'Economics',
    'Law', 'Psychology', 'Biology', 'Chemistry', 'Physics', 'Mathematics',
    'Arts & Humanities', 'Social Sciences', 'Environmental Science', 'Architecture'
  ];

  const toggleField = (field) => {
    const newFields = selectedFields.includes(field)
      ? selectedFields.filter(f => f !== field)
      : [...selectedFields, field];
    setSelectedFields(newFields);
    handleChange('fields', newFields);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-blue">
          📚 <strong>What drives you?</strong> Tell us about your academic passions and career goals!
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Fields of Study You're Interested In <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">Select all that apply (at least 1)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {fieldOptions.map((field) => (
            <button
              key={field}
              onClick={() => toggleField(field)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFields.includes(field)
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {field}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Preferred Degree Level <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Bachelor', 'Master', 'PhD'].map((level) => (
            <button
              key={level}
              onClick={() => handleChange('degreeLevel', level.toLowerCase())}
              className={`px-6 py-4 rounded-lg font-medium transition-all ${
                data.degreeLevel === level.toLowerCase()
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Specific Programme Interests
        </label>
        <input
          type="text"
          value={data.specificProgramme || ''}
          onChange={(e) => handleChange('specificProgramme', e.target.value)}
          placeholder="e.g., Machine Learning, International Business, Clinical Medicine"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Research Interests (Optional)
        </label>
        <textarea
          value={data.researchInterests || ''}
          onChange={(e) => handleChange('researchInterests', e.target.value)}
          placeholder="What specific topics or research areas fascinate you? This helps universities match you with relevant programmes and supervisors."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Preferred Start Date
        </label>
        <select
          value={data.startDate || ''}
          onChange={(e) => handleChange('startDate', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          <option value="">Select start date</option>
          <option value="2025-09">September 2025</option>
          <option value="2026-01">January 2026</option>
          <option value="2026-09">September 2026</option>
          <option value="2027-01">January 2027</option>
        </select>
      </div>
    </div>
  );
};

export default InterestsForm;
