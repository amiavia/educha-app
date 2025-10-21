import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineShieldCheck, HiOutlineGlobeAlt, HiOutlineChatBubbleLeftRight, HiOutlineCheckCircle } from 'react-icons/hi2';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Benefits = () => {
  const benefits = [
    {
      icon: HiOutlineShieldCheck,
      title: 'Quality Connections',
      description: 'Carefully curated partnerships with reputable UK institutions',
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
    },
    {
      icon: HiOutlineGlobeAlt,
      title: 'Broaden Your Horizons',
      description: 'Access opportunities beyond your local options',
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
    },
    {
      icon: HiOutlineChatBubbleLeftRight,
      title: 'Direct Communication',
      description: 'Skip the middleman - speak directly with universities',
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
    },
    {
      icon: HiOutlineCheckCircle,
      title: 'Simple & Transparent',
      description: 'One profile, multiple opportunities, no hidden fees',
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
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
            Why Educha?
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className={`w-14 h-14 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={benefit.color} size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Student-Focused Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Take Control of Your Academic Future
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Traditional university applications can be time-consuming and stressful.
                Educha flips the process.
              </p>
              <p>
                Create one comprehensive profile and let universities come to you.
              </p>
              <p>
                Whether you're pursuing your first degree or advancing your research career,
                connect with institutions that value what you bring.
              </p>
            </div>
            <Button size="large">Get Started Free</Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/student-laptop.png"
                alt="Student working on laptop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
