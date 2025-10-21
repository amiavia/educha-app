import React from 'react';
import { motion } from 'framer-motion';

const UniversityPartners = () => {
  const universities = [
    'Oxford', 'Cambridge', 'Imperial College', 'UCL',
    'Edinburgh', "King's College", 'Manchester', 'Warwick',
    'Bristol', 'LSE', 'Durham', 'St Andrews'
  ];

  const programmeAreas = [
    'Science & Engineering',
    'Business & Economics',
    'Arts & Humanities',
    'Medicine & Health',
    'Social Sciences',
    'Law'
  ];

  return (
    <section id="universities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Leading UK Institutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our partner universities are actively seeking students across all disciplines
          </p>
        </motion.div>

        {/* University Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12"
        >
          {universities.map((uni, index) => (
            <motion.div
              key={uni}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 grayscale hover:grayscale-0"
            >
              <span className="text-gray-600 font-semibold text-center hover:text-primary-blue transition-colors">
                {uni}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Programme Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Programme Areas</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {programmeAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium hover:bg-primary-blue hover:text-white transition-all duration-300 cursor-pointer"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="text-gray-500 italic">
            New partner institutions joining regularly
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default UniversityPartners;
