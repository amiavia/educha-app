import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = React.useState(false);

  // Make login function available globally for Header button
  React.useEffect(() => {
    window.showLogin = () => setShowLogin(true);
  }, []);

  if (user) {
    return <DashboardPage />;
  }

  if (showLogin) {
    return <LoginPage />;
  }

  return <LandingPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
