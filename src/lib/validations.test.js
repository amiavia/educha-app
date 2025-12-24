import { describe, it, expect } from 'vitest';
import {
  userProfileSchema,
  loginSchema,
  applicationSchema,
  documentSchema,
  validateUserProfile,
  validateLogin,
  validateApplication,
  validateDocument,
  formatValidationErrors,
} from './validations';

describe('Validation Schemas', () => {
  describe('userProfileSchema', () => {
    it('validates a valid user profile', () => {
      const validProfile = {
        fullName: 'John Doe',
        email: 'john@example.com',
        dateOfBirth: '1990-01-01',
        nationality: 'UK',
        phone: '+44123456789',
      };

      expect(() => userProfileSchema.parse(validProfile)).not.toThrow();
    });

    it('requires fullName to be at least 2 characters', () => {
      const invalidProfile = {
        fullName: 'J',
        email: 'john@example.com',
      };

      expect(() => userProfileSchema.parse(invalidProfile)).toThrow();
    });

    it('requires a valid email', () => {
      const invalidProfile = {
        fullName: 'John Doe',
        email: 'not-an-email',
      };

      expect(() => userProfileSchema.parse(invalidProfile)).toThrow();
    });

    it('allows optional fields to be omitted', () => {
      const minimalProfile = {
        fullName: 'John Doe',
        email: 'john@example.com',
      };

      expect(() => userProfileSchema.parse(minimalProfile)).not.toThrow();
    });
  });

  describe('loginSchema', () => {
    it('validates valid login credentials', () => {
      const validLogin = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(() => loginSchema.parse(validLogin)).not.toThrow();
    });

    it('requires a valid email', () => {
      const invalidLogin = {
        email: 'invalid-email',
        password: 'password123',
      };

      expect(() => loginSchema.parse(invalidLogin)).toThrow();
    });

    it('requires password to be at least 6 characters', () => {
      const invalidLogin = {
        email: 'test@example.com',
        password: '12345',
      };

      expect(() => loginSchema.parse(invalidLogin)).toThrow();
    });
  });

  describe('applicationSchema', () => {
    it('validates a valid application', () => {
      const validApp = {
        programId: 'program123',
        status: 'draft',
      };

      expect(() => applicationSchema.parse(validApp)).not.toThrow();
    });

    it('requires programId', () => {
      const invalidApp = {
        programId: '',
        status: 'draft',
      };

      expect(() => applicationSchema.parse(invalidApp)).toThrow();
    });

    it('only allows valid status values', () => {
      const invalidApp = {
        programId: 'program123',
        status: 'invalid_status',
      };

      expect(() => applicationSchema.parse(invalidApp)).toThrow();
    });

    it('accepts all valid status values', () => {
      const statuses = ['draft', 'submitted', 'under_review', 'accepted', 'rejected'];

      statuses.forEach((status) => {
        const app = { programId: 'program123', status };
        expect(() => applicationSchema.parse(app)).not.toThrow();
      });
    });
  });

  describe('documentSchema', () => {
    it('validates a valid document', () => {
      const validDoc = {
        fileName: 'passport.pdf',
        fileType: 'passport',
      };

      expect(() => documentSchema.parse(validDoc)).not.toThrow();
    });

    it('requires fileName', () => {
      const invalidDoc = {
        fileName: '',
        fileType: 'passport',
      };

      expect(() => documentSchema.parse(invalidDoc)).toThrow();
    });

    it('only allows valid fileType values', () => {
      const invalidDoc = {
        fileName: 'file.pdf',
        fileType: 'invalid_type',
      };

      expect(() => documentSchema.parse(invalidDoc)).toThrow();
    });

    it('accepts all valid fileType values', () => {
      const types = ['passport', 'transcript', 'cv', 'motivation_letter', 'recommendation', 'other'];

      types.forEach((fileType) => {
        const doc = { fileName: 'file.pdf', fileType };
        expect(() => documentSchema.parse(doc)).not.toThrow();
      });
    });
  });
});

describe('Validation Helper Functions', () => {
  describe('validateUserProfile', () => {
    it('returns success true for valid data', () => {
      const result = validateUserProfile({
        fullName: 'John Doe',
        email: 'john@example.com',
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        fullName: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('returns success false with errors for invalid data', () => {
      const result = validateUserProfile({
        fullName: 'J',
        email: 'invalid',
      });

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateLogin', () => {
    it('returns success true for valid credentials', () => {
      const result = validateLogin({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
    });

    it('returns errors for invalid credentials', () => {
      const result = validateLogin({
        email: 'invalid',
        password: '123',
      });

      expect(result.success).toBe(false);
      expect(result.errors.length).toBe(2);
    });
  });

  describe('validateApplication', () => {
    it('returns success true for valid application', () => {
      const result = validateApplication({
        programId: 'program123',
        status: 'submitted',
      });

      expect(result.success).toBe(true);
    });

    it('returns errors for invalid status', () => {
      const result = validateApplication({
        programId: 'program123',
        status: 'invalid',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('validateDocument', () => {
    it('returns success true for valid document', () => {
      const result = validateDocument({
        fileName: 'cv.pdf',
        fileType: 'cv',
      });

      expect(result.success).toBe(true);
    });

    it('returns errors for missing fileName', () => {
      const result = validateDocument({
        fileName: '',
        fileType: 'cv',
      });

      expect(result.success).toBe(false);
    });
  });

  describe('formatValidationErrors', () => {
    it('formats errors into an object keyed by path', () => {
      const errors = [
        { path: ['email'], message: 'Invalid email' },
        { path: ['password'], message: 'Password too short' },
      ];

      const formatted = formatValidationErrors(errors);

      expect(formatted).toEqual({
        email: 'Invalid email',
        password: 'Password too short',
      });
    });

    it('handles nested paths', () => {
      const errors = [
        { path: ['address', 'city'], message: 'City is required' },
      ];

      const formatted = formatValidationErrors(errors);

      expect(formatted).toEqual({
        'address.city': 'City is required',
      });
    });

    it('returns empty object for undefined errors', () => {
      const formatted = formatValidationErrors(undefined);
      expect(formatted).toEqual({});
    });

    it('returns empty object for null errors', () => {
      const formatted = formatValidationErrors(null);
      expect(formatted).toEqual({});
    });
  });
});
