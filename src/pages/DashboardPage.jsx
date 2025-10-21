import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileSections, universities } from '../data/mockData';
import { HiOutlineAcademicCap, HiOutlineCheckCircle, HiOutlineClock, HiOutlineSparkles } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedDegree, setSelectedDegree] = useState('bachelor');

  const completedSections = profileSections.filter(s => s.completed).length;
  const totalSections = profileSections.length;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Educha" className="h-12 w-auto" />
              <span className="text-2xl font-display font-bold text-primary-blue">educha</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}!</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button variant="ghost" onClick={logout} size="small">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Banner */}
        <div className="bg-gradient-to-r from-primary-blue to-accent-blue rounded-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineSparkles size={24} />
                <h2 className="text-2xl font-bold">Your Profile Power</h2>
              </div>
              <p className="text-blue-100 mb-4">Complete your profile to unlock university matches!</p>

              {/* Progress Bar */}
              <div className="relative">
                <div className="flex justify-between text-sm mb-2">
                  <span>{completionPercentage}% Complete</span>
                  <span>{completedSections}/{totalSections} sections</span>
                </div>
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-gold transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Level Badge */}
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[140px]">
              <div className="text-4xl mb-2">
                {completionPercentage < 40 ? '🌱' : completionPercentage < 70 ? '🌿' : '🌟'}
              </div>
              <p className="text-sm font-semibold">
                {completionPercentage < 40 ? 'Beginner' : completionPercentage < 70 ? 'Rising Star' : 'All-Star'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-primary-blue text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📝 Complete Profile
          </button>
          <button
            onClick={() => setActiveTab('universities')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'universities'
                ? 'bg-primary-blue text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🎓 Explore Universities
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileSections.map((section) => (
              <Card
                key={section.id}
                className={`relative ${section.completed ? 'border-2 border-green-200' : ''}`}
                hover={!section.completed}
              >
                {section.completed && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <HiOutlineCheckCircle size={20} />
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="text-4xl">{section.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
                    <ul className="space-y-1 mb-4">
                      {section.fields.map((field, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary-blue rounded-full"></span>
                          {field}
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="small"
                      variant={section.completed ? 'secondary' : 'primary'}
                      className="w-full"
                    >
                      {section.completed ? 'Edit' : 'Complete'} →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div>
            {/* Degree Filter */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {['bachelor', 'master', 'phd'].map((degree) => (
                <button
                  key={degree}
                  onClick={() => setSelectedDegree(degree)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    selectedDegree === degree
                      ? 'bg-primary-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {degree === 'phd' ? 'PhD' : degree}
                </button>
              ))}
            </div>

            {/* Universities List */}
            <div className="space-y-6">
              {universities.map((uni) => (
                <Card key={uni.id} className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* University Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-5xl">{uni.logo}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{uni.name}</h3>
                            <span className="bg-primary-gold text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                              #{uni.ranking} UK
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">📍 {uni.location}</p>

                          {/* Programs */}
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              {selectedDegree === 'phd' ? 'PhD' : selectedDegree.charAt(0).toUpperCase() + selectedDegree.slice(1)} Programmes:
                            </p>
                            {uni.programs[selectedDegree].map((program) => (
                              <div
                                key={program.id}
                                className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{program.name}</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      <HiOutlineClock className="inline mr-1" size={14} />
                                      {program.duration} • {program.fee}/year
                                    </p>
                                  </div>
                                  <button className="text-primary-blue hover:text-blue-900 text-sm font-medium whitespace-nowrap">
                                    Learn More →
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button size="small" variant="secondary">
                      <HiOutlineAcademicCap className="mr-2" size={18} />
                      Express Interest
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
