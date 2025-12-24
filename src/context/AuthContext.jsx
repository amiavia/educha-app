import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [convexUserId, setConvexUserId] = useState(null);

  // Convex mutations and queries
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);
  const convexUser = useQuery(
    api.users.getUserByClerkId,
    isSignedIn && clerkUser ? { clerkId: clerkUser.id } : 'skip'
  );

  // Sync Clerk user to Convex on sign-in
  useEffect(() => {
    if (isSignedIn && clerkUser && !convexUserId) {
      createOrUpdateUser({
        clerkId: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        fullName: clerkUser.fullName || undefined,
      }).then((userId) => {
        setConvexUserId(userId);
      }).catch((error) => {
        console.error('Failed to sync user to Convex:', error);
      });
    }
  }, [isSignedIn, clerkUser, convexUserId, createOrUpdateUser]);

  // Update convexUserId when user is fetched
  useEffect(() => {
    if (convexUser?._id) {
      setConvexUserId(convexUser._id);
    }
  }, [convexUser]);

  // Transform Clerk user to match expected user shape with Convex data
  const user = isSignedIn && clerkUser ? {
    id: clerkUser.id,
    convexId: convexUserId,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    name: clerkUser.firstName || clerkUser.fullName || 'User',
    fullName: clerkUser.fullName,
    imageUrl: clerkUser.imageUrl,
    profileCompletion: convexUser?.profileCompletion ?? 0,
  } : null;

  const login = () => {
    // Login is now handled by Clerk's SignIn component
    // This function is kept for backwards compatibility
    window.showLogin?.();
  };

  const logout = async () => {
    setConvexUserId(null);
    await signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoaded, isSignedIn, convexUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
