import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HiOutlineCamera, HiOutlineAcademicCap, HiOutlineGlobeAlt } from 'react-icons/hi2';
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

    return { personal, education, interests, languages, achievements };
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

  const [shimmer, setShimmer] = useState(false);
  const fileInputRef = useRef(null);

  // Shimmer animation every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1200);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !convexUserId) return;

    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!response.ok) throw new Error('Upload failed');
      const { storageId } = await response.json();
      await updateProfilePhoto({ userId: convexUserId, profilePhotoId: storageId });
    } catch (error) {
      console.error('Failed to upload profile photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Generate unique ID
  const uniqueId = useMemo(() => {
    if (convexUserId) {
      return `EDU-${convexUserId.slice(-8).toUpperCase()}`;
    }
    return 'EDU-XXXXXXXX';
  }, [convexUserId]);

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* Card Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-200/50">

        {/* Header Section - Premium Blue Gradient */}
        <div className="relative bg-gradient-to-br from-primary-blue via-blue-600 to-blue-700 px-6 pt-5 pb-16">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 -ml-16 -mb-16"></div>
          </div>

          {/* Shimmer Effect */}
          {shimmer && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent shimmer-animation"></div>
            </div>
          )}

          {/* Header Content */}
          <div className="relative z-10 flex items-start justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <HiOutlineAcademicCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg tracking-wide">EDUCHA</h2>
                <p className="text-blue-100 text-xs font-medium">Student Pass</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex flex-col items-end gap-1">
              <div className="bg-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                {studentData.status}
              </div>
              <span className="text-blue-100 text-[10px]">Valid: {studentData.validUntil}</span>
            </div>
          </div>

          {/* Globe Icon */}
          <div className="absolute bottom-4 right-6 opacity-20">
            <HiOutlineGlobeAlt className="w-20 h-20 text-white" />
          </div>
        </div>

        {/* Main Content Section - White Background */}
        <div className="relative bg-white px-6 pb-6 -mt-10">
          {/* Photo - Overlapping the header */}
          <div className="flex gap-5">
            {/* Photo Container */}
            <div className="relative -mt-6 shrink-0">
              <div className="w-28 h-32 rounded-2xl overflow-hidden bg-gray-100 border-4 border-white shadow-xl">
                {isUploading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                    <div className="w-8 h-8 border-3 border-primary-blue/20 border-t-primary-blue rounded-full animate-spin mb-2"></div>
                    <span className="text-xs">Uploading...</span>
                  </div>
                ) : studentData.photo && studentData.photo !== '/student-photo.png' ? (
                  <img src={studentData.photo} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <HiOutlineCamera className="w-8 h-8 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400">Add Photo</span>
                  </div>
                )}
              </div>
              {/* Camera Button */}
              <button
                onClick={() => !isUploading && fileInputRef.current?.click()}
                disabled={isUploading}
                className={`absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-primary-gold text-white shadow-lg flex items-center justify-center transition-all ${isUploading ? 'opacity-50' : 'hover:scale-110 hover:bg-yellow-500 active:scale-95'}`}
              >
                <HiOutlineCamera className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Name & Basic Info */}
            <div className="flex-1 pt-2">
              <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                {studentData.name}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {studentData.email}
              </p>

              {/* Quick Stats */}
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary-blue">{studentData.age}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Age</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary-blue">{studentData.gpa}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">GPA</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary-blue truncate max-w-[80px]">{studentData.location.split(',')[0] || '--'}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide">Location</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-5"></div>

          {/* Goals Section */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100/50">
              <p className="text-[10px] text-blue-600 uppercase tracking-wider font-semibold mb-1">Dream University</p>
              <p className="text-sm font-bold text-gray-800 truncate">{studentData.dreamUniversity}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100/50">
              <p className="text-[10px] text-amber-600 uppercase tracking-wider font-semibold mb-1">Dream Subject</p>
              <p className="text-sm font-bold text-gray-800 truncate">{studentData.dreamSubject}</p>
            </div>
          </div>

          {/* Skills */}
          {studentData.skills.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Top Skills</p>
              <div className="flex flex-wrap gap-2">
                {studentData.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Card ID / Barcode Section */}
          <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              {/* ID Number */}
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Student ID</p>
                <p className="font-mono text-sm font-bold text-gray-700 tracking-wider">{uniqueId}</p>
              </div>

              {/* Barcode Placeholder */}
              <div className="flex flex-col items-end">
                <div className="flex gap-[2px] mb-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-800 rounded-sm"
                      style={{
                        width: Math.random() > 0.5 ? '2px' : '1px',
                        height: '24px'
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-[8px] text-gray-400 font-mono">{uniqueId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white/30 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white/30 rounded-tr-3xl"></div>
      </div>

      {/* Card Shadow */}
      <div className="absolute -bottom-3 left-6 right-6 h-6 bg-primary-blue/10 blur-2xl rounded-full"></div>

      {/* Styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-animation {
          animation: shimmer 1.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default StudentCard;
