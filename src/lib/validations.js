import { z } from 'zod';

// User validation schemas
export const userProfileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Application validation schemas
export const applicationSchema = z.object({
  programId: z.string().min(1, 'Program is required'),
  status: z.enum(['draft', 'submitted', 'under_review', 'accepted', 'rejected']),
});

// Document validation schemas
export const documentSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.enum(['passport', 'transcript', 'cv', 'motivation_letter', 'recommendation', 'other']),
});

// University search schema
export const universitySearchSchema = z.object({
  searchTerm: z.string().optional(),
  minRanking: z.number().positive().optional(),
  maxRanking: z.number().positive().optional(),
});

// Program search schema
export const programSearchSchema = z.object({
  searchTerm: z.string().optional(),
  level: z.enum(['bachelor', 'master', 'phd']).optional(),
  universityId: z.string().optional(),
});

// Profile section schema
export const profileSectionSchema = z.object({
  sectionId: z.string().min(1, 'Section ID is required'),
  completed: z.boolean(),
  data: z.any(),
});

// Validation helper functions
export const validateUserProfile = (data) => {
  try {
    return { success: true, data: userProfileSchema.parse(data) };
  } catch (error) {
    return { success: false, errors: error.issues || error.errors };
  }
};

export const validateLogin = (data) => {
  try {
    return { success: true, data: loginSchema.parse(data) };
  } catch (error) {
    return { success: false, errors: error.issues || error.errors };
  }
};

export const validateApplication = (data) => {
  try {
    return { success: true, data: applicationSchema.parse(data) };
  } catch (error) {
    return { success: false, errors: error.issues || error.errors };
  }
};

export const validateDocument = (data) => {
  try {
    return { success: true, data: documentSchema.parse(data) };
  } catch (error) {
    return { success: false, errors: error.issues || error.errors };
  }
};

// Form error formatting
export const formatValidationErrors = (errors) => {
  if (!errors) return {};
  return errors.reduce((acc, error) => {
    const path = error.path.join('.');
    acc[path] = error.message;
    return acc;
  }, {});
};
