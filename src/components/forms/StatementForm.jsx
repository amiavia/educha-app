import React from 'react';

const StatementForm = ({ data, onChange, completed }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const wordCount = (text) => {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-blue">
          ✍️ <strong>This is your story!</strong> Share your passions, goals, and what makes you unique. Be authentic and specific.
        </p>
      </div>

      <div>
        <label htmlFor="whyUK" className="block text-sm font-semibold text-gray-700 mb-2">
          Why do you want to study in the UK? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="whyUK"
          value={data.whyUK || ''}
          onChange={(e) => handleChange('whyUK', e.target.value)}
          placeholder="What attracts you to UK universities? Is it the academic excellence, specific programmes, research opportunities, or cultural experience?"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Be specific and personal</p>
          <p className="text-xs text-gray-500">{wordCount(data.whyUK)} words</p>
        </div>
      </div>

      <div>
        <label htmlFor="careerGoals" className="block text-sm font-semibold text-gray-700 mb-2">
          What are your career goals? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="careerGoals"
          value={data.careerGoals || ''}
          onChange={(e) => handleChange('careerGoals', e.target.value)}
          placeholder="Where do you see yourself in 5-10 years? What impact do you want to make in your field? How will your degree help you achieve this?"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Think about the bigger picture</p>
          <p className="text-xs text-gray-500">{wordCount(data.careerGoals)} words</p>
        </div>
      </div>

      <div>
        <label htmlFor="uniqueQualities" className="block text-sm font-semibold text-gray-700 mb-2">
          What makes you unique? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="uniqueQualities"
          value={data.uniqueQualities || ''}
          onChange={(e) => handleChange('uniqueQualities', e.target.value)}
          placeholder="What experiences, perspectives, or qualities set you apart? This could be your background, challenges you've overcome, unique projects, or special skills."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Show what you bring to the university</p>
          <p className="text-xs text-gray-500">{wordCount(data.uniqueQualities)} words</p>
        </div>
      </div>

      <div>
        <label htmlFor="whyYou" className="block text-sm font-semibold text-gray-700 mb-2">
          Why should universities choose you? (Optional)
        </label>
        <textarea
          id="whyYou"
          value={data.whyYou || ''}
          onChange={(e) => handleChange('whyYou', e.target.value)}
          placeholder="Sum up your strengths and why you'd be a great addition to their student community."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Your elevator pitch</p>
          <p className="text-xs text-gray-500">{wordCount(data.whyYou)} words</p>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 space-y-2">
        <p className="text-sm text-yellow-800 font-semibold">
          💡 Writing Tips:
        </p>
        <ul className="text-sm text-yellow-800 space-y-1 ml-4">
          <li>• Be specific - use concrete examples and experiences</li>
          <li>• Show passion - let your enthusiasm shine through</li>
          <li>• Be honest - authenticity matters more than perfection</li>
          <li>• Proofread - check for grammar and spelling</li>
        </ul>
      </div>
    </div>
  );
};

export default StatementForm;
