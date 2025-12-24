import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Mock data imported directly
const universities = [
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
  {
    id: 7,
    name: 'University of Bristol',
    location: 'Bristol, England',
    ranking: 7,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 701, name: 'Aerospace Engineering', duration: '3 years', fee: '£29,300' },
        { id: 702, name: 'Film & Television', duration: '3 years', fee: '£27,200' },
      ],
      master: [
        { id: 703, name: 'Robotics', duration: '1 year', fee: '£31,200' },
        { id: 704, name: 'Education', duration: '1 year', fee: '£24,600' },
      ],
      phd: [
        { id: 705, name: 'Climate Science', duration: '3-4 years', fee: '£25,300' },
      ],
    },
  },
  {
    id: 8,
    name: 'University of Glasgow',
    location: 'Glasgow, Scotland',
    ranking: 8,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 801, name: 'Medicine', duration: '5 years', fee: '£58,000' },
        { id: 802, name: 'Veterinary Medicine', duration: '5 years', fee: '£60,000' },
      ],
      master: [
        { id: 803, name: 'Public Health', duration: '1 year', fee: '£25,750' },
        { id: 804, name: 'International Business', duration: '1 year', fee: '£29,370' },
      ],
      phd: [
        { id: 805, name: 'Biomedical Sciences', duration: '3-4 years', fee: '£26,640' },
      ],
    },
  },
  {
    id: 9,
    name: 'University of Southampton',
    location: 'Southampton, England',
    ranking: 9,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 901, name: 'Ship Science', duration: '3 years', fee: '£27,400' },
        { id: 902, name: 'Oceanography', duration: '3 years', fee: '£26,000' },
      ],
      master: [
        { id: 903, name: 'Marine Engineering', duration: '1 year', fee: '£28,000' },
        { id: 904, name: 'Web Science', duration: '1 year', fee: '£28,000' },
      ],
      phd: [
        { id: 905, name: 'Marine Biology', duration: '3-4 years', fee: '£24,400' },
      ],
    },
  },
  {
    id: 10,
    name: 'University of Birmingham',
    location: 'Birmingham, England',
    ranking: 10,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1001, name: 'Dentistry', duration: '5 years', fee: '£48,300' },
        { id: 1002, name: 'Sports Science', duration: '3 years', fee: '£25,560' },
      ],
      master: [
        { id: 1003, name: 'MBA', duration: '2 years', fee: '£33,000' },
        { id: 1004, name: 'Advanced Computer Science', duration: '1 year', fee: '£29,040' },
      ],
      phd: [
        { id: 1005, name: 'Cancer Research', duration: '3-4 years', fee: '£25,260' },
      ],
    },
  },
  {
    id: 11,
    name: 'University of Leeds',
    location: 'Leeds, England',
    ranking: 11,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1101, name: 'Fashion Design', duration: '3 years', fee: '£26,500' },
        { id: 1102, name: 'Civil Engineering', duration: '4 years', fee: '£28,750' },
      ],
      master: [
        { id: 1103, name: 'Sustainability & Business', duration: '1 year', fee: '£30,000' },
        { id: 1104, name: 'Digital Media', duration: '1 year', fee: '£25,500' },
      ],
      phd: [
        { id: 1105, name: 'Transport Studies', duration: '3-4 years', fee: '£24,000' },
      ],
    },
  },
  {
    id: 12,
    name: 'Durham University',
    location: 'Durham, England',
    ranking: 12,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1201, name: 'Philosophy', duration: '3 years', fee: '£27,750' },
        { id: 1202, name: 'Business Management', duration: '3 years', fee: '£27,750' },
      ],
      master: [
        { id: 1203, name: 'International Relations', duration: '1 year', fee: '£27,900' },
        { id: 1204, name: 'Marketing', duration: '1 year', fee: '£31,500' },
      ],
      phd: [
        { id: 1205, name: 'History', duration: '3-4 years', fee: '£24,300' },
      ],
    },
  },
  {
    id: 13,
    name: 'The University of Sheffield',
    location: 'Sheffield, England',
    ranking: 13,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1301, name: 'Journalism', duration: '3 years', fee: '£25,670' },
        { id: 1302, name: 'Materials Science', duration: '3 years', fee: '£29,110' },
      ],
      master: [
        { id: 1303, name: 'Journalism Studies', duration: '1 year', fee: '£25,600' },
        { id: 1304, name: 'Advanced Mechanical Engineering', duration: '1 year', fee: '£29,950' },
      ],
      phd: [
        { id: 1305, name: 'Aerospace Engineering', duration: '3-4 years', fee: '£27,500' },
      ],
    },
  },
  {
    id: 14,
    name: 'Queen Mary University of London',
    location: 'London, England',
    ranking: 14,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1401, name: 'Law with Politics', duration: '3 years', fee: '£26,250' },
        { id: 1402, name: 'Film Studies', duration: '3 years', fee: '£23,950' },
      ],
      master: [
        { id: 1403, name: 'Commercial Law', duration: '1 year', fee: '£28,950' },
        { id: 1404, name: 'Global Health', duration: '1 year', fee: '£24,500' },
      ],
      phd: [
        { id: 1405, name: 'International Law', duration: '3-4 years', fee: '£23,460' },
      ],
    },
  },
  {
    id: 15,
    name: 'Newcastle University',
    location: 'Newcastle upon Tyne, England',
    ranking: 15,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1501, name: 'Architecture', duration: '3 years', fee: '£28,800' },
        { id: 1502, name: 'Marine Technology', duration: '4 years', fee: '£28,800' },
      ],
      master: [
        { id: 1503, name: 'Urban Design', duration: '1 year', fee: '£26,400' },
        { id: 1504, name: 'Renewable Energy', duration: '1 year', fee: '£28,800' },
      ],
      phd: [
        { id: 1505, name: 'Marine Science', duration: '3-4 years', fee: '£25,770' },
      ],
    },
  },
  {
    id: 16,
    name: 'Lancaster University',
    location: 'Lancaster, England',
    ranking: 16,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1601, name: 'Accounting & Finance', duration: '3 years', fee: '£25,590' },
        { id: 1602, name: 'English Literature', duration: '3 years', fee: '£23,610' },
      ],
      master: [
        { id: 1603, name: 'Management Science', duration: '1 year', fee: '£27,500' },
        { id: 1604, name: 'Creative Writing', duration: '1 year', fee: '£22,650' },
      ],
      phd: [
        { id: 1605, name: 'Linguistics', duration: '3-4 years', fee: '£22,650' },
      ],
    },
  },
  {
    id: 17,
    name: 'University of Liverpool',
    location: 'Liverpool, England',
    ranking: 17,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1701, name: 'Popular Music', duration: '3 years', fee: '£25,050' },
        { id: 1702, name: 'Pharmacy', duration: '4 years', fee: '£28,000' },
      ],
      master: [
        { id: 1703, name: 'Football Industries MBA', duration: '1 year', fee: '£22,000' },
        { id: 1704, name: 'Music Industry Studies', duration: '1 year', fee: '£24,800' },
      ],
      phd: [
        { id: 1705, name: 'Tropical Medicine', duration: '3-4 years', fee: '£24,400' },
      ],
    },
  },
  {
    id: 18,
    name: 'University of Surrey',
    location: 'Guildford, England',
    ranking: 18,
    logo: '🎓',
    programs: {
      bachelor: [
        { id: 1801, name: 'Hospitality Management', duration: '3 years', fee: '£23,100' },
        { id: 1802, name: 'Electrical Engineering', duration: '4 years', fee: '£26,500' },
      ],
      master: [
        { id: 1803, name: 'Tourism Marketing', duration: '1 year', fee: '£23,800' },
        { id: 1804, name: '5G & Mobile Communications', duration: '1 year', fee: '£27,400' },
      ],
      phd: [
        { id: 1805, name: 'Space Engineering', duration: '3-4 years', fee: '£25,000' },
      ],
    },
  },
];

// Internal mutation to clear all data (useful for re-seeding)
export const clearAllData = internalMutation({
  handler: async (ctx) => {
    // Delete all programs first (due to foreign key relationship)
    const programs = await ctx.db.query("programs").collect();
    for (const program of programs) {
      await ctx.db.delete(program._id);
    }

    // Delete all universities
    const universities = await ctx.db.query("universities").collect();
    for (const university of universities) {
      await ctx.db.delete(university._id);
    }

    return { message: "All data cleared successfully" };
  },
});

// Internal mutation to seed universities
export const seedUniversities = internalMutation({
  handler: async (ctx) => {
    console.log("Starting to seed universities...");

    // First, clear existing data
    await clearAllData(ctx);

    let universitiesCreated = 0;
    let programsCreated = 0;

    for (const university of universities) {
      // Insert university
      const universityId = await ctx.db.insert("universities", {
        name: university.name,
        location: university.location,
        ranking: university.ranking,
        logo: university.logo,
        description: `${university.name} is a prestigious institution located in ${university.location}.`,
      });

      universitiesCreated++;
      console.log(`Created university: ${university.name}`);

      // Insert programs for each level
      const levels = ["bachelor", "master", "phd"] as const;

      for (const level of levels) {
        const programsForLevel = university.programs[level] || [];

        for (const program of programsForLevel) {
          await ctx.db.insert("programs", {
            universityId,
            name: program.name,
            level,
            duration: program.duration,
            fee: program.fee,
          });

          programsCreated++;
        }
      }
    }

    console.log(`Seeding complete: ${universitiesCreated} universities and ${programsCreated} programs created`);

    return {
      message: "Seeding completed successfully",
      universitiesCreated,
      programsCreated,
    };
  },
});

// Internal mutation to seed a single university (for testing)
export const seedSingleUniversity = internalMutation({
  args: {
    universityIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const university = universities[args.universityIndex];

    if (!university) {
      throw new Error(`University at index ${args.universityIndex} not found`);
    }

    // Insert university
    const universityId = await ctx.db.insert("universities", {
      name: university.name,
      location: university.location,
      ranking: university.ranking,
      logo: university.logo,
      description: `${university.name} is a prestigious institution located in ${university.location}.`,
    });

    // Insert programs
    const levels = ["bachelor", "master", "phd"] as const;
    let programsCreated = 0;

    for (const level of levels) {
      const programsForLevel = university.programs[level] || [];

      for (const program of programsForLevel) {
        await ctx.db.insert("programs", {
          universityId,
          name: program.name,
          level,
          duration: program.duration,
          fee: program.fee,
        });

        programsCreated++;
      }
    }

    return {
      message: `University ${university.name} seeded successfully`,
      programsCreated,
    };
  },
});
