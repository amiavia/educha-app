import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';

const AchievementsForm = ({ data, onChange, completed }) => {
  const [achievements, setAchievements] = useState(data.achievements || [{ title: '', description: '', year: '' }]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const addAchievement = () => {
    const newAchievements = [...achievements, { title: '', description: '', year: '' }];
    setAchievements(newAchievements);
    handleChange('achievements', newAchievements);
  };

  const removeAchievement = (index) => {
    const newAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(newAchievements);
    handleChange('achievements', newAchievements);
  };

  const updateAchievement = (index, field, value) => {
    const newAchievements = [...achievements];
    newAchievements[index][field] = value;
    setAchievements(newAchievements);
    handleChange('achievements', newAchievements);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-blue">
          🏆 <strong>Show off your accomplishments!</strong> Academic awards, competitions, certifications - they all count!
        </p>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
            {achievements.length > 1 && (
              <button
                onClick={() => removeAchievement(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <HiOutlineTrash size={20} />
              </button>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Achievement Title
                </label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                  placeholder="e.g., National Science Olympiad Gold Medal"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    value={achievement.year}
                    onChange={(e) => updateAchievement(index, 'year', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 8 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={achievement.category}
                    onChange={(e) => updateAchievement(index, 'category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="academic">Academic Award</option>
                    <option value="competition">Competition</option>
                    <option value="certification">Certification</option>
                    <option value="leadership">Leadership</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts & Culture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                  placeholder="Briefly describe what you achieved and why it's significant"
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addAchievement}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-primary-blue font-medium hover:border-primary-blue hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >
        <HiOutlinePlus size={20} />
        Add Another Achievement
      </button>

      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          💡 <strong>Pro Tip:</strong> Include national/international competitions, subject awards, certifications (like coding bootcamps), or leadership positions in school clubs!
        </p>
      </div>
    </div>
  );
};

export default AchievementsForm;
