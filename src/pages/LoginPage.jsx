import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineAcademicCap } from 'react-icons/hi2';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex">
      {/* Left Side - Benefits (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-blue to-accent-blue p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="Educha" className="h-14 w-auto" />
            <div>
              <h1 className="text-3xl font-serif font-semibold tracking-tight">educha</h1>
              <p className="text-xs font-light text-blue-100 tracking-widest uppercase">Connecting Minds, Building Futures</p>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <h2 className="text-4xl font-bold leading-tight">
              Your Gateway to<br />World-Class Education
            </h2>

            <div className="space-y-6">
              {/* Benefit 1 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <HiOutlineAcademicCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Smart University Matching</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    AI-powered recommendations match you with the best universities based on your profile, grades, and aspirations.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <HiOutlineSparkles size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Streamlined Applications</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Apply to multiple universities with one profile. Upload documents once and track all applications in one place.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <HiOutlineCheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Expert Guidance</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Access comprehensive admissions guides, tips from current students, and personalized support throughout your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-blue-100 text-sm">
          <p>&copy; 2025 Educha. Empowering students worldwide.</p>
        </div>
      </div>

      {/* Right Side - Clerk Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/logo.png" alt="Educha" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-serif font-semibold text-primary-blue tracking-tight">educha</h1>
                <p className="text-[10px] font-light text-gray-600 tracking-widest uppercase">Connecting Minds, Building Futures</p>
              </div>
            </div>
          </div>

          {/* Clerk SignIn Component */}
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-xl rounded-2xl',
                headerTitle: 'text-2xl sm:text-3xl font-bold text-gray-900',
                headerSubtitle: 'text-sm sm:text-base text-gray-600',
                socialButtonsBlockButton: 'min-h-[44px] font-medium',
                formFieldInput: 'min-h-[44px] rounded-lg',
                formButtonPrimary: 'min-h-[44px] bg-primary-blue hover:bg-blue-700',
                footerActionLink: 'text-primary-blue hover:text-blue-900',
              },
            }}
            routing="hash"
            signUpUrl="#/sign-up"
          />

          {/* Mobile Benefits */}
          <div className="lg:hidden mt-8 space-y-4 text-center text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <HiOutlineCheckCircle className="text-primary-blue" size={18} />
              Smart University Matching
            </p>
            <p className="flex items-center justify-center gap-2">
              <HiOutlineCheckCircle className="text-primary-blue" size={18} />
              Streamlined Applications
            </p>
            <p className="flex items-center justify-center gap-2">
              <HiOutlineCheckCircle className="text-primary-blue" size={18} />
              Expert Guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
