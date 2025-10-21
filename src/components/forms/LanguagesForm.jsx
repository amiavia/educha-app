import React from 'react';

const LanguagesForm = ({ data, onChange, completed }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-blue">
          🌍 <strong>Language proficiency is key!</strong> UK universities require strong English skills for international students.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          English Proficiency Level <span className="text-red-500">*</span>
        </label>
        <select
          value={data.englishLevel || ''}
          onChange={(e) => handleChange('englishLevel', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          <option value="">Select proficiency level</option>
          <option value="native">Native Speaker</option>
          <option value="fluent">Fluent (C2)</option>
          <option value="advanced">Advanced (C1)</option>
          <option value="intermediate">Upper Intermediate (B2)</option>
          <option value="basic">Intermediate (B1)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          English Test Scores (if taken)
        </label>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">IELTS Overall</label>
              <input
                type="text"
                value={data.ielts || ''}
                onChange={(e) => handleChange('ielts', e.target.value)}
                placeholder="e.g., 7.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">TOEFL iBT</label>
              <input
                type="text"
                value={data.toefl || ''}
                onChange={(e) => handleChange('toefl', e.target.value)}
                placeholder="e.g., 100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Cambridge (CAE/CPE)</label>
              <input
                type="text"
                value={data.cambridge || ''}
                onChange={(e) => handleChange('cambridge', e.target.value)}
                placeholder="e.g., Grade A"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">PTE Academic</label>
              <input
                type="text"
                value={data.pte || ''}
                onChange={(e) => handleChange('pte', e.target.value)}
                placeholder="e.g., 68"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Most UK universities require IELTS 6.5-7.0 or equivalent
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Native Language
        </label>
        <input
          type="text"
          value={data.nativeLanguage || ''}
          onChange={(e) => handleChange('nativeLanguage', e.target.value)}
          placeholder="e.g., Hindi, Mandarin, Yoruba"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Other Languages (Optional)
        </label>
        <textarea
          value={data.otherLanguages || ''}
          onChange={(e) => handleChange('otherLanguages', e.target.value)}
          placeholder="List any other languages you speak and your proficiency level (e.g., French - Intermediate, Spanish - Basic)"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          💡 <strong>Don't have test scores yet?</strong> No problem! You can take IELTS/TOEFL later. Just indicate your current proficiency level.
        </p>
      </div>
    </div>
  );
};

export default LanguagesForm;
