# Convex Backend Setup

This directory contains the Convex backend configuration for the Educha application.

## Database Schema

### Tables

1. **users**: User profiles and authentication data
   - clerkId: Unique identifier from Clerk authentication
   - email: User email address
   - fullName, dateOfBirth, nationality, phone: Profile information
   - profileCompletion: Percentage of profile completion (0-100)
   - createdAt, updatedAt: Timestamps

2. **profileSections**: User profile section completion tracking
   - userId: Reference to users table
   - sectionId: Identifier for the profile section
   - completed: Boolean flag
   - data: JSON data for the section
   - updatedAt: Timestamp

3. **universities**: University information
   - name: University name
   - location: Geographic location
   - ranking: Optional ranking number
   - logo: Optional logo URL
   - description: University description

4. **programs**: Academic programs offered by universities
   - universityId: Reference to universities table
   - name: Program name
   - level: Program level (bachelor, master, phd)
   - duration: Program duration
   - fee: Program fee information

5. **applications**: User applications to programs
   - userId: Reference to users table
   - programId: Reference to programs table
   - status: Application status (draft, submitted, under_review, accepted, rejected)
   - submittedAt: Timestamp when submitted
   - createdAt: Timestamp when created

6. **documents**: User uploaded documents
   - userId: Reference to users table
   - storageId: Convex storage identifier
   - fileName: Original file name
   - fileType: Document type
   - uploadedAt: Timestamp

## Functions

### users.ts
- `getUserByClerkId`: Query user by Clerk ID
- `getUserByEmail`: Query user by email
- `getUser`: Query user by ID
- `createOrUpdateUser`: Create or update user profile
- `updateUserProfile`: Update user profile fields
- `updateProfileCompletion`: Update profile completion percentage
- `getProfileSections`: Get all profile sections for a user
- `updateProfileSection`: Update a specific profile section

### universities.ts
- `getAllUniversities`: Get all universities
- `getUniversitiesByRanking`: Get universities filtered by ranking
- `getUniversity`: Get university by ID
- `searchUniversitiesByName`: Search universities by name
- `createUniversity`: Create a new university
- `getProgramsByUniversity`: Get all programs for a university
- `getAllPrograms`: Get all programs
- `getProgramsByLevel`: Get programs by level
- `getProgram`: Get program by ID
- `createProgram`: Create a new program
- `getProgramWithUniversity`: Get program with university details
- `searchPrograms`: Search programs with filters

### applications.ts
- `getUserApplications`: Get all applications for a user
- `getApplicationsByStatus`: Get applications filtered by status
- `getApplication`: Get application by ID
- `getApplicationWithDetails`: Get application with program and university details
- `createApplication`: Create a new application
- `updateApplicationStatus`: Update application status
- `deleteApplication`: Delete an application
- `countApplicationsByStatus`: Count applications by status for a user
- `hasUserAppliedToProgram`: Check if user has applied to a program

### documents.ts
- `getUserDocuments`: Get all documents for a user
- `getDocumentsByType`: Get documents filtered by type
- `getDocument`: Get document by ID
- `uploadDocument`: Upload a new document
- `deleteDocument`: Delete a document
- `generateUploadUrl`: Generate URL for file upload
- `getFileUrl`: Get URL for a stored file
- `countDocumentsByType`: Count documents by type for a user

## Setup Instructions

1. Install Convex package (already done):
   ```bash
   npm install convex
   ```

2. Initialize Convex:
   ```bash
   npm run convex:init
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Convex deployment URL
   - Add your Clerk credentials

4. Start Convex development server:
   ```bash
   npm run convex:dev
   ```

5. Deploy to production:
   ```bash
   npm run convex:deploy
   ```

## Authentication

This setup integrates with Clerk for authentication. The `auth.config.ts` file configures Clerk as the authentication provider.

## Next Steps

1. Run `npm run convex:init` to initialize your Convex deployment
2. Set up your environment variables in `.env.local`
3. Start the development server with `npm run convex:dev`
4. Access the Convex dashboard to view your data
