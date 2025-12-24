/**
 * Custom hooks for Convex integration.
 * These hooks provide a clean interface for components to interact with Convex.
 * They also handle the mock mode when Convex is not configured.
 */

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Check if Convex is configured
const isConvexConfigured = !!import.meta.env.VITE_CONVEX_URL;

/**
 * Hook to get all universities
 * Falls back to empty array if Convex not configured
 */
export function useUniversities() {
  const universities = useQuery(
    isConvexConfigured ? api.universities.getAllUniversities : undefined
  );

  return {
    universities: universities ?? [],
    isLoading: universities === undefined,
  };
}

/**
 * Hook to search universities by name
 */
export function useSearchUniversities(searchTerm) {
  const universities = useQuery(
    isConvexConfigured ? api.universities.searchUniversitiesByName : undefined,
    searchTerm ? { searchTerm } : 'skip'
  );

  return {
    universities: universities ?? [],
    isLoading: universities === undefined,
  };
}

/**
 * Hook to get programs by university
 */
export function useProgramsByUniversity(universityId) {
  const programs = useQuery(
    isConvexConfigured ? api.universities.getProgramsByUniversity : undefined,
    universityId ? { universityId } : 'skip'
  );

  return {
    programs: programs ?? [],
    isLoading: programs === undefined,
  };
}

/**
 * Hook to get all programs
 */
export function useAllPrograms() {
  const programs = useQuery(
    isConvexConfigured ? api.universities.getAllPrograms : undefined
  );

  return {
    programs: programs ?? [],
    isLoading: programs === undefined,
  };
}

/**
 * Hook to get user applications
 */
export function useUserApplications(userId) {
  const applications = useQuery(
    isConvexConfigured ? api.applications.getUserApplications : undefined,
    userId ? { userId } : 'skip'
  );

  return {
    applications: applications ?? [],
    isLoading: applications === undefined,
  };
}

/**
 * Hook to get user documents
 */
export function useUserDocuments(userId) {
  const documents = useQuery(
    isConvexConfigured ? api.documents.getUserDocuments : undefined,
    userId ? { userId } : 'skip'
  );

  return {
    documents: documents ?? [],
    isLoading: documents === undefined,
  };
}

/**
 * Hook to get user profile
 */
export function useUserProfile(clerkId) {
  const user = useQuery(
    isConvexConfigured ? api.users.getUserByClerkId : undefined,
    clerkId ? { clerkId } : 'skip'
  );

  return {
    user,
    isLoading: user === undefined,
  };
}

/**
 * Hook to get profile sections
 */
export function useProfileSections(userId) {
  const sections = useQuery(
    isConvexConfigured ? api.users.getProfileSections : undefined,
    userId ? { userId } : 'skip'
  );

  return {
    sections: sections ?? [],
    isLoading: sections === undefined,
  };
}

/**
 * Hook for application mutations
 */
export function useApplicationMutations() {
  const createApplication = useMutation(
    isConvexConfigured ? api.applications.createApplication : undefined
  );
  const updateStatus = useMutation(
    isConvexConfigured ? api.applications.updateApplicationStatus : undefined
  );
  const deleteApplication = useMutation(
    isConvexConfigured ? api.applications.deleteApplication : undefined
  );

  return {
    createApplication: isConvexConfigured ? createApplication : async () => console.warn('Convex not configured'),
    updateStatus: isConvexConfigured ? updateStatus : async () => console.warn('Convex not configured'),
    deleteApplication: isConvexConfigured ? deleteApplication : async () => console.warn('Convex not configured'),
  };
}

/**
 * Hook for document mutations
 */
export function useDocumentMutations() {
  const uploadDocument = useMutation(
    isConvexConfigured ? api.documents.uploadDocument : undefined
  );
  const deleteDocument = useMutation(
    isConvexConfigured ? api.documents.deleteDocument : undefined
  );
  const generateUploadUrl = useMutation(
    isConvexConfigured ? api.documents.generateUploadUrl : undefined
  );

  return {
    uploadDocument: isConvexConfigured ? uploadDocument : async () => console.warn('Convex not configured'),
    deleteDocument: isConvexConfigured ? deleteDocument : async () => console.warn('Convex not configured'),
    generateUploadUrl: isConvexConfigured ? generateUploadUrl : async () => console.warn('Convex not configured'),
  };
}

/**
 * Hook for user mutations
 */
export function useUserMutations() {
  const createOrUpdateUser = useMutation(
    isConvexConfigured ? api.users.createOrUpdateUser : undefined
  );
  const updateProfile = useMutation(
    isConvexConfigured ? api.users.updateUserProfile : undefined
  );
  const updateProfileCompletion = useMutation(
    isConvexConfigured ? api.users.updateProfileCompletion : undefined
  );
  const updateProfileSection = useMutation(
    isConvexConfigured ? api.users.updateProfileSection : undefined
  );

  return {
    createOrUpdateUser: isConvexConfigured ? createOrUpdateUser : async () => console.warn('Convex not configured'),
    updateProfile: isConvexConfigured ? updateProfile : async () => console.warn('Convex not configured'),
    updateProfileCompletion: isConvexConfigured ? updateProfileCompletion : async () => console.warn('Convex not configured'),
    updateProfileSection: isConvexConfigured ? updateProfileSection : async () => console.warn('Convex not configured'),
  };
}
