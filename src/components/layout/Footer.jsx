import React from 'react';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const footerLinks = {
    students: [
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Create Profile', href: '#signup' },
      { label: 'Student FAQ', href: '#faq' },
      { label: 'Success Stories', href: '#testimonials' },
    ],
    universities: [
      { label: 'Partner With Us', href: '#partnership' },
      { label: 'University Login', href: '#login' },
      { label: 'University FAQ', href: '#uni-faq' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo & Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Educha" className="h-20 w-auto" />
              <span className="text-3xl font-display font-bold text-white">educha</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Bridging students and universities worldwide
            </p>
            <div className="inline-block bg-primary-gold text-white text-xs px-3 py-1 rounded-full">
              Based in the United Kingdom
            </div>
          </div>

          {/* Column 2: For Students */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Students</h4>
            <ul className="space-y-2">
              {footerLinks.students.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Universities */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Universities</h4>
            <ul className="space-y-2">
              {footerLinks.universities.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-gold transition-colors duration-200"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-gold transition-colors duration-200"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="mailto:hello@educha.com"
                className="text-gray-400 hover:text-primary-gold transition-colors duration-200"
              >
                <HiOutlineEnvelope size={20} />
              </a>
            </div>
            <div className="mt-4">
              <a
                href="mailto:hello@educha.com"
                className="text-sm hover:text-primary-gold transition-colors duration-200"
              >
                hello@educha.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2025 Educha Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0 text-xs text-gray-400">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              GDPR Compliant
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Data Protected
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              UK Registered Company
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
