export const profileSections = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: '👤',
    completed: true,
    fields: ['Full Name', 'Date of Birth', 'Nationality', 'Contact Info'],
  },
  {
    id: 'education',
    title: 'Education History',
    icon: '🎓',
    completed: true,
    fields: ['High School', 'Grades/Scores', 'Graduation Year'],
  },
  {
    id: 'interests',
    title: 'Academic Interests',
    icon: '📚',
    completed: false,
    fields: ['Field of Study', 'Preferred Degree Level', 'Research Interests'],
  },
  {
    id: 'achievements',
    title: 'Achievements & Awards',
    icon: '🏆',
    completed: false,
    fields: ['Academic Awards', 'Competitions', 'Certifications'],
  },
  {
    id: 'experience',
    title: 'Work & Volunteering',
    icon: '💼',
    completed: false,
    fields: ['Internships', 'Volunteer Work', 'Projects'],
  },
  {
    id: 'languages',
    title: 'Language Proficiency',
    icon: '🌍',
    completed: true,
    fields: ['English Level', 'Other Languages', 'Test Scores'],
  },
  {
    id: 'statement',
    title: 'Personal Statement',
    icon: '✍️',
    completed: false,
    fields: ['Why UK?', 'Career Goals', 'What Makes You Unique?'],
  },
];

export const universities = [
  {
    id: 1,
    name: 'University of Oxford',
    location: 'Oxford, England',
    ranking: 1,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 101, name: 'Computer Science', duration: '3 years', fee: '£28,950' },
        { id: 102, name: 'Economics', duration: '3 years', fee: '£26,770' },
        { id: 103, name: 'Medicine', duration: '6 years', fee: '£48,670' },
      ],
      master: [
        { id: 104, name: 'Machine Learning', duration: '1 year', fee: '£32,760' },
        { id: 105, name: 'International Relations', duration: '1 year', fee: '£28,950' },
      ],
      phd: [
        { id: 106, name: 'Artificial Intelligence', duration: '3-4 years', fee: '£28,040' },
      ],
    },
  },
  {
    id: 2,
    name: 'University of Cambridge',
    location: 'Cambridge, England',
    ranking: 2,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 201, name: 'Natural Sciences', duration: '3 years', fee: '£28,893' },
        { id: 202, name: 'Engineering', duration: '4 years', fee: '£37,293' },
      ],
      master: [
        { id: 203, name: 'Data Science', duration: '1 year', fee: '£34,722' },
        { id: 204, name: 'Business Administration', duration: '2 years', fee: '£64,000' },
      ],
      phd: [
        { id: 205, name: 'Physics', duration: '3-4 years', fee: '£28,893' },
      ],
    },
  },
  {
    id: 3,
    name: 'Imperial College London',
    location: 'London, England',
    ranking: 3,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 301, name: 'Biomedical Engineering', duration: '3 years', fee: '£40,940' },
        { id: 302, name: 'Mathematics', duration: '3 years', fee: '£38,800' },
      ],
      master: [
        { id: 303, name: 'Artificial Intelligence', duration: '1 year', fee: '£39,400' },
        { id: 304, name: 'Finance', duration: '1 year', fee: '£38,250' },
      ],
      phd: [
        { id: 305, name: 'Robotics', duration: '3-4 years', fee: '£33,750' },
      ],
    },
  },
  {
    id: 4,
    name: 'London School of Economics',
    location: 'London, England',
    ranking: 4,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 401, name: 'Economics', duration: '3 years', fee: '£25,608' },
        { id: 402, name: 'International Relations', duration: '3 years', fee: '£25,608' },
      ],
      master: [
        { id: 403, name: 'Public Policy', duration: '1 year', fee: '£30,960' },
        { id: 404, name: 'Finance & Economics', duration: '1 year', fee: '£38,448' },
      ],
      phd: [
        { id: 405, name: 'Political Science', duration: '3-4 years', fee: '£25,296' },
      ],
    },
  },
  {
    id: 5,
    name: 'University College London',
    location: 'London, England',
    ranking: 5,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 501, name: 'Psychology', duration: '3 years', fee: '£32,100' },
        { id: 502, name: 'Architecture', duration: '3 years', fee: '£32,100' },
      ],
      master: [
        { id: 503, name: 'Urban Planning', duration: '1 year', fee: '£32,100' },
        { id: 504, name: 'Clinical Psychology', duration: '3 years', fee: '£19,900' },
      ],
      phd: [
        { id: 505, name: 'Neuroscience', duration: '3-4 years', fee: '£28,500' },
      ],
    },
  },
  {
    id: 6,
    name: 'University of Edinburgh',
    location: 'Edinburgh, Scotland',
    ranking: 6,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 601, name: 'Informatics', duration: '4 years', fee: '£34,800' },
        { id: 602, name: 'Law', duration: '4 years', fee: '£25,100' },
      ],
      master: [
        { id: 603, name: 'Cognitive Science', duration: '1 year', fee: '£35,300' },
      ],
      phd: [
        { id: 604, name: 'Environmental Science', duration: '3-4 years', fee: '£27,900' },
      ],
    },
  },
];
