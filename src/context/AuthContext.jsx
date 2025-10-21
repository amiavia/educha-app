import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Hardcoded credentials
    if (email === 'meera@educha.co.uk' && password === 'educha1113') {
      const userData = {
        email: 'meera@educha.co.uk',
        name: 'Meera',
        profileCompletion: 35,
      };
      setUser(userData);
      localStorage.setItem('educha_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('educha_user');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('educha_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
