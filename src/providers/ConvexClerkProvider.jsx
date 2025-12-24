import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';

// Convex client - only initialize if URL is available
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

// Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/**
 * ConvexClerkProvider wraps the app with both Convex and Clerk providers.
 * This enables:
 * - Real-time data subscriptions via Convex
 * - Authentication via Clerk
 * - Automatic auth token passing to Convex
 */
export function ConvexClerkProvider({ children }) {
  // If Convex or Clerk is not configured, render children without providers
  // This allows the app to work in development with mock data
  if (!convex || !clerkPubKey) {
    console.warn('Convex or Clerk not configured. Running in mock mode.');
    return children;
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

/**
 * ConvexOnlyProvider wraps the app with just Convex (no auth).
 * Useful for public data or development without Clerk.
 */
export function ConvexOnlyProvider({ children }) {
  if (!convex) {
    console.warn('Convex not configured. Running in mock mode.');
    return children;
  }

  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}

export { convex };
