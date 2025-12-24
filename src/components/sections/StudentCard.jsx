import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HiOutlineCamera, HiOutlinePencil } from 'react-icons/hi2';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../../context/AuthContext';

const StudentCard = () => {
  const { user, convexUserId } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  // Fetch user data to get profilePhotoId
  const convexUser = useQuery(
    api.users.getUser,
    convexUserId ? { userId: convexUserId } : 'skip'
  );

  // Fetch profile sections from Convex
  const savedSections = useQuery(
    api.users.getProfileSections,
    convexUserId ? { userId: convexUserId } : 'skip'
  );

  // Fetch profile photo URL from storage
  const profilePhotoUrl = useQuery(
    api.documents.getFileUrl,
    convexUser?.profilePhotoId ? { storageId: convexUser.profilePhotoId } : 'skip'
  );

  // Mutations for photo upload
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const updateProfilePhoto = useMutation(api.users.updateProfilePhoto);

  // Extract data from profile sections
  const profileData = useMemo(() => {
    if (!savedSections) return {};

    const personal = savedSections.find(s => s.sectionId === 'personal')?.data || {};
    const education = savedSections.find(s => s.sectionId === 'education')?.data || {};
    const interests = savedSections.find(s => s.sectionId === 'interests')?.data || {};
    const languages = savedSections.find(s => s.sectionId === 'languages')?.data || {};
    const achievements = savedSections.find(s => s.sectionId === 'achievements')?.data || {};

    return {
      personal,
      education,
      interests,
      languages,
      achievements,
    };
  }, [savedSections]);

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Build student data from Convex + Clerk data
  const [studentData, setStudentData] = useState({
    photo: '/student-photo.png',
    name: 'Complete Your Profile',
    age: '--',
    location: 'Not set',
    email: 'Not set',
    dreamUniversity: 'Not set',
    dreamSubject: 'Not set',
    gpa: '--',
    status: 'Active',
    skills: [],
    validUntil: '2026'
  });

  // Update studentData when profile data changes
  useEffect(() => {
    const { personal, education, interests, languages, achievements } = profileData;

    setStudentData(prev => ({
      ...prev,
      // Priority: Convex stored photo > Clerk imageUrl > default
      photo: profilePhotoUrl || user?.imageUrl || prev.photo,
      name: user?.fullName || personal?.fullName || prev.name,
      age: calculateAge(personal?.dateOfBirth) || prev.age,
      location: personal?.country ? `${personal.city || ''}, ${personal.country}`.replace(/^, /, '') : prev.location,
      email: user?.email || personal?.email || prev.email,
      dreamUniversity: interests?.dreamUniversity || prev.dreamUniversity,
      dreamSubject: interests?.fieldOfStudy || interests?.subjects?.[0] || prev.dreamSubject,
      gpa: education?.gpa || prev.gpa,
      skills: achievements?.skills || languages?.languages || prev.skills,
    }));
  }, [profileData, user, profilePhotoUrl]);

  const [editing, setEditing] = useState(null);
  const [shimmer, setShimmer] = useState(false);
  const fileInputRef = useRef(null);

  // Shimmer animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !convexUserId) return;

    setIsUploading(true);
    try {
      // Step 1: Get presigned upload URL from Convex
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload file to Convex Storage
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { storageId } = await response.json();

      // Step 3: Save storage ID to user's profilePhotoId
      await updateProfilePhoto({
        userId: convexUserId,
        profilePhotoId: storageId,
      });

      // The photo will automatically update via the profilePhotoUrl query
    } catch (error) {
      console.error('Failed to upload profile photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (field, value) => {
    setStudentData({ ...studentData, [field]: value });
    setEditing(null);
  };

  // Generate unique ID from Convex user ID
  const uniqueId = useMemo(() => {
    if (convexUserId) {
      return `EDU-${convexUserId.slice(-6).toUpperCase()}`;
    }
    return `EDU-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }, [convexUserId]);

  return (
    <div className="relative w-full">
      {/* Student Card - Credit Card Format with Platinum/Silver Design */}
      <div
        className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 rounded-2xl p-4 sm:p-5 md:p-6 text-white shadow-2xl relative overflow-hidden w-full"
        style={{ aspectRatio: window.innerWidth < 640 ? 'auto' : '1.586 / 1', minHeight: window.innerWidth < 640 ? '500px' : 'auto' }}
      >
        {/* Shimmer overlay */}
        {shimmer && (
          <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer-animation"></div>
          </div>
        )}

        {/* Metallic shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-white/5 to-transparent blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-white/5 to-transparent blur-3xl -ml-24 -mb-24"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Top Row: Header + Status */}
          <div className="flex items-start justify-between mb-3 sm:mb-2">
            <div>
              <h3 className="text-xs sm:text-[11px] font-bold text-white/90 uppercase tracking-wide">Student Card</h3>
              <p className="text-[10px] sm:text-[9px] text-white/70 mt-0.5">ID: {uniqueId}</p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <div className="bg-emerald-400/20 border border-emerald-400/40 backdrop-blur-sm rounded-full px-2.5 py-1 sm:px-2 sm:py-0.5">
                <p className="text-[10px] sm:text-[9px] font-semibold text-emerald-100">{studentData.status}</p>
              </div>
              <p className="text-[10px] sm:text-[9px] text-white/60">Valid until {studentData.validUntil}</p>
            </div>
          </div>

          {/* Main Section: Photo + Info (Compact) */}
          <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-2">
            {/* Photo - Responsive sizing */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden flex items-center justify-center">
                {isUploading ? (
                  <div className="text-white/60 text-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-1"></div>
                    <p className="text-xs">Uploading...</p>
                  </div>
                ) : studentData.photo && studentData.photo !== '/student-photo.png' ? (
                  <img src={studentData.photo} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/60 text-center">
                    <HiOutlineCamera size={28} className="mx-auto mb-1 sm:w-8 sm:h-8" />
                    <p className="text-xs">Photo</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => !isUploading && fileInputRef.current?.click()}
                disabled={isUploading}
                className={`absolute -top-1.5 -right-1.5 bg-white text-slate-700 rounded-full p-2.5 sm:p-2 shadow-lg transition-transform ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <HiOutlineCamera size={16} className="sm:w-3.5 sm:h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Personal Info */}
            <div className="flex-1 space-y-1.5 sm:space-y-1">
              {/* Name & Age */}
              <div>
                {editing === 'name' ? (
                  <input
                    type="text"
                    value={studentData.name}
                    onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                    onBlur={() => setEditing(null)}
                    onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                    autoFocus
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-3 py-2 sm:px-2 sm:py-0.5 text-white text-base sm:text-sm font-bold w-full"
                    style={{ minHeight: '44px' }}
                  />
                ) : (
                  <div
                    onClick={() => setEditing('name')}
                    className="flex items-center gap-1 cursor-pointer group/edit min-h-[44px] sm:min-h-0"
                  >
                    <h2 className="text-lg sm:text-base font-bold">{studentData.name}</h2>
                    <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={12} />
                  </div>
                )}

                <div className="flex items-center gap-2 mt-1">
                  {editing === 'age' ? (
                    <input
                      type="text"
                      value={studentData.age}
                      onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
                      onBlur={() => setEditing(null)}
                      onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                      autoFocus
                      className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-3 py-2 sm:px-2 sm:py-0.5 text-white text-sm sm:text-xs w-20"
                      style={{ minHeight: '44px' }}
                    />
                  ) : (
                    <div
                      onClick={() => setEditing('age')}
                      className="flex items-center gap-1 cursor-pointer group/edit min-h-[44px] sm:min-h-0 py-2 sm:py-0"
                    >
                      <p className="text-white/90 text-sm sm:text-xs">Age {studentData.age}</p>
                      <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={12} />
                    </div>
                  )}

                  <span className="text-white/40 text-sm sm:text-xs">•</span>

                  {editing === 'gpa' ? (
                    <input
                      type="text"
                      value={studentData.gpa}
                      onChange={(e) => setStudentData({ ...studentData, gpa: e.target.value })}
                      onBlur={() => setEditing(null)}
                      onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                      autoFocus
                      className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-3 py-2 sm:px-2 sm:py-0.5 text-white text-sm sm:text-xs w-20"
                      style={{ minHeight: '44px' }}
                    />
                  ) : (
                    <div
                      onClick={() => setEditing('gpa')}
                      className="flex items-center gap-1 cursor-pointer group/edit min-h-[44px] sm:min-h-0 py-2 sm:py-0"
                    >
                      <p className="text-white/90 text-sm sm:text-xs">GPA {studentData.gpa}</p>
                      <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={12} />
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                {editing === 'location' ? (
                  <input
                    type="text"
                    value={studentData.location}
                    onChange={(e) => setStudentData({ ...studentData, location: e.target.value })}
                    onBlur={() => setEditing(null)}
                    onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                    autoFocus
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-3 py-2 sm:px-2 sm:py-0.5 text-white text-sm sm:text-xs w-full"
                    style={{ minHeight: '44px' }}
                  />
                ) : (
                  <div
                    onClick={() => setEditing('location')}
                    className="flex items-center gap-1 cursor-pointer group/edit min-h-[44px] sm:min-h-0 py-2 sm:py-0"
                  >
                    <p className="text-white/90 text-sm sm:text-xs">📍 {studentData.location}</p>
                    <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={12} />
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                {editing === 'email' ? (
                  <input
                    type="email"
                    value={studentData.email}
                    onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                    onBlur={() => setEditing(null)}
                    onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                    autoFocus
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-3 py-2 sm:px-2 sm:py-0.5 text-white text-sm sm:text-xs w-full"
                    style={{ minHeight: '44px' }}
                  />
                ) : (
                  <div
                    onClick={() => setEditing('email')}
                    className="flex items-center gap-1 cursor-pointer group/edit min-h-[44px] sm:min-h-0 py-2 sm:py-0"
                  >
                    <p className="text-white/90 text-sm sm:text-xs">✉️ {studentData.email}</p>
                    <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={12} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Goals Section - Horizontal Layout */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-2">
            {/* Dream University */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-2">
              <p className="text-[9px] sm:text-[8px] text-white/70 mb-1 sm:mb-0.5 uppercase tracking-wider font-semibold">Dream University</p>
              {editing === 'dreamUniversity' ? (
                <input
                  type="text"
                  value={studentData.dreamUniversity}
                  onChange={(e) => setStudentData({ ...studentData, dreamUniversity: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-3 py-2 sm:px-2 sm:py-0.5 text-white text-sm sm:text-xs w-full"
                  style={{ minHeight: '44px' }}
                />
              ) : (
                <div
                  onClick={() => setEditing('dreamUniversity')}
                  className="cursor-pointer group/edit min-h-[44px] sm:min-h-0 flex items-center"
                >
                  <div>
                    <p className="font-semibold text-sm sm:text-xs leading-tight">{studentData.dreamUniversity}</p>
                    <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity mt-0.5" size={12} />
                  </div>
                </div>
              )}
            </div>

            {/* Dream Subject */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-2">
              <p className="text-[9px] sm:text-[8px] text-white/70 mb-1 sm:mb-0.5 uppercase tracking-wider font-semibold">Dream Subject</p>
              {editing === 'dreamSubject' ? (
                <input
                  type="text"
                  value={studentData.dreamSubject}
                  onChange={(e) => setStudentData({ ...studentData, dreamSubject: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-3 py-2 sm:px-2 sm:py-0.5 text-white text-sm sm:text-xs w-full"
                  style={{ minHeight: '44px' }}
                />
              ) : (
                <div
                  onClick={() => setEditing('dreamSubject')}
                  className="cursor-pointer group/edit min-h-[44px] sm:min-h-0 flex items-center"
                >
                  <div>
                    <p className="font-semibold text-sm sm:text-xs leading-tight">{studentData.dreamSubject}</p>
                    <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity mt-0.5" size={12} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Tags */}
          <div className="mt-2 sm:mt-0">
            <p className="text-[9px] sm:text-[8px] text-white/70 mb-1.5 sm:mb-1 uppercase tracking-wider font-semibold">Top Skills</p>
            <div className="flex flex-wrap gap-2 sm:gap-1.5">
              {studentData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1.5 sm:px-2 sm:py-0.5 text-[10px] sm:text-[9px] font-medium"
                >
                  {skill}
                </span>
              ))}
              <button
                onClick={() => {
                  const newSkill = prompt('Add a skill:');
                  if (newSkill) {
                    setStudentData({
                      ...studentData,
                      skills: [...studentData.skills, newSkill]
                    });
                  }
                }}
                className="bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-sm border border-white/20 border-dashed rounded-full px-3 py-1.5 sm:px-2 sm:py-0.5 text-[10px] sm:text-[9px] font-medium transition-colors"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 sm:pt-2 border-t border-white/20 mt-2 sm:mt-0">
            <p className="text-[9px] sm:text-[7px] text-white/60">Click any field to edit</p>
            <p className="text-[9px] sm:text-[7px] text-white/60 mt-0.5">Powered by educha</p>
          </div>
        </div>
      </div>

      {/* Shimmer animation CSS */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer-animation {
          animation: shimmer 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default StudentCard;
