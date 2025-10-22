import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileSections, universities } from '../data/mockData';
import { HiOutlineAcademicCap, HiOutlineCheckCircle, HiOutlineClock, HiOutlineSparkles, HiOutlineMagnifyingGlass, HiOutlineAdjustmentsHorizontal, HiOutlineXMark } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProfileModal from '../components/modals/ProfileModal';
import AdmissionsGuide from '../components/sections/AdmissionsGuide';
import DocumentUpload from '../components/sections/DocumentUpload';
import UniversityMatches from '../components/sections/UniversityMatches';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedDegree, setSelectedDegree] = useState('bachelor');
  const [selectedSection, setSelectedSection] = useState(null);
  const [sections, setSections] = useState(profileSections);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ranking: { min: 1, max: 100 },
    location: [],
    sortBy: 'ranking' // 'ranking', 'name', 'matchScore'
  });

  const completedSections = sections.filter(s => s.completed).length;
  const totalSections = sections.length;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  const handleSaveSection = (sectionId, data) => {
    setSections(sections.map(s =>
      s.id === sectionId ? { ...s, completed: true, data } : s
    ));
  };

  const handleOpenSection = (section) => {
    setSelectedSection(section);
  };

  const handleUploadComplete = () => {
    // Simulate auto-filling some sections
    setSections(sections.map(s =>
      ['personal', 'education', 'languages'].includes(s.id)
        ? { ...s, completed: true }
        : s
    ));
  };

  // Filter and search universities
  const filterUniversities = () => {
    let filtered = [...universities];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(uni => {
        // Search in university name
        if (uni.name.toLowerCase().includes(query)) return true;

        // Search in location
        if (uni.location.toLowerCase().includes(query)) return true;

        // Search in programs
        const programs = uni.programs[selectedDegree];
        return programs.some(program =>
          program.name.toLowerCase().includes(query)
        );
      });
    }

    // Ranking filter
    filtered = filtered.filter(uni =>
      uni.ranking >= filters.ranking.min && uni.ranking <= filters.ranking.max
    );

    // Location filter
    if (filters.location.length > 0) {
      filtered = filtered.filter(uni =>
        filters.location.some(loc => uni.location.includes(loc))
      );
    }

    // Sort
    if (filters.sortBy === 'ranking') {
      filtered.sort((a, b) => a.ranking - b.ranking);
    } else if (filters.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const filteredUniversities = filterUniversities();
  const availableLocations = [...new Set(universities.map(u => u.location))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img src="/logo.png" alt="Educha" className="h-8 sm:h-12 w-auto shrink-0" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-serif font-semibold text-primary-blue tracking-tight truncate">educha</h1>
                <p className="text-[8px] sm:text-[10px] font-light text-gray-600 tracking-widest uppercase hidden xs:block">Connecting Minds, Building Futures</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}!</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                onClick={logout}
                size="small"
                className="text-xs sm:text-sm px-2 sm:px-3 py-2"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Document Upload Section */}
        <DocumentUpload onUploadComplete={handleUploadComplete} />

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'profile'
                ? 'bg-primary-blue text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
            style={{ minHeight: '44px' }}
          >
            📝 Complete Profile
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'matches'
                ? 'bg-primary-blue text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
            style={{ minHeight: '44px' }}
          >
            🎯 Matches
          </button>
          <button
            onClick={() => setActiveTab('universities')}
            className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'universities'
                ? 'bg-primary-blue text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
            style={{ minHeight: '44px' }}
          >
            🎓 Explore Universities
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <>
            {/* Progress Banner */}
            <div className="bg-gradient-to-r from-primary-blue to-accent-blue rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineSparkles size={20} className="sm:w-6 sm:h-6" />
                    <h2 className="text-xl sm:text-2xl font-bold">Your Profile Power</h2>
                  </div>
                  <p className="text-sm sm:text-base text-blue-100 mb-3 sm:mb-4">Complete your profile to unlock university matches!</p>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="font-semibold">{completionPercentage}% Complete</span>
                      <span>{completedSections}/{totalSections} sections</span>
                    </div>
                    <div className="h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-gold transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 min-w-[120px] sm:min-w-[140px] self-center">
                  <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">
                    {completionPercentage < 40 ? '🌱' : completionPercentage < 70 ? '🌿' : '🌟'}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-center">
                    {completionPercentage < 40 ? 'Beginner' : completionPercentage < 70 ? 'Rising Star' : 'All-Star'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Admissions Guide Tile */}
            <AdmissionsGuide />

            {/* Profile Section Tiles */}
            {sections.map((section) => (
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
                      onClick={() => handleOpenSection(section)}
                    >
                      {section.completed ? 'Edit' : 'Complete'} →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            </div>
          </>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <UniversityMatches sections={sections} universities={universities} />
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
                <div className="flex-1 relative">
                  <HiOutlineMagnifyingGlass className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search universities, programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    style={{ minHeight: '44px' }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      <HiOutlineXMark size={20} />
                    </button>
                  )}
                </div>
                <Button
                  variant={showFilters ? 'primary' : 'secondary'}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-3 shrink-0"
                  style={{ minHeight: '44px' }}
                >
                  <HiOutlineAdjustmentsHorizontal size={20} />
                  <span className="hidden sm:inline">Filters</span>
                  <span className="sm:hidden">Filter</span>
                </Button>
              </div>

              {/* Advanced Filters Panel */}
              {showFilters && (
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Ranking Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ranking Range</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={filters.ranking.min}
                          onChange={(e) => setFilters({
                            ...filters,
                            ranking: { ...filters.ranking, min: parseInt(e.target.value) || 1 }
                          })}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Min"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={filters.ranking.max}
                          onChange={(e) => setFilters({
                            ...filters,
                            ranking: { ...filters.ranking, max: parseInt(e.target.value) || 100 }
                          })}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Max"
                        />
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <div className="flex flex-wrap gap-2">
                        {availableLocations.map(loc => (
                          <button
                            key={loc}
                            onClick={() => {
                              if (filters.location.includes(loc)) {
                                setFilters({
                                  ...filters,
                                  location: filters.location.filter(l => l !== loc)
                                });
                              } else {
                                setFilters({
                                  ...filters,
                                  location: [...filters.location, loc]
                                });
                              }
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              filters.location.includes(loc)
                                ? 'bg-primary-blue text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="ranking">Ranking</option>
                        <option value="name">Name (A-Z)</option>
                      </select>
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setFilters({
                          ranking: { min: 1, max: 100 },
                          location: [],
                          sortBy: 'ranking'
                        });
                        setSearchQuery('');
                      }}
                      className="text-sm text-primary-blue hover:text-blue-900 font-medium"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Search Results Count */}
              <div className="mt-4 text-sm text-gray-600">
                {searchQuery || filters.location.length > 0 || filters.ranking.min > 1 || filters.ranking.max < 100 ? (
                  <span>Found <strong>{filteredUniversities.length}</strong> {filteredUniversities.length === 1 ? 'university' : 'universities'}</span>
                ) : (
                  <span>Showing all <strong>{universities.length}</strong> universities</span>
                )}
              </div>
            </div>

            {/* Degree Filter */}
            <div className="flex gap-2 sm:gap-3 mb-6 flex-wrap">
              {['bachelor', 'master', 'phd'].map((degree) => (
                <button
                  key={degree}
                  onClick={() => setSelectedDegree(degree)}
                  className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-lg font-medium transition-all capitalize text-sm sm:text-base ${
                    selectedDegree === degree
                      ? 'bg-primary-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  {degree === 'phd' ? 'PhD' : degree}
                </button>
              ))}
            </div>

            {/* Universities List */}
            <div className="space-y-6">
              {filteredUniversities.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No universities found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        ranking: { min: 1, max: 100 },
                        location: [],
                        sortBy: 'ranking'
                      });
                    }}
                    variant="secondary"
                  >
                    Clear All Filters
                  </Button>
                </Card>
              ) : (
                filteredUniversities.map((uni) => (
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
              ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {selectedSection && (
        <ProfileModal
          section={selectedSection}
          onClose={() => setSelectedSection(null)}
          onSave={handleSaveSection}
        />
      )}
    </div>
  );
};

export default DashboardPage;
