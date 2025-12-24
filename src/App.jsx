import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { AuthProvider } from './context/AuthContext';
import { ConvexClerkProvider } from './providers/ConvexClerkProvider';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  const { isLoaded, isSignedIn } = useAuth();
  const [showLogin, setShowLogin] = React.useState(false);

  // Make login function available globally for Header button
  React.useEffect(() => {
    window.showLogin = () => setShowLogin(true);
  }, []);

  // Show loading spinner while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User is signed in - show Dashboard
  if (isSignedIn) {
    return (
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    );
  }

  // User is signed out - show Landing or Login page
  return showLogin ? <LoginPage /> : <LandingPage />;
}

function App() {
  return (
    <ConvexClerkProvider>
      <AppContent />
    </ConvexClerkProvider>
  );
}

export default App;
