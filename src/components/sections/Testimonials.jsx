import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import Card from '../ui/Card';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I received interest from three Russell Group universities within my first month. The direct contact made all the difference.",
      name: "Sarah M.",
      origin: "India",
      programme: "MSc Computer Science",
      university: "University of Edinburgh",
      emoji: "👩‍🎓"
    },
    {
      quote: "As an international student, finding the right PhD programme felt overwhelming. Educha connected me directly with supervisors in my research area.",
      name: "James O.",
      origin: "Nigeria",
      programme: "PhD Engineering",
      university: "Imperial College London",
      emoji: "👨‍🔬"
    },
    {
      quote: "I didn't know which UK universities offered my niche subject. Through Educha, they found me instead.",
      name: "Maria S.",
      origin: "Spain",
      programme: "BA International Relations",
      university: "King's College London",
      emoji: "👩‍💼"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-white">
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
            Success Stories from Our Community
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <HiOutlineChatBubbleBottomCenterText className="text-primary-blue" size={32} />
                </div>

                {/* Quote Text */}
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow italic">
                  "{testimonial.quote}"
                </p>

                {/* Student Info */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center mb-3">
                    <div className="text-4xl mr-3">{testimonial.emoji}</div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.origin}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-primary-blue font-semibold">{testimonial.programme}</p>
                    <p className="text-gray-600">{testimonial.university}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
