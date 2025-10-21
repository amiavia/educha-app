import React from 'react';

const UniversityLogo = ({ name, size = 'medium' }) => {
  // Extract initials from university name
  const getInitials = (universityName) => {
    // Remove common words and get meaningful initials
    const cleanName = universityName
      .replace(/^(The|University of|College of)\s+/i, '')
      .replace(/\s+(University|College)$/i, '');

    const words = cleanName.split(' ').filter(word => word.length > 0);

    // Special cases for well-known universities
    const specialCases = {
      'Oxford': 'OX',
      'Cambridge': 'CAM',
      'Imperial College London': 'ICL',
      'London School of Economics': 'LSE',
      'University College London': 'UCL',
    };

    if (specialCases[universityName]) {
      return specialCases[universityName];
    }

    // Take first letter of first two significant words
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return 'UN';
  };

  // Generate a consistent color based on university name
  const getColor = (universityName) => {
    const colors = [
      { bg: 'bg-blue-600', text: 'text-white' },
      { bg: 'bg-indigo-600', text: 'text-white' },
      { bg: 'bg-purple-600', text: 'text-white' },
      { bg: 'bg-slate-700', text: 'text-white' },
      { bg: 'bg-teal-600', text: 'text-white' },
      { bg: 'bg-emerald-600', text: 'text-white' },
      { bg: 'bg-cyan-600', text: 'text-white' },
      { bg: 'bg-sky-600', text: 'text-white' },
    ];

    // Generate consistent index from name
    let hash = 0;
    for (let i = 0; i < universityName.length; i++) {
      hash = universityName.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const colors = getColor(name);

  const sizeClasses = {
    small: 'w-10 h-10 text-xs',
    medium: 'w-12 h-12 text-sm',
    large: 'w-16 h-16 text-base',
    xlarge: 'w-20 h-20 text-lg',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colors.bg} ${colors.text} rounded-lg flex items-center justify-center font-bold shadow-md`}
      title={name}
    >
      {initials}
    </div>
  );
};

export default UniversityLogo;
