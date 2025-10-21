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
    <div className="relative h-full flex items-center">
      {/* Shimmer overlay */}
      {shimmer && (
        <div className="absolute inset-0 z-10 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-animation"></div>
        </div>
      )}

      {/* Student Card - Credit Card Format */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-4 text-white shadow-2xl relative overflow-hidden w-full" style={{ aspectRatio: '1.586 / 1' }}>
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">Student Card</h3>
              <p className="text-[10px] text-white/60">ID: EDU-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded px-2 py-0.5">
              <p className="text-[10px] font-bold">2025</p>
            </div>
          </div>

          {/* Photo & Name Section */}
          <div className="flex items-center gap-3 mb-3">
            {/* Photo */}
            <div className="relative group">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 overflow-hidden flex items-center justify-center">
                {studentData.photo ? (
                  <img src={studentData.photo} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/60 text-center">
                    <HiOutlineCamera size={18} className="mx-auto" />
                    <p className="text-[8px]">Photo</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white text-indigo-600 rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
              >
                <HiOutlineCamera size={10} />
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
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-1 text-white text-sm font-bold w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('name')}
                  className="flex items-center gap-1 cursor-pointer group/edit"
                >
                  <h2 className="text-base font-bold">{studentData.name}</h2>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={12} />
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
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-0.5 text-white text-xs w-16"
                />
              ) : (
                <div
                  onClick={() => setEditing('age')}
                  className="flex items-center gap-1 cursor-pointer group/edit"
                >
                  <p className="text-white/80 text-xs">Age: {studentData.age}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={10} />
                </div>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-2 flex-1">
            {/* Location */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <p className="text-[9px] text-white/60 mb-0.5 uppercase tracking-wider">Location</p>
              {editing === 'location' ? (
                <input
                  type="text"
                  value={studentData.location}
                  onChange={(e) => setStudentData({ ...studentData, location: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-0.5 text-white text-xs w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('location')}
                  className="flex items-center justify-between cursor-pointer group/edit"
                >
                  <p className="font-semibold text-xs">📍 {studentData.location}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={10} />
                </div>
              )}
            </div>

            {/* Dream University */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <p className="text-[9px] text-white/60 mb-0.5 uppercase tracking-wider">Dream University</p>
              {editing === 'dreamUniversity' ? (
                <input
                  type="text"
                  value={studentData.dreamUniversity}
                  onChange={(e) => setStudentData({ ...studentData, dreamUniversity: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-0.5 text-white text-xs w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('dreamUniversity')}
                  className="flex items-center justify-between cursor-pointer group/edit"
                >
                  <p className="font-semibold text-xs">🎓 {studentData.dreamUniversity}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={10} />
                </div>
              )}
            </div>

            {/* Dream Subject */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <p className="text-[9px] text-white/60 mb-0.5 uppercase tracking-wider">Dream Subject</p>
              {editing === 'dreamSubject' ? (
                <input
                  type="text"
                  value={studentData.dreamSubject}
                  onChange={(e) => setStudentData({ ...studentData, dreamSubject: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditing(null)}
                  autoFocus
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded px-2 py-0.5 text-white text-xs w-full"
                />
              ) : (
                <div
                  onClick={() => setEditing('dreamSubject')}
                  className="flex items-center justify-between cursor-pointer group/edit"
                >
                  <p className="font-semibold text-xs">📚 {studentData.dreamSubject}</p>
                  <HiOutlinePencil className="opacity-0 group-hover/edit:opacity-100 transition-opacity" size={10} />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-2 pt-2 border-t border-white/20">
            <p className="text-[9px] text-white/60 text-center">Click any field to edit</p>
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
