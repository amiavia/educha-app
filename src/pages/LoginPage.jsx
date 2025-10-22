import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineAcademicCap } from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaMicrosoft, FaLinkedin } from 'react-icons/fa';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login - always succeeds and navigates to dashboard
    console.log(`Logging in with ${provider}`);
    login('demo@educha.co.uk', 'demo123');
  };

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

      {/* Right Side - Auth Form */}
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

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {isSignUp ? 'Start your education journey today' : 'Sign in to continue your journey'}
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all font-medium text-gray-700"
                style={{ minHeight: '44px' }}
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialLogin('Apple')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 active:bg-gray-800 transition-all font-medium"
                style={{ minHeight: '44px' }}
              >
                <FaApple size={20} />
                Continue with Apple
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('Microsoft')}
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all font-medium text-gray-700"
                  style={{ minHeight: '44px' }}
                >
                  <FaMicrosoft size={18} className="text-[#00A4EF]" />
                  <span className="hidden sm:inline">Microsoft</span>
                </button>

                <button
                  onClick={() => handleSocialLogin('LinkedIn')}
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all font-medium text-gray-700"
                  style={{ minHeight: '44px' }}
                >
                  <FaLinkedin size={18} className="text-[#0A66C2]" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineEnvelope className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm sm:text-base"
                    placeholder="you@example.com"
                    style={{ minHeight: '44px' }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm sm:text-base"
                    placeholder="••••••••"
                    style={{ minHeight: '44px' }}
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full text-sm sm:text-base"
                size="large"
                style={{ minHeight: '44px' }}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            {/* Toggle Sign In / Sign Up */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary-blue hover:text-blue-900 font-medium text-sm"
                style={{ minHeight: '44px' }}
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Demo Credentials */}
            {!isSignUp && (
              <div className="mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-gray-600 text-center mb-1.5">Demo Access (click any button above):</p>
                <p className="text-xs text-gray-700 text-center font-mono">
                  Any social login or: meera@educha.co.uk / educha1113
                </p>
              </div>
            )}
          </div>

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
