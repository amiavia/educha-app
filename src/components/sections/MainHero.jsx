import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { HiOutlineArrowRight } from 'react-icons/hi2';

const MainHero = () => {
  const universityLogos = [
    'Oxford', 'Cambridge', 'Imperial', 'UCL', 'Edinburgh', 'King\'s College'
  ];

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect With Your{' '}
              <span className="text-gradient">Future University</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create your academic profile and be discovered by leading UK universities
              seeking talented students like you for Bachelor's, Master's, and PhD programmes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="large" className="group">
                Create Your Profile
                <HiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button variant="secondary" size="large">
                Learn How It Works
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Partnering with prestigious UK institutions</p>
              <div className="flex flex-wrap gap-6 items-center">
                {universityLogos.map((uni) => (
                  <div
                    key={uni}
                    className="text-gray-400 font-semibold text-sm hover:text-primary-blue transition-colors"
                  >
                    {uni}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="/students-hero.png"
                alt="Diverse students at UK university"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-gold rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-blue rounded-full opacity-20 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
