# PRP-001: Production Readiness with Convex Backend

## Executive Summary
This PRP outlines the transformation of Educha from a frontend prototype into a production-ready platform using **Convex** as the backend (following the proven draiv-monorepo pattern) and **Clerk** for authentication.

**Key Architecture Decision**: Use Convex + Clerk instead of building a traditional Express/PostgreSQL backend. This provides:
- Real-time data sync out of the box
- Type-safe database schema with TypeScript
- Serverless functions (no backend to maintain)
- Built-in file storage for document uploads
- Proven pattern from draiv-monorepo

Educha is a UK university application helper that allows international students to build academic profiles and connect with UK universities. Currently it's a frontend-only React app with hardcoded authentication and mock data.

## Background
Educha is currently running as a client-side React application built with Vite, using React 19, Tailwind CSS, and Framer Motion. The application consists of approximately 4,300 lines of JSX code across 31 component files. It features a landing page with university information, a login system, and a dashboard where students can build academic profiles and explore universities.

**Current State:**
- Frontend: React 19 + Vite + Tailwind CSS
- Auth: Hardcoded credentials (meera@educha.co.uk / educha1113)
- Data: Mock data in /src/data/mockData.js
- Storage: localStorage only
- Deployment: Basic DigitalOcean shell script
- Testing: Zero test coverage
- Security: No input validation, XSS vulnerabilities, no HTTPS enforcement
- Backend: Non-existent
- Monitoring: No error tracking or analytics

**Problems to Solve:**
1. No real authentication or user management
2. No data persistence beyond localStorage
3. Security vulnerabilities (XSS, no input validation, hardcoded credentials)
4. No error handling or monitoring
5. No automated testing
6. No CI/CD pipeline
7. Poor SEO and accessibility compliance
8. No performance optimization
9. No proper environment configuration
10. Missing critical documentation

## Objectives

### Primary Goals
1. **Establish secure authentication and backend infrastructure** - Replace mock auth with real user management and secure API
2. **Implement comprehensive security measures** - Protect against XSS, CSRF, SQL injection, and other vulnerabilities
3. **Build automated testing and CI/CD** - Achieve 80%+ test coverage and automated deployment pipeline
4. **Optimize performance and accessibility** - Meet WCAG 2.1 AA standards and achieve <3s load time
5. **Create production-grade monitoring** - Track errors, performance, and user analytics
6. **Establish professional DevOps practices** - Containerization, environment management, and deployment automation

### Success Metrics
- **Security**: Zero critical vulnerabilities in security audit, HTTPS 100%, CSP implemented
- **Performance**: Lighthouse score >90, First Contentful Paint <1.5s, Time to Interactive <3s
- **Testing**: 80%+ code coverage, all critical paths covered by E2E tests
- **Accessibility**: WCAG 2.1 AA compliance, 100% keyboard navigable
- **Reliability**: 99.9% uptime, error rate <0.1%, mean time to recovery <1 hour
- **User Experience**: <100ms API response time (p95), <2s document upload processing

## Status
**Current Phase**: In Progress (Phase 1 Complete)
**Priority**: Critical
**Created**: 2024-12-24
**Last Updated**: 2024-12-24 (E2E testing approach changed to Claude Chrome Integration)
**Assignee**: Development Team

### Implementation Progress
- [x] Convex backend setup (schema, queries, mutations)
- [x] Testing framework (Vitest + React Testing Library)
- [x] Unit tests (67 tests passing)
- [x] Zod input validation
- [x] ConvexClerkProvider integration
- [x] Custom hooks for Convex queries
- [x] Seed script for universities
- [ ] Clerk authentication (requires manual dashboard setup)
- [ ] E2E tests with Claude Chrome Integration
- [ ] CI/CD pipeline

## Technical Architecture

### Current System Components
```
┌─────────────────────────────────────────┐
│         Client (React SPA)              │
│  - Landing Page                         │
│  - Login Page (hardcoded auth)          │
│  - Dashboard (student profile)          │
│  - Mock data from mockData.js           │
│  - localStorage only                    │
└─────────────────────────────────────────┘
           ↓ (No backend)
     localStorage persistence
```

### Target Production Architecture (Convex + Clerk)
```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ React 19    │  │ Tailwind CSS │  │ Framer Motion     │   │
│  │ + Vite      │  │              │  │                   │   │
│  └─────────────┘  └──────────────┘  └───────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Clerk Auth (ClerkProvider)                 ││
│  │         SSO, Magic Links, Social Auth, MFA              ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Convex React Hooks                         ││
│  │    useQuery() │ useMutation() │ useConvex()             ││
│  │           (Real-time subscriptions)                     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │ WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         CONVEX                               │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ Queries     │  │ Mutations    │  │ Actions           │   │
│  │ (real-time) │  │ (ACID)       │  │ (external APIs)   │   │
│  └─────────────┘  └──────────────┘  └───────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    schema.ts                            ││
│  │  users │ profileSections │ universities │ programs      ││
│  │  applications │ documents                               ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │              _storage (Built-in File Storage)           ││
│  │    transcripts, essays, recommendation letters          ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Crons & Scheduled Functions                ││
│  │    application deadline reminders, cleanup jobs         ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│          Monitoring (Sentry) + Analytics (Plausible)        │
└─────────────────────────────────────────────────────────────┘
```

**Why Convex over Express/PostgreSQL:**
| Traditional Stack | Convex |
|------------------|--------|
| Build API routes | Just write functions |
| Setup PostgreSQL, Redis | Built-in database |
| Configure WebSocket | Real-time by default |
| Manage S3 buckets | Built-in file storage |
| Deploy & scale servers | Serverless, auto-scales |
| 8+ weeks setup | ~1 week setup |

### Data Flow (with Convex)
1. **User Authentication**: User → Clerk SignIn → JWT validated by Convex → User record created/updated
2. **Profile Updates**: User edits profile → `useMutation(api.users.updateProfile)` → Real-time sync to all tabs
3. **Document Upload**: File → `storage.generateUploadUrl()` → Upload to Convex storage → Mutation saves metadata
4. **University Search**: `useQuery(api.universities.search, filters)` → Cached results with real-time updates
5. **Application Tracking**: User applies → Mutation creates application → Cron checks deadlines → Sends reminders

## Implementation Details

### Phase 1: Convex + Clerk Setup (Week 1-2)

#### 1.1 Initialize Convex
- [ ] **Create Convex project**
  ```bash
  npx convex init
  npm install convex
  ```
  - Files: `/convex/`, `convex.json`

- [ ] **Create schema.ts** (following draiv-monorepo pattern)
  ```typescript
  // convex/schema.ts
  import { defineSchema, defineTable } from "convex/server";
  import { v } from "convex/values";

  export default defineSchema({
    users: defineTable({
      clerkId: v.string(),
      email: v.string(),
      fullName: v.optional(v.string()),
      dateOfBirth: v.optional(v.string()),
      nationality: v.optional(v.string()),
      phone: v.optional(v.string()),
      profileCompletion: v.number(),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("by_clerkId", ["clerkId"])
      .index("by_email", ["email"]),

    profileSections: defineTable({
      userId: v.id("users"),
      sectionId: v.string(),
      completed: v.boolean(),
      data: v.any(),
      updatedAt: v.number(),
    }).index("by_user", ["userId"]),

    universities: defineTable({
      name: v.string(),
      location: v.string(),
      ranking: v.number(),
      logo: v.optional(v.string()),
    }).index("by_ranking", ["ranking"]),

    programs: defineTable({
      universityId: v.id("universities"),
      name: v.string(),
      level: v.string(),
      duration: v.string(),
      fee: v.string(),
    }).index("by_university", ["universityId"]),

    applications: defineTable({
      userId: v.id("users"),
      programId: v.id("programs"),
      status: v.string(),
      submittedAt: v.optional(v.number()),
      createdAt: v.number(),
    }).index("by_user", ["userId"]),

    documents: defineTable({
      userId: v.id("users"),
      storageId: v.id("_storage"),
      fileName: v.string(),
      fileType: v.string(),
      uploadedAt: v.number(),
    }).index("by_user", ["userId"]),
  });
  ```
  - Files: `/convex/schema.ts`

- [ ] **Setup environment variables**
  ```bash
  # .env.local
  CONVEX_DEPLOYMENT=dev:your-deployment
  NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
  CLERK_SECRET_KEY=sk_...
  ```
  - Files: `.env.local`, `.env.example`

#### 1.2 Clerk Authentication
- [ ] **Create Clerk application** at dashboard.clerk.com
  - Enable email/password
  - Enable Google OAuth
  - Enable Apple Sign In
  - Configure redirect URLs

- [ ] **Install Clerk React SDK**
  ```bash
  npm install @clerk/clerk-react
  ```

- [ ] **Wrap app with providers**
  ```tsx
  // src/main.tsx
  import { ClerkProvider } from '@clerk/clerk-react';
  import { ConvexProviderWithClerk } from 'convex/react-clerk';
  import { ConvexReactClient } from 'convex/react';

  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_KEY}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <App />
    </ConvexProviderWithClerk>
  </ClerkProvider>
  ```
  - Files: `/src/main.tsx`

- [ ] **Configure Convex auth** (following draiv pattern)
  ```typescript
  // convex/auth.config.ts
  export default {
    providers: [
      { domain: "https://clerk.your-domain.com" }
    ]
  };
  ```
  - Files: `/convex/auth.config.ts`

- [ ] **Remove hardcoded auth**
  - Delete hardcoded credentials from `/src/context/AuthContext.jsx`
  - Replace with Clerk hooks: `useUser()`, `useAuth()`, `useSignIn()`
  - Files: `/src/context/AuthContext.jsx` → delete or replace

#### 1.3 Input Validation & Sanitization
- [ ] **Frontend validation**
  - Install and configure Zod or Yup for schema validation
  - Add validation to all form components in `/src/components/forms/`
  - Validate PersonalInfoForm.jsx (email, phone, dates)
  - Validate EducationForm.jsx (dates, grades)
  - Sanitize all user inputs with DOMPurify
  - Files: `/src/utils/validation.ts`, `/src/schemas/`

- [ ] **Backend validation**
  - Mirror frontend validation schemas on backend
  - Use express-validator or similar
  - Validate all API request bodies
  - Validate file uploads (type, size, content)
  - Add rate limiting per endpoint
  - Files: `/backend/src/validators/`, `/backend/src/middleware/validate.middleware.ts`

- [ ] **XSS Protection**
  - Remove dangerouslySetInnerHTML from all components
  - Sanitize user-generated content before rendering
  - Configure Content Security Policy headers
  - Use textContent instead of innerHTML
  - Files: `/backend/src/middleware/security.middleware.ts`

#### 1.4 Security Headers & HTTPS
- [ ] **Configure security headers**
  - Add Helmet.js to backend
  - Configure CSP (Content Security Policy)
  - Add X-Frame-Options: DENY
  - Add X-Content-Type-Options: nosniff
  - Add Strict-Transport-Security
  - Files: `/backend/src/middleware/security.middleware.ts`

- [ ] **HTTPS enforcement**
  - Update nginx configuration for HTTPS redirect
  - Configure SSL/TLS certificates (Let's Encrypt)
  - Enable HSTS with preload
  - Update Vite config for secure cookies
  - Files: `/backend/nginx.conf`, `/vite.config.js`

- [ ] **CSRF Protection**
  - Implement CSRF tokens for state-changing operations
  - Use SameSite cookie attribute
  - Validate Origin and Referer headers
  - Files: `/backend/src/middleware/csrf.middleware.ts`

### Phase 2: Data Persistence & API Integration (Weeks 5-8)

#### 2.1 Database Schema & Migrations
- [ ] **User management schema**
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    oauth_provider VARCHAR(50),
    oauth_id VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
  - Files: `/backend/prisma/migrations/001_create_users.sql`

- [ ] **Student profile schema**
  ```sql
  CREATE TABLE student_profiles (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    full_name VARCHAR(255),
    date_of_birth DATE,
    nationality VARCHAR(100),
    phone VARCHAR(50),
    country VARCHAR(100),
    profile_completion INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
  - Files: `/backend/prisma/migrations/002_create_profiles.sql`

- [ ] **Education history schema**
  - Store education records (high school, bachelor's, etc.)
  - Store grades, transcripts, test scores
  - Link to document uploads
  - Files: `/backend/prisma/migrations/003_create_education.sql`

- [ ] **Universities & programs schema**
  - Migrate data from `/src/data/mockData.js` to database
  - Create universities table (18 universities)
  - Create programs table with degree levels
  - Add search indexes
  - Files: `/backend/prisma/migrations/004_create_universities.sql`, `/backend/seeds/universities.ts`

- [ ] **Documents & uploads schema**
  - Store document metadata (filename, type, size, upload date)
  - Store S3/R2 URLs
  - Track processing status
  - Files: `/backend/prisma/migrations/005_create_documents.sql`

#### 2.2 API Endpoints Development
- [ ] **Authentication endpoints**
  - POST /api/v1/auth/register - User registration
  - POST /api/v1/auth/login - Email/password login
  - POST /api/v1/auth/logout - Logout
  - POST /api/v1/auth/refresh - Refresh JWT token
  - POST /api/v1/auth/forgot-password - Password reset request
  - POST /api/v1/auth/reset-password - Reset password with token
  - GET /api/v1/auth/verify-email/:token - Email verification
  - Files: `/backend/src/routes/auth.routes.ts`, `/backend/src/controllers/auth.controller.ts`

- [ ] **Profile endpoints**
  - GET /api/v1/profile - Get current user profile
  - PUT /api/v1/profile - Update profile
  - GET /api/v1/profile/sections - Get profile sections with completion status
  - PUT /api/v1/profile/sections/:sectionId - Update specific section
  - DELETE /api/v1/profile - Delete account
  - Files: `/backend/src/routes/profile.routes.ts`, `/backend/src/controllers/profile.controller.ts`

- [ ] **Document upload endpoints**
  - POST /api/v1/documents/upload - Upload document
  - GET /api/v1/documents - List user documents
  - DELETE /api/v1/documents/:id - Delete document
  - POST /api/v1/documents/:id/process - Trigger OCR processing
  - Files: `/backend/src/routes/documents.routes.ts`, `/backend/src/controllers/documents.controller.ts`

- [ ] **University endpoints**
  - GET /api/v1/universities - List universities (with pagination, filters)
  - GET /api/v1/universities/:id - Get university details
  - GET /api/v1/universities/:id/programs - Get programs by degree level
  - GET /api/v1/universities/search - Search universities and programs
  - Files: `/backend/src/routes/universities.routes.ts`, `/backend/src/controllers/universities.controller.ts`

- [ ] **Matching endpoints**
  - GET /api/v1/matches - Get university matches for user
  - POST /api/v1/matches/:universityId/interest - Express interest
  - GET /api/v1/matches/recommendations - Get AI-powered recommendations
  - Files: `/backend/src/routes/matches.routes.ts`, `/backend/src/controllers/matches.controller.ts`

#### 2.3 File Upload & Storage
- [ ] **Setup cloud storage**
  - Configure AWS S3 or Cloudflare R2
  - Create buckets (documents-dev, documents-prod)
  - Setup IAM policies and access keys
  - Configure CORS for uploads
  - Files: `/backend/src/config/storage.config.ts`

- [ ] **File upload service**
  - Implement multipart upload support
  - Validate file types (PDF, DOCX, JPG, PNG)
  - Enforce size limits (10MB per file, 50MB total)
  - Generate signed URLs for secure uploads
  - Implement virus scanning (ClamAV)
  - Files: `/backend/src/services/upload.service.ts`

- [ ] **Document processing**
  - Integrate OCR service (AWS Textract, Google Vision, or Tesseract)
  - Extract text from uploaded documents
  - Parse educational information
  - Auto-populate profile fields
  - Queue processing jobs in background
  - Files: `/backend/src/workers/document-processor.worker.ts`

- [ ] **Update frontend upload component**
  - Modify `/src/components/sections/DocumentUpload.jsx`
  - Implement chunked upload for large files
  - Add upload progress tracking
  - Add retry logic for failed uploads
  - Show processing status
  - Files: `/src/components/sections/DocumentUpload.jsx`, `/src/services/upload.service.ts`

#### 2.4 State Management & API Integration
- [ ] **Setup API client**
  - Create Axios instance with interceptors
  - Add request/response logging
  - Implement automatic token refresh
  - Add retry logic with exponential backoff
  - Files: `/src/services/api.client.ts`

- [ ] **Replace mock data**
  - Update AuthContext to use real API
  - Replace hardcoded login in `/src/context/AuthContext.jsx`
  - Update dashboard to fetch real user data
  - Replace mockData.js with API calls
  - Files: `/src/context/AuthContext.jsx`, `/src/pages/DashboardPage.jsx`

- [ ] **Add React Query or SWR**
  - Setup caching for API responses
  - Implement optimistic updates
  - Add infinite scroll for university list
  - Handle stale data gracefully
  - Files: `/src/hooks/`, `/src/services/queries.ts`

### Phase 3: Testing Infrastructure (Weeks 9-12)

#### 3.1 Unit Testing Setup
- [ ] **Configure testing frameworks**
  - Install Vitest for unit tests
  - Install React Testing Library
  - Configure test coverage reporting
  - Setup test scripts in package.json
  - Files: `/vitest.config.ts`, `/package.json`

- [ ] **Component unit tests**
  - Test all form components (7 forms)
  - Test UI components (Button, Card, UniversityLogo)
  - Test utility functions
  - Target: 80% coverage
  - Files: `/src/components/**/*.test.jsx`

- [ ] **Hook tests**
  - Test useAuth hook
  - Test custom hooks if any
  - Mock API responses
  - Files: `/src/context/__tests__/AuthContext.test.jsx`

- [ ] **Backend unit tests**
  - Test all service layer functions
  - Test validation schemas
  - Test utility functions
  - Mock database calls
  - Files: `/backend/src/**/*.test.ts`

#### 3.2 Integration Testing
- [ ] **API integration tests**
  - Test authentication flow end-to-end
  - Test CRUD operations for profiles
  - Test file upload flow
  - Test university search and filtering
  - Use supertest for API testing
  - Files: `/backend/tests/integration/`

- [ ] **Database integration tests**
  - Test migrations
  - Test data integrity constraints
  - Test complex queries
  - Use test database
  - Files: `/backend/tests/integration/database/`

#### 3.3 End-to-End Testing
- [ ] **Setup E2E framework**
  - Use Claude Chrome Integration (MCP browser automation) for E2E testing
  - Configure test scenarios as Claude Code prompts/scripts
  - Setup test data seeding via Convex seed scripts
  - Files: `/e2e/`, `/e2e/scenarios/` (test scenario documentation)
  - **Note**: Claude Chrome Integration provides real browser automation with visual verification, eliminating the need for traditional E2E frameworks like Playwright or Cypress

- [ ] **Critical user flows**
  - Test user registration and login
  - Test profile completion flow
  - Test document upload and processing
  - Test university search and filtering
  - Test expressing interest in universities
  - Files: `/e2e/tests/auth.spec.ts`, `/e2e/tests/profile.spec.ts`, `/e2e/tests/universities.spec.ts`

- [ ] **Accessibility testing**
  - Test keyboard navigation
  - Test screen reader compatibility
  - Test focus management
  - Use axe-core for automated checks
  - Files: `/e2e/tests/accessibility.spec.ts`

#### 3.4 Performance Testing
- [ ] **Load testing**
  - Setup k6 or Artillery
  - Test API endpoints under load
  - Test concurrent user scenarios
  - Identify bottlenecks
  - Files: `/performance/load-tests/`

- [ ] **Frontend performance testing**
  - Run Lighthouse audits
  - Test bundle size limits
  - Test Time to Interactive
  - Test First Contentful Paint
  - Files: `/performance/lighthouse/`

### Phase 4: Performance Optimization (Weeks 13-16)

#### 4.1 Code Splitting & Lazy Loading
- [ ] **Route-based code splitting**
  - Lazy load LandingPage component
  - Lazy load LoginPage component
  - Lazy load DashboardPage component
  - Implement loading states
  - Files: `/src/App.jsx`

- [ ] **Component-level splitting**
  - Lazy load ProfileModal
  - Lazy load heavy components (DocumentUpload, UniversityMatches)
  - Implement React.Suspense boundaries
  - Files: `/src/pages/DashboardPage.jsx`

- [ ] **Dynamic imports**
  - Lazy load Framer Motion animations
  - Lazy load icon libraries
  - Load dependencies only when needed
  - Files: Multiple component files

#### 4.2 Asset Optimization
- [ ] **Image optimization**
  - Compress images in /public (currently 4.2MB total)
  - Convert to WebP format with fallbacks
  - Implement responsive images with srcset
  - Add lazy loading for images
  - Use CDN for static assets
  - Files: `/public/`, `/vite.config.js`

- [ ] **Font optimization**
  - Self-host Google Fonts (Inter, Comfortaa)
  - Use font-display: swap
  - Subset fonts to required characters
  - Preload critical fonts
  - Files: `/index.html`, `/public/fonts/`

- [ ] **Bundle optimization**
  - Analyze bundle with vite-bundle-visualizer
  - Remove unused dependencies
  - Tree-shake unused code
  - Configure build.rollupOptions for chunking
  - Files: `/vite.config.js`

#### 4.3 Caching Strategies
- [ ] **Browser caching**
  - Configure cache headers in nginx
  - Use content hashing for assets
  - Implement service worker for offline support
  - Files: `/backend/nginx.conf`, `/public/service-worker.js`

- [ ] **API caching**
  - Setup Redis for caching
  - Cache university list (1 hour TTL)
  - Cache user profile (5 minutes TTL)
  - Implement cache invalidation strategies
  - Files: `/backend/src/services/cache.service.ts`

- [ ] **CDN setup**
  - Configure Cloudflare or similar CDN
  - Enable edge caching
  - Setup cache purging
  - Files: Infrastructure configuration

#### 4.4 Database Optimization
- [ ] **Query optimization**
  - Add indexes on frequently queried fields
  - Optimize university search query
  - Use database query explain plans
  - Implement pagination for all list endpoints
  - Files: `/backend/prisma/schema.prisma`

- [ ] **Connection pooling**
  - Configure PostgreSQL connection pool
  - Set appropriate pool size (10-20 connections)
  - Monitor connection usage
  - Files: `/backend/src/config/database.config.ts`

### Phase 5: DevOps & Infrastructure (Weeks 17-20)

#### 5.1 Containerization
- [ ] **Docker setup**
  - Create Dockerfile for frontend
  - Create Dockerfile for backend
  - Create docker-compose.yml for local development
  - Optimize image sizes (multi-stage builds)
  - Files: `/Dockerfile`, `/backend/Dockerfile`, `/docker-compose.yml`

- [ ] **Container orchestration**
  - Consider Kubernetes or Docker Swarm for production
  - Create deployment manifests
  - Setup health checks
  - Files: `/k8s/` or `/docker-swarm/`

#### 5.2 CI/CD Pipeline
- [ ] **GitHub Actions setup**
  - Create .github/workflows directory
  - Setup test workflow (run on PR)
  - Setup build workflow
  - Setup deployment workflow
  - Files: `/.github/workflows/test.yml`, `/.github/workflows/deploy.yml`

- [ ] **Automated testing in CI**
  - Run unit tests on every commit
  - Run integration tests on PR
  - Run E2E tests before deployment
  - Generate coverage reports
  - Files: `/.github/workflows/test.yml`

- [ ] **Automated deployment**
  - Deploy to staging on merge to develop
  - Deploy to production on merge to main
  - Implement blue-green or canary deployments
  - Add deployment approval gates
  - Files: `/.github/workflows/deploy.yml`

- [ ] **Version management**
  - Setup semantic versioning
  - Automate changelog generation
  - Tag releases automatically
  - Files: `/.github/workflows/release.yml`

#### 5.3 Environment Management
- [ ] **Environment configurations**
  - Create .env.development
  - Create .env.staging
  - Create .env.production
  - Document all environment variables
  - Use secrets management (GitHub Secrets, AWS Secrets Manager)
  - Files: `/.env.example`, `/docs/environment-variables.md`

- [ ] **Feature flags**
  - Implement feature flag system
  - Control feature rollout
  - A/B testing capability
  - Files: `/backend/src/services/feature-flags.service.ts`

#### 5.4 Monitoring & Logging
- [ ] **Error tracking**
  - Setup Sentry for frontend errors
  - Setup Sentry for backend errors
  - Configure error alerting
  - Set up error grouping and deduplication
  - Files: `/src/utils/sentry.ts`, `/backend/src/config/sentry.config.ts`

- [ ] **Application monitoring**
  - Setup APM (DataDog, New Relic, or similar)
  - Monitor API response times
  - Track database query performance
  - Setup alerts for anomalies
  - Files: `/backend/src/config/monitoring.config.ts`

- [ ] **Logging infrastructure**
  - Implement structured logging (Winston, Pino)
  - Setup log aggregation (ELK Stack, CloudWatch)
  - Configure log levels by environment
  - Implement request ID tracking
  - Files: `/backend/src/config/logger.config.ts`

- [ ] **Analytics**
  - Implement Google Analytics 4
  - Track user journeys
  - Track conversion funnels
  - Add custom events (profile completion, university interest)
  - Files: `/src/utils/analytics.ts`

- [ ] **Uptime monitoring**
  - Setup Pingdom, UptimeRobot, or similar
  - Monitor critical endpoints
  - Configure downtime alerts
  - Create status page
  - Files: External service configuration

### Phase 6: Accessibility & SEO (Weeks 21-23)

#### 6.1 WCAG 2.1 AA Compliance
- [ ] **Semantic HTML**
  - Replace divs with semantic elements (header, nav, main, footer, article)
  - Use proper heading hierarchy (h1 → h2 → h3)
  - Add landmarks (role attributes if needed)
  - Files: All component files

- [ ] **ARIA attributes**
  - Add aria-label to icon buttons
  - Add aria-describedby to form fields
  - Implement live regions for dynamic content
  - Add aria-expanded for collapsible sections
  - Files: `/src/components/forms/`, `/src/components/modals/`

- [ ] **Keyboard navigation**
  - Ensure all interactive elements are keyboard accessible
  - Implement focus trapping in modals
  - Add visible focus indicators
  - Support Esc key to close modals
  - Files: `/src/components/modals/ProfileModal.jsx`

- [ ] **Color contrast**
  - Ensure 4.5:1 contrast ratio for text
  - Ensure 3:1 contrast ratio for UI components
  - Don't rely on color alone for information
  - Files: `/tailwind.config.js`, `/src/index.css`

- [ ] **Form accessibility**
  - Associate labels with inputs
  - Add error messages with aria-invalid
  - Add required field indicators
  - Provide clear error instructions
  - Files: `/src/components/forms/*.jsx`

- [ ] **Screen reader testing**
  - Test with NVDA (Windows)
  - Test with JAWS (Windows)
  - Test with VoiceOver (Mac/iOS)
  - Fix all announced issues
  - Files: Testing documentation

#### 6.2 SEO Optimization
- [ ] **Meta tags**
  - Add dynamic title and description per page
  - Add Open Graph tags for social sharing
  - Add Twitter Card tags
  - Add canonical URLs
  - Files: `/index.html`, create `/src/components/SEO.jsx`

- [ ] **Structured data**
  - Add JSON-LD schema for Organization
  - Add schema for EducationalOrganization (universities)
  - Add schema for Course (programs)
  - Files: `/src/components/StructuredData.jsx`

- [ ] **sitemap.xml**
  - Generate sitemap with all pages
  - Include university pages
  - Submit to Google Search Console
  - Files: `/public/sitemap.xml`

- [ ] **robots.txt**
  - Create robots.txt
  - Allow all crawlers
  - Point to sitemap
  - Files: `/public/robots.txt`

- [ ] **Performance for SEO**
  - Optimize Core Web Vitals
  - Ensure mobile-friendly design (already responsive)
  - Improve page load speed
  - Files: Various optimization files

### Phase 7: Code Quality & Documentation (Weeks 24-26)

#### 7.1 TypeScript Migration
- [ ] **Setup TypeScript**
  - Initialize TypeScript in frontend
  - Configure tsconfig.json
  - Install type definitions
  - Files: `/tsconfig.json`

- [ ] **Gradual migration**
  - Migrate utility functions first
  - Migrate hooks and context
  - Migrate components (rename .jsx to .tsx)
  - Add proper type definitions
  - Target: 100% TypeScript coverage
  - Files: All `.jsx` files → `.tsx`

- [ ] **Type safety**
  - Define interfaces for all data models
  - Define API response types
  - Eliminate `any` types
  - Use strict mode
  - Files: `/src/types/`, `/backend/src/types/`

#### 7.2 Enhanced Linting & Formatting
- [ ] **ESLint configuration**
  - Add TypeScript ESLint plugin
  - Add import order plugin
  - Add accessibility plugin (jsx-a11y)
  - Configure stricter rules
  - Files: `/eslint.config.js`

- [ ] **Prettier setup**
  - Install Prettier
  - Configure formatting rules
  - Setup pre-commit hooks with Husky
  - Files: `/.prettierrc`, `/.husky/pre-commit`

- [ ] **Code quality gates**
  - Setup SonarQube or Code Climate
  - Enforce code coverage thresholds
  - Block merges with critical issues
  - Files: `/.github/workflows/quality.yml`

#### 7.3 Documentation
- [ ] **README.md**
  - Update project description
  - Add setup instructions
  - Document environment variables
  - Add contribution guidelines
  - Files: `/README.md`

- [ ] **API documentation**
  - Setup Swagger/OpenAPI
  - Document all endpoints
  - Add request/response examples
  - Host documentation
  - Files: `/backend/docs/api.yml`, `/backend/src/swagger.config.ts`

- [ ] **Component documentation**
  - Add JSDoc comments to components
  - Setup Storybook for component library
  - Document props and usage
  - Files: `/.storybook/`, component files

- [ ] **Architecture documentation**
  - Document system architecture
  - Create database schema diagrams
  - Document deployment process
  - Create runbooks for common operations
  - Files: `/docs/architecture.md`, `/docs/deployment.md`, `/docs/runbooks/`

- [ ] **User documentation**
  - Create user guides
  - Add FAQ section
  - Document privacy policy
  - Document terms of service
  - Files: `/docs/user-guide.md`, `/public/privacy.html`, `/public/terms.html`

### Phase 8: Production Deployment & Launch (Weeks 27-28)

#### 8.1 Pre-launch Checklist
- [ ] **Security audit**
  - Run OWASP ZAP scan
  - Perform penetration testing
  - Review all authentication flows
  - Check for exposed secrets
  - Validate all input sanitization

- [ ] **Performance audit**
  - Run Lighthouse audit (target >90)
  - Load test with 1000 concurrent users
  - Check database query performance
  - Verify CDN configuration
  - Test on slow 3G network

- [ ] **Accessibility audit**
  - Run axe-core automated tests
  - Manual testing with screen readers
  - Keyboard navigation testing
  - Color contrast verification
  - Test on mobile devices

- [ ] **Browser compatibility**
  - Test on Chrome/Edge (last 2 versions)
  - Test on Firefox (last 2 versions)
  - Test on Safari (last 2 versions)
  - Test on iOS Safari
  - Test on Android Chrome

- [ ] **Legal compliance**
  - Review GDPR compliance
  - Review data retention policies
  - Verify cookie consent
  - Verify terms of service
  - Verify privacy policy

#### 8.2 Deployment
- [ ] **Infrastructure setup**
  - Provision production servers
  - Setup load balancer
  - Configure database (managed PostgreSQL)
  - Setup Redis cluster
  - Configure CDN

- [ ] **DNS and SSL**
  - Configure DNS records
  - Setup SSL certificates
  - Enable HSTS
  - Setup CAA records

- [ ] **Deploy to production**
  - Deploy backend services
  - Deploy frontend application
  - Run database migrations
  - Seed university data
  - Verify all services

- [ ] **Monitoring setup**
  - Configure all monitoring tools
  - Test alerting
  - Setup on-call rotation
  - Create incident response plan

#### 8.3 Post-launch
- [ ] **Gradual rollout**
  - Launch to beta users first
  - Monitor for issues
  - Gather feedback
  - Fix critical bugs
  - Full public launch

- [ ] **Marketing assets**
  - Update social media metadata
  - Create launch announcement
  - Submit to search engines
  - Monitor analytics

## Technical Requirements

### Dependencies
**External:**
- **Cloud Provider**: AWS, DigitalOcean, or similar
- **CDN**: Cloudflare
- **Database**: PostgreSQL 14+
- **Cache**: Redis 7+
- **Storage**: AWS S3 or Cloudflare R2
- **Email Service**: SendGrid, AWS SES, or Postmark
- **OCR Service**: AWS Textract, Google Vision, or Tesseract
- **Monitoring**: Sentry, DataDog/New Relic
- **Analytics**: Google Analytics 4

**Internal:**
- **Frontend**: React 19, Vite 7, Tailwind CSS 3
- **Backend**: Node.js 20+, Express/Fastify, TypeScript 5+
- **ORM**: Prisma or TypeORM
- **Testing**: Vitest, React Testing Library, Claude Chrome Integration (E2E)
- **Build**: Docker, GitHub Actions

**Environment:**
- Node.js 20 LTS
- npm 10+
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Security Considerations
- **Authentication**: JWT with 15-minute access tokens, 7-day refresh tokens, HttpOnly cookies
- **Authorization**: Role-based access control (student, university, admin)
- **Data Protection**: Encryption at rest (database), encryption in transit (HTTPS/TLS 1.3)
- **Input Validation**: Strict validation on frontend and backend, SQL injection prevention with ORM
- **File Upload**: Type validation, size limits, virus scanning, signed URLs
- **Rate Limiting**: 100 requests/minute per IP, 1000 requests/hour per user
- **Session Management**: Redis-backed sessions, automatic timeout, CSRF protection
- **Privacy**: GDPR compliance, data minimization, right to deletion, data export capability
- **Secrets Management**: Environment variables, AWS Secrets Manager for production
- **Audit Logging**: Log all authentication events, profile changes, admin actions

### Performance Requirements
- **Response Time**:
  - API endpoints: <100ms (p95)
  - Page load: <3s (First Contentful Paint <1.5s)
  - Document upload: <500ms to initiate, <30s to process
- **Throughput**:
  - Support 1000 concurrent users
  - 10,000 daily active users
  - 1 million API requests/day
- **Memory Usage**:
  - Frontend bundle: <500KB gzipped
  - Backend per request: <50MB
- **Network**:
  - Offline support for viewing cached profiles
  - Progressive Web App (PWA) capability
  - Handle slow 3G networks gracefully
- **Scalability**:
  - Horizontal scaling for backend services
  - Database read replicas
  - CDN for global distribution

## UI/UX Specifications

### User Flow
1. **New User Registration**
   - Land on homepage → Click "Sign Up" → Choose auth method (social/email) → Verify email → Complete profile wizard → Dashboard

2. **Profile Completion**
   - Dashboard → See completion percentage → Click profile section → Fill form → Save → Auto-update completion → Unlock university matches at 50%

3. **Document Upload**
   - Dashboard → Click "Upload Documents" → Drag/drop or browse → Upload → Wait for processing → Review auto-filled data → Edit if needed → Save

4. **University Search**
   - Dashboard → "Explore Universities" tab → Filter by location/ranking → Search by program → View details → Express interest → Track in Matches tab

### Design Requirements
- **Style**: Consistent with existing Tailwind design system (primary-blue, primary-gold)
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
- **Dark Mode**: Not currently implemented - defer to Phase 2
- **Animations**: Framer Motion already implemented, ensure reduced motion support
- **Responsive**: Mobile-first design, breakpoints at 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Touch Targets**: Minimum 44x44px for all interactive elements (already implemented)
- **Loading States**: Skeleton screens, loading spinners, optimistic updates
- **Error States**: User-friendly error messages, retry buttons, fallback UI

## API Specifications

### Authentication Endpoints
```
POST /api/v1/auth/register
Content-Type: application/json

Request:
{
  "email": "student@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "emailVerified": false
    },
    "message": "Verification email sent"
  }
}
```

```
POST /api/v1/auth/login
Content-Type: application/json

Request:
{
  "email": "meera@educha.co.uk",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "user": {
      "id": "uuid",
      "email": "meera@educha.co.uk",
      "name": "Meera",
      "profileCompletion": 35
    }
  }
}
```

### Profile Endpoints
```
GET /api/v1/profile
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Meera Patel",
    "email": "meera@educha.co.uk",
    "dateOfBirth": "2000-05-15",
    "nationality": "Indian",
    "phone": "+91 98765 43210",
    "country": "India",
    "profileCompletion": 35,
    "sections": {
      "personal": { "completed": true, "data": {...} },
      "education": { "completed": true, "data": {...} },
      "interests": { "completed": false }
    }
  }
}
```

### University Endpoints
```
GET /api/v1/universities?degree=bachelor&location=London&page=1&limit=10
Authorization: Bearer {accessToken}

Response: 200 OK
{
  "success": true,
  "data": {
    "universities": [
      {
        "id": "uuid",
        "name": "Imperial College London",
        "location": "London, England",
        "ranking": 3,
        "logo": "url",
        "programs": [
          {
            "id": "uuid",
            "name": "Biomedical Engineering",
            "duration": "3 years",
            "fee": "£40,940",
            "degreeLevel": "bachelor"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 18,
      "pages": 2
    }
  }
}
```

### Document Upload Endpoint
```
POST /api/v1/documents/upload
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

Request:
{
  "file": <binary>,
  "documentType": "transcript"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "uuid",
    "filename": "transcript.pdf",
    "type": "transcript",
    "size": 1024000,
    "url": "https://cdn.educha.com/documents/uuid.pdf",
    "status": "processing",
    "uploadedAt": "2024-12-24T10:00:00Z"
  }
}
```

## Error Handling

### Error Scenarios

1. **Network Failure**
   - **Handling**: Retry with exponential backoff (3 attempts), show offline banner, cache failed requests, sync when online
   - **User Feedback**: "Connection lost. Retrying..." → "You're offline. Changes will sync when you reconnect."
   - **Implementation**: Service worker, IndexedDB for offline queue

2. **Invalid Data / Validation Errors**
   - **Handling**: Frontend validation before submission, backend validation returns 400 with field-specific errors
   - **User Feedback**: Inline error messages next to fields, highlight invalid fields in red, provide correction suggestions
   - **Implementation**: Zod schemas, express-validator

3. **Authentication Errors**
   - **Handling**: 401 Unauthorized → clear tokens → redirect to login, preserve intended destination
   - **User Feedback**: "Your session has expired. Please sign in again."
   - **Implementation**: Axios interceptor, automatic token refresh before expiry

4. **Authorization Errors (403 Forbidden)**
   - **Handling**: Log attempt, show permission denied message, redirect to safe page
   - **User Feedback**: "You don't have permission to access this resource."
   - **Implementation**: Backend middleware, frontend route guards

5. **Not Found (404)**
   - **Handling**: Show 404 page with helpful links, log potential broken links
   - **User Feedback**: "This page doesn't exist. Let's get you back on track."
   - **Implementation**: React Router catch-all route

6. **Server Errors (500)**
   - **Handling**: Log error with context (Sentry), show generic error message, offer retry
   - **User Feedback**: "Something went wrong on our end. We've been notified and are working on it."
   - **Implementation**: Global error boundary, API error interceptor

7. **File Upload Errors**
   - **Handling**: Validate before upload, handle upload failures gracefully, support resume/retry
   - **User Feedback**: "Upload failed: File too large (max 10MB)" or "Upload failed. Retry?"
   - **Implementation**: Client-side validation, chunked uploads

8. **Rate Limiting (429)**
   - **Handling**: Show countdown timer, queue requests, retry after specified delay
   - **User Feedback**: "Too many requests. Please wait 60 seconds."
   - **Implementation**: Backend rate limiter, frontend queue

9. **Database Connection Errors**
   - **Handling**: Connection pooling, automatic reconnection, circuit breaker pattern
   - **User Feedback**: "Service temporarily unavailable. Please try again in a moment."
   - **Implementation**: Prisma connection pooling, retry logic

10. **Third-party Service Failures (OCR, Email, etc.)**
    - **Handling**: Graceful degradation, fallback to manual entry, queue for later processing
    - **User Feedback**: "Automatic processing unavailable. You can enter information manually."
    - **Implementation**: Worker queues, fallback mechanisms

### Global Error Boundary
```typescript
// /src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to Sentry
    Sentry.captureException(error, { extra: errorInfo });

    // Show fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
```

## Testing Strategy

### Unit Tests
- [ ] **Component tests** (Target: 80% coverage)
  - All 7 form components (PersonalInfoForm, EducationForm, etc.)
  - All UI components (Button, Card, UniversityLogo)
  - All sections (MainHero, Benefits, HowItWorks, etc.)
  - Modal components (ProfileModal, DocumentUpload modal)

- [ ] **Service layer tests** (Target: 90% coverage)
  - Auth service (registration, login, token refresh, password reset)
  - Profile service (CRUD operations)
  - Upload service (file validation, S3 integration)
  - University service (search, filtering)

- [ ] **Hook tests**
  - useAuth hook with various scenarios
  - Custom hooks if created

- [ ] **Utility function tests** (Target: 100% coverage)
  - Validation schemas
  - Date formatting
  - Text sanitization

**Tools**: Vitest, React Testing Library, MSW for API mocking

### Integration Tests
- [ ] **API integration** (All endpoints)
  - POST /api/v1/auth/register → verify email sent → verify user in database
  - POST /api/v1/auth/login → verify JWT returned → verify session created
  - PUT /api/v1/profile → verify database updated → verify response
  - POST /api/v1/documents/upload → verify S3 upload → verify database record

- [ ] **State management**
  - AuthContext with real API
  - Form state persistence
  - Cache invalidation

- [ ] **End-to-end flows**
  - Complete user registration flow
  - Complete profile completion flow
  - Complete document upload flow

**Tools**: Supertest for API, Test database setup, Testcontainers

### E2E Tests (Claude Chrome Integration)

**Why Claude Chrome Integration instead of Playwright/Cypress:**
- **AI-driven testing**: Tests are executed via natural language prompts, making them more maintainable
- **Visual verification**: Claude can visually verify UI states, not just DOM assertions
- **Real browser automation**: Uses actual Chrome browser via MCP tools
- **GIF recording**: Automatic recording of test runs for documentation and debugging
- **No brittle selectors**: Claude identifies elements semantically rather than by CSS selectors
- **Integrated with development**: Same tooling used for development and testing

**Test execution approach:**
1. E2E scenarios documented in `/e2e/scenarios/*.md`
2. Tests executed interactively via Claude Code CLI
3. Screenshots captured at key verification points
4. GIF recordings generated for critical flows
5. Results documented with visual evidence

- [ ] **Critical user flows**
  - User can register with email → verify email → login → see dashboard
  - User can complete all profile sections → see 100% completion
  - User can upload document → see processing → see auto-filled profile
  - User can search universities → filter by criteria → view details
  - User can express interest → see in matches tab

- [ ] **Cross-browser testing**
  - Test on Chrome, Firefox, Safari, Edge
  - Test on mobile (iOS Safari, Android Chrome)

- [ ] **Accessibility testing**
  - Keyboard navigation for all features
  - Screen reader announces all critical information
  - Focus management in modals and dynamic content

- [ ] **Performance testing**
  - Page load time <3s on 4G
  - Smooth animations at 60fps
  - No memory leaks

**Tools**: Claude Chrome Integration (MCP browser automation), axe-core for accessibility
  - Claude Chrome Integration enables AI-driven E2E testing with visual verification
  - Tests are executed interactively via Claude Code with real browser control
  - Supports screenshot capture, DOM inspection, and GIF recording of test runs

### Testing Coverage Goals
- **Frontend**: 80% statement coverage, 75% branch coverage
- **Backend**: 90% statement coverage, 85% branch coverage
- **E2E**: 100% coverage of critical user paths
- **Accessibility**: 0 automated violations, manual review of all features

## Files Modified/Created

### Created Files

**Backend Structure:**
- `/backend/src/server.ts` - Main server entry point
- `/backend/src/config/database.config.ts` - Database configuration
- `/backend/src/config/environment.ts` - Environment variables
- `/backend/src/middleware/auth.middleware.ts` - JWT authentication
- `/backend/src/middleware/validate.middleware.ts` - Request validation
- `/backend/src/middleware/security.middleware.ts` - Security headers, CSP
- `/backend/src/routes/auth.routes.ts` - Authentication endpoints
- `/backend/src/routes/profile.routes.ts` - Profile endpoints
- `/backend/src/routes/universities.routes.ts` - University endpoints
- `/backend/src/routes/documents.routes.ts` - Document upload endpoints
- `/backend/src/controllers/auth.controller.ts` - Auth business logic
- `/backend/src/controllers/profile.controller.ts` - Profile business logic
- `/backend/src/services/auth.service.ts` - Auth service layer
- `/backend/src/services/password.service.ts` - Password hashing, reset
- `/backend/src/services/session.service.ts` - Session management
- `/backend/src/services/upload.service.ts` - File upload handling
- `/backend/src/services/cache.service.ts` - Redis caching
- `/backend/src/workers/document-processor.worker.ts` - OCR processing
- `/backend/prisma/schema.prisma` - Database schema
- `/backend/Dockerfile` - Backend Docker image
- `/backend/.env.example` - Environment variables template
- `/backend/package.json` - Backend dependencies

**Frontend Structure:**
- `/src/services/api.client.ts` - Axios instance with interceptors
- `/src/services/auth.service.ts` - Auth API calls
- `/src/services/profile.service.ts` - Profile API calls
- `/src/services/upload.service.ts` - Upload API calls
- `/src/types/user.ts` - User type definitions
- `/src/types/profile.ts` - Profile type definitions
- `/src/types/university.ts` - University type definitions
- `/src/utils/validation.ts` - Form validation schemas
- `/src/utils/sentry.ts` - Error tracking setup
- `/src/utils/analytics.ts` - Analytics tracking
- `/src/components/ErrorBoundary.tsx` - Global error boundary
- `/src/components/SEO.tsx` - Dynamic meta tags
- `/src/hooks/useApi.ts` - API request hook
- `/tsconfig.json` - TypeScript configuration

**Infrastructure:**
- `/Dockerfile` - Frontend Docker image
- `/docker-compose.yml` - Local development setup
- `/.github/workflows/test.yml` - CI test pipeline
- `/.github/workflows/deploy.yml` - CD deployment pipeline
- `/.github/workflows/quality.yml` - Code quality checks
- `/k8s/deployment.yml` - Kubernetes deployment (if using K8s)
- `/backend/nginx.conf` - Production nginx configuration

**Testing:**
- `/vitest.config.ts` - Vitest configuration
- `/e2e/scenarios/auth.md` - Authentication E2E test scenarios (for Claude Chrome Integration)
- `/e2e/scenarios/profile.md` - Profile E2E test scenarios
- `/e2e/scenarios/universities.md` - University search E2E test scenarios
- `/e2e/scenarios/accessibility.md` - Accessibility test scenarios
- `/src/components/**/*.test.tsx` - Component unit tests
- `/backend/src/**/*.test.ts` - Backend unit tests

**Documentation:**
- `/docs/architecture.md` - System architecture
- `/docs/api-documentation.md` - API reference
- `/docs/deployment.md` - Deployment guide
- `/docs/environment-variables.md` - Environment setup
- `/docs/runbooks/incident-response.md` - Incident handling
- `/public/privacy.html` - Privacy policy
- `/public/terms.html` - Terms of service

**SEO & PWA:**
- `/public/sitemap.xml` - Site map
- `/public/robots.txt` - Crawler instructions
- `/public/manifest.json` - PWA manifest
- `/public/service-worker.js` - Service worker for offline support

### Modified Files

**Configuration:**
- `/package.json` - Add testing, TypeScript, new dependencies
- `/vite.config.js` - Add build optimizations, code splitting, PWA plugin
- `/tailwind.config.js` - Enhance color contrast, add dark mode (future)
- `/eslint.config.js` - Add TypeScript, accessibility rules
- `/index.html` - Update meta tags, add structured data, optimize fonts
- `/.gitignore` - Add .env files, build artifacts, coverage reports

**Authentication:**
- `/src/context/AuthContext.jsx` → `/src/context/AuthContext.tsx` - Replace hardcoded auth with API calls
- `/src/pages/LoginPage.jsx` → `/src/pages/LoginPage.tsx` - Connect to real auth API
- `/src/App.jsx` → `/src/App.tsx` - Add error boundary, lazy loading

**Data & State:**
- `/src/pages/DashboardPage.jsx` → `/src/pages/DashboardPage.tsx` - Fetch real data from API
- `/src/data/mockData.js` - Migrate to database, remove from frontend

**Components (all .jsx → .tsx):**
- `/src/components/sections/DocumentUpload.jsx` - Connect to upload API, add progress
- `/src/components/modals/ProfileModal.jsx` - Add API integration, validation
- `/src/components/forms/PersonalInfoForm.jsx` - Add Zod validation, sanitization
- `/src/components/forms/EducationForm.jsx` - Add validation
- `/src/components/forms/InterestsForm.jsx` - Add validation
- `/src/components/forms/AchievementsForm.jsx` - Add validation
- `/src/components/forms/ExperienceForm.jsx` - Add validation
- `/src/components/forms/LanguagesForm.jsx` - Add validation
- `/src/components/forms/StatementForm.jsx` - Add validation, character limits
- `/src/components/layout/Header.jsx` - Add proper navigation, accessibility
- `/src/components/layout/Footer.jsx` - Add links, accessibility
- All section components - Add semantic HTML, ARIA attributes

**Deployment:**
- `/deploy-digitalocean.sh` - Update with Docker deployment, health checks

## Risk Mitigation

### Potential Issues

1. **Risk: Authentication migration breaks existing sessions**
   - **Impact**: All current users (if any) logged out
   - **Likelihood**: High
   - **Mitigation**:
     - Implement dual auth system temporarily (support both old and new)
     - Clear communication about re-login requirement
     - Provide smooth migration path for localStorage data
     - Schedule during low-traffic period

2. **Risk: Database migration causes data loss**
   - **Impact**: Critical - loss of user data
   - **Likelihood**: Medium
   - **Mitigation**:
     - Multiple backups before migration
     - Test migration on staging with production data copy
     - Dry-run migrations multiple times
     - Keep old data for 30 days as backup
     - Implement migration rollback scripts

3. **Risk: Performance degradation after adding backend**
   - **Impact**: Slower page loads, poor UX
   - **Likelihood**: Medium
   - **Mitigation**:
     - Implement caching aggressively (Redis)
     - Load test before deployment
     - Monitor performance metrics closely
     - Have scaling plan ready (horizontal scaling)
     - Implement CDN for static assets

4. **Risk: Third-party service failures (OCR, email)**
   - **Impact**: Features unavailable, poor UX
   - **Likelihood**: Medium
   - **Mitigation**:
     - Implement fallback mechanisms (manual entry)
     - Queue system for retry logic
     - Multiple service providers (failover)
     - Clear user communication about delays
     - Graceful degradation of features

5. **Risk: Security vulnerabilities discovered in production**
   - **Impact**: Critical - data breach, reputation damage
   - **Likelihood**: Medium
   - **Mitigation**:
     - Pre-launch security audit by third party
     - Bug bounty program
     - Regular dependency updates
     - Automated vulnerability scanning in CI
     - Incident response plan ready

6. **Risk: Scope creep delays production launch**
   - **Impact**: Extended timeline, increased costs
   - **Likelihood**: High
   - **Mitigation**:
     - Strict prioritization of critical features
     - MVP-first approach
     - Document "Phase 2" features separately
     - Regular progress reviews
     - Clear stakeholder communication

7. **Risk: Insufficient testing leads to bugs in production**
   - **Impact**: Poor UX, user churn, support burden
   - **Likelihood**: Medium
   - **Mitigation**:
     - Mandatory 80% code coverage
     - Automated E2E tests in CI
     - Staging environment with production data
     - Beta testing with real users
     - Monitoring and quick rollback capability

8. **Risk: Cost overruns from cloud infrastructure**
   - **Impact**: Budget exceeded
   - **Likelihood**: Medium
   - **Mitigation**:
     - Set up billing alerts
     - Start with minimal infrastructure, scale as needed
     - Use managed services to reduce operational cost
     - Monitor resource usage closely
     - Optimize before scaling

### Rollback Plan

**If deployment fails or critical issues discovered:**

1. **Immediate Actions** (0-5 minutes):
   - Trigger rollback via CI/CD (revert to previous Docker image)
   - Switch DNS to previous environment if needed
   - Notify team and stakeholders

2. **Database Rollback** (5-15 minutes):
   - If schema changes: Run rollback migration scripts
   - If data changes: Restore from automated backup
   - Verify data integrity

3. **Communication** (5-30 minutes):
   - Update status page
   - Send notification to users if impacted
   - Internal postmortem planning

4. **Recovery** (30 minutes - 2 hours):
   - Identify root cause
   - Fix in development environment
   - Test fix thoroughly
   - Re-deploy with fix

5. **Prevention** (Post-incident):
   - Document incident
   - Update runbooks
   - Improve monitoring/alerting
   - Add regression tests

## Release Notes

### User-Facing Changes

**Security & Authentication:**
- Replaced demo login with secure authentication system
- Added social login (Google, Apple, Microsoft, LinkedIn)
- Implemented email verification for new accounts
- Added password reset functionality
- Enhanced account security with 2-factor authentication option

**Profile Management:**
- Profile data now persists securely in cloud database
- Improved document upload with progress tracking
- Automatic information extraction from uploaded documents (OCR)
- Enhanced profile completion tracking with visual progress bar
- Added ability to export your data (GDPR compliance)

**University Exploration:**
- Real-time university data with latest program information
- Improved search with more filtering options
- Faster page loads with optimized performance
- Ability to save favorite universities
- Enhanced matching algorithm based on your profile

**User Experience:**
- Significantly improved page load times (3x faster)
- Better mobile experience with touch-optimized controls
- Offline support - view your profile without internet
- Improved accessibility for screen readers and keyboard navigation
- Better error messages and helpful guidance

**Privacy & Trust:**
- Added comprehensive privacy policy
- Implemented GDPR-compliant data handling
- All data transmitted securely over HTTPS
- Enhanced transparency in data usage
- Added ability to delete your account and all data

### Developer Notes

**Breaking Changes:**
- Removed `/src/data/mockData.js` - all data now from API
- Changed authentication from localStorage to JWT tokens in HttpOnly cookies
- Removed `window.showLogin()` global - use React Router navigation
- Changed API base URL to `/api/v1/` (all API calls need updating)

**New APIs:**
- RESTful API at `/api/v1/` with authentication, profiles, universities, documents
- WebSocket support for real-time notifications (future)
- Comprehensive error codes and standardized responses

**Technical Improvements:**
- Migrated to TypeScript for type safety
- Added comprehensive test suite (80%+ coverage)
- Implemented code splitting for better performance
- Added error tracking with Sentry
- Containerized with Docker for consistent deployments
- CI/CD pipeline with automated testing and deployment

**Infrastructure:**
- PostgreSQL database for persistent storage
- Redis for caching and sessions
- S3/R2 for document storage
- CDN for static asset delivery
- Kubernetes for orchestration (optional)

**Migration Guide:**
- See `/docs/migration-guide.md` for detailed upgrade instructions
- Database migration scripts in `/backend/prisma/migrations/`
- Environment variables documented in `/docs/environment-variables.md`

## References

### Documentation
- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance](https://web.dev/performance/)

### Related PRPs
- PRP-002: AI-Powered University Matching (Future)
- PRP-003: University Portal Integration (Future)
- PRP-004: Mobile App Development (Future)
- PRP-005: Video Interview Feature (Future)
- PRP-006: Scholarship Database Integration (Future)

### Security Resources
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [GDPR Compliance Guide](https://gdpr.eu/)

### Performance Resources
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

## Next Steps

### Immediate Actions (Week 1)
1. **Stakeholder Review & Approval**
   - Review this PRP with product team
   - Get budget approval for infrastructure
   - Assign development team members
   - Set up project tracking (Jira, Linear, etc.)

2. **Environment Setup**
   - Set up development, staging, production AWS/DigitalOcean accounts
   - Create Git branches (develop, staging, main)
   - Set up project management tools
   - Schedule sprint planning

3. **Backend Foundation**
   - Initialize backend repository structure
   - Set up PostgreSQL database (local + staging)
   - Create initial database schema
   - Set up basic Express server

### Short-term Goals (Weeks 2-8)
1. Complete Phase 1 (Security & Backend Foundation)
2. Complete Phase 2 (Data Persistence & API Integration)
3. Migrate at least 50% of components to TypeScript
4. Achieve 60% test coverage
5. Deploy to staging environment

### Medium-term Goals (Weeks 9-20)
1. Complete Phase 3 (Testing Infrastructure)
2. Complete Phase 4 (Performance Optimization)
3. Complete Phase 5 (DevOps & Infrastructure)
4. Achieve 80% test coverage
5. Complete security audit

### Long-term Goals (Weeks 21-28)
1. Complete Phase 6 (Accessibility & SEO)
2. Complete Phase 7 (Code Quality & Documentation)
3. Complete Phase 8 (Production Deployment)
4. Launch to beta users
5. Full public launch

### Future Enhancements (Post-Launch)
- **AI-Powered Matching**: Machine learning algorithm to improve university recommendations based on acceptance rates and user profiles
- **University Portal**: Allow universities to log in and view interested students, manage their programs
- **Video Interviews**: Integrated video interview scheduling and recording for university admissions
- **Mobile Apps**: Native iOS and Android applications
- **Multi-language Support**: Internationalization for non-English speakers
- **Scholarship Integration**: Database of scholarships with automatic matching
- **Application Tracking**: Full application lifecycle management
- **Student Community**: Forums and chat for prospective students
- **Virtual Campus Tours**: 360° video tours of universities
- **Visa Assistance**: Integration with visa application services
- **Financial Aid Calculator**: Estimate costs and aid eligibility

---

## Approval Status
**Current Status**: Pending Review
**Approved By**: _Awaiting approval_
**Approval Date**: _Pending_

**Reviewers:**
- [ ] Product Lead
- [ ] Technical Lead
- [ ] Security Lead
- [ ] DevOps Lead

**Sign-off Required For:**
- [ ] Budget allocation for cloud infrastructure
- [ ] Timeline and resource allocation
- [ ] Third-party service contracts (Sentry, monitoring, etc.)
- [ ] Go-live approval

---

**Document Version**: 1.0
**Last Updated**: 2024-12-24
**Next Review**: Upon stakeholder feedback
