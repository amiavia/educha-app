import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import Button from '../ui/Button';

const UniversitySection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center">
              <HiOutlineAcademicCap className="text-primary-blue" size={32} />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            For Universities: Find Your Next Cohort
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with motivated, qualified students actively seeking programmes at your institution.
          </p>

          {/* CTA */}
          <Button variant="secondary" size="large">
            Learn About Partnership
          </Button>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-blue rounded-full mr-2"></div>
              Direct Student Access
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary-gold rounded-full mr-2"></div>
              Quality Candidates
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent-blue rounded-full mr-2"></div>
              Streamlined Process
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UniversitySection;
