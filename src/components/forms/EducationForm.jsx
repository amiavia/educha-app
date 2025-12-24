import React from 'react';

const EducationForm = ({ data, onChange, completed }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-blue">
          🎓 <strong>Academic Background:</strong> Help us understand your educational journey so far!
        </p>
      </div>

      <div>
        <label htmlFor="highSchool" className="block text-sm font-semibold text-gray-700 mb-2">
          High School Name <span className="text-red-500">*</span>
        </label>
        <input
          id="highSchool"
          type="text"
          value={data.highSchool || ''}
          onChange={(e) => handleChange('highSchool', e.target.value)}
          placeholder="e.g., Delhi Public School"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="graduationYear" className="block text-sm font-semibold text-gray-700 mb-2">
            Graduation Year <span className="text-red-500">*</span>
          </label>
          <select
            id="graduationYear"
            value={data.graduationYear || ''}
            onChange={(e) => handleChange('graduationYear', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="">Select year</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="curriculum" className="block text-sm font-semibold text-gray-700 mb-2">
            Curriculum Type
          </label>
          <select
            id="curriculum"
            value={data.curriculum || ''}
            onChange={(e) => handleChange('curriculum', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="">Select curriculum</option>
            <option value="a-levels">A-Levels</option>
            <option value="ib">International Baccalaureate (IB)</option>
            <option value="cbse">CBSE</option>
            <option value="icse">ICSE</option>
            <option value="waec">WAEC</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="grade" className="block text-sm font-semibold text-gray-700 mb-2">
          Overall Grade/Percentage <span className="text-red-500">*</span>
        </label>
        <input
          id="grade"
          type="text"
          value={data.grade || ''}
          onChange={(e) => handleChange('grade', e.target.value)}
          placeholder="e.g., 85% or 3 A*s, 2 As"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter your predicted or achieved grades
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Standardized Test Scores (if applicable)
        </label>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="sat" className="sr-only">SAT Score</label>
              <input
                id="sat"
                type="text"
                placeholder="SAT Score"
                value={data.sat || ''}
                onChange={(e) => handleChange('sat', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="act" className="sr-only">ACT Score</label>
              <input
                id="act"
                type="text"
                placeholder="ACT Score"
                value={data.act || ''}
                onChange={(e) => handleChange('act', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="subjects" className="block text-sm font-semibold text-gray-700 mb-2">
          Key Subjects Studied
        </label>
        <textarea
          id="subjects"
          value={data.subjects || ''}
          onChange={(e) => handleChange('subjects', e.target.value)}
          placeholder="e.g., Mathematics, Physics, Chemistry, Computer Science"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default EducationForm;
