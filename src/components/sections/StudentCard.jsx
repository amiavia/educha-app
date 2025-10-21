import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineCamera, HiOutlinePencil } from 'react-icons/hi2';

const StudentCard = () => {
  const [studentData, setStudentData] = useState({
    photo: null,
    name: 'Meera Patel',
    age: '18',
    location: 'Mumbai, India',
    dreamUniversity: 'University of Oxford',
    dreamSubject: 'Computer Science',
  });

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentData({ ...studentData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (field, value) => {
    setStudentData({ ...studentData, [field]: value });
    setEditing(null);
  };

  return (
    <div className="relative">
      {/* Shimmer overlay */}
      {shimmer && (
        <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-animation"></div>
        </div>
      )}

      {/* Student Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Student Card</h3>
              <p className="text-xs text-white/60">Unique ID: EDU-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
              <p className="text-xs font-bold">2025</p>
            </div>
          </div>

          {/* Photo & Name Section */}
          <div className="flex items-center gap-4 mb-6">
            {/* Photo */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 overflow-hidden flex items-center justify-center">
                {studentData.photo ? (
                  <img src={studentData.photo} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/60 text-center">
                    <HiOutlineCamera size={32} className="mx-auto mb-1" />
                    <p className="text-xs">Photo</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white text-indigo-600 rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
              >
                <HiOutlineCamera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Name & Age */}
            <div className="flex-1">
              {editing === 'name' ? (
                <input
                  type="text"
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg px-3 py-2 text-white text-xl font-bold w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('name')}
                  className="flex items-center gap-2 cursor-pointer group/edit"
                >
                  <h2 className="text-2xl font-bold">{studentData.name}</h2>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={16} />
                </div>
              )}

              {editing === 'age' ? (
                <input
                  type="text"
                  value={studentData.age}
                  onChange={(e) => setStudentData({ ...studentData, age: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg px-2 py-1 text-white text-sm w-20 mt-1"
                />
              ) : (
                <div
                  onClick={() => setEditing('age')}
                  className="flex items-center gap-2 cursor-pointer group/edit mt-1"
                >
                  <p className="text-white/80 text-sm">Age: {studentData.age}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={12} />
                </div>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-3">
            {/* Location */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-white/60 mb-1 uppercase tracking-wider">Location</p>
              {editing === 'location' ? (
                <input
                  type="text"
                  value={studentData.location}
                  onChange={(e) => setStudentData({ ...studentData, location: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-1 text-white text-sm w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('location')}
                  className="flex items-center justify-between cursor-pointer group/edit"
                >
                  <p className="font-semibold">📍 {studentData.location}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={14} />
                </div>
              )}
            </div>

            {/* Dream University */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-white/60 mb-1 uppercase tracking-wider">Dream University</p>
              {editing === 'dreamUniversity' ? (
                <input
                  type="text"
                  value={studentData.dreamUniversity}
                  onChange={(e) => setStudentData({ ...studentData, dreamUniversity: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-1 text-white text-sm w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('dreamUniversity')}
                  className="flex items-center justify-between cursor-pointer group/edit"
                >
                  <p className="font-semibold">🎓 {studentData.dreamUniversity}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={14} />
                </div>
              )}
            </div>

            {/* Dream Subject */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-white/60 mb-1 uppercase tracking-wider">Dream Subject</p>
              {editing === 'dreamSubject' ? (
                <input
                  type="text"
                  value={studentData.dreamSubject}
                  onChange={(e) => setStudentData({ ...studentData, dreamSubject: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-1 text-white text-sm w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('dreamSubject')}
                  className="flex items-center justify-between cursor-pointer group/edit"
                >
                  <p className="font-semibold">📚 {studentData.dreamSubject}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={14} />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-xs text-white/60 text-center">Click any field to edit • Photo updates instantly</p>
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
