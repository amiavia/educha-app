# PRP-002: Launch Bundle - Complete Feature Integration

## Executive Summary
This PRP is the **master launch bundle** that transforms Educha from a frontend prototype into a fully functional production application. It consolidates all required features into 5 implementation phases:

| Phase | Feature Area | Status |
|-------|-------------|--------|
| 1 | Backend Integration & Data Persistence | Not Started |
| 2 | Document Upload & AI Processing | Not Started |
| 3 | Real-Time University Matching | Not Started |
| 4 | University Application Workflow | Not Started |
| 5 | Student Card & Profile Export | Not Started |

**The Core Problem:** While PRP-001 established Convex backend infrastructure and Clerk authentication, **the frontend never connected to the backend**. All user data is lost on page refresh. This PRP bridges that critical gap and enables all user-facing features.

**Before This PRP:**
- 7 profile forms save to React local state only (lost on refresh)
- Document upload shows 3-second fake delay (no actual storage)
- Student Card displays hardcoded "James Patel"
- University matching uses mock completion percentages
- "Express Interest" button does nothing
- No application tracking

**After This PRP:**
- All profile data persists to Convex and survives refresh
- Real document upload with Convex Storage
- Student Card shows actual user data with export capability
- Live university matching based on real profile completion
- Functional application workflow with status tracking
- PDF profile export and shareable links

## Background

### What PRP-001 Accomplished
- ✅ Convex schema defined (users, profileSections, universities, programs, applications, documents)
- ✅ Clerk authentication working (Google, Apple, Email sign-in)
- ✅ 220 unit tests passing
- ✅ ConvexClerkProvider wrapping the app
- ✅ Custom hooks defined in `src/hooks/useConvex.js`
- ✅ 18 UK universities seeded with 56+ programs
- ✅ Convex mutations ready: `updateProfileSection()`, `uploadDocument()`, `createApplication()`

### The Integration Gap
The frontend and backend exist in isolation. **Zero Convex API calls are made from the React components.** All data flows into React state and disappears on refresh.

### Codebase Stats
- **Frontend**: ~4,300 lines across 31 components
- **Forms**: 7 comprehensive profile forms with full test coverage
- **Backend**: 6 Convex tables with queries and mutations ready
- **Universities**: 18 UK institutions with 56+ programs seeded

## Objectives

### Primary Goals
1. **Phase 1**: Connect all forms to Convex - profile data persists forever
2. **Phase 2**: Real document upload with storage and optional AI parsing
3. **Phase 3**: Live university matching from real profile data
4. **Phase 4**: Complete application workflow (express interest → track → submit)
5. **Phase 5**: Dynamic Student Card with export and sharing

### Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Data Persistence | 100% | All profile data survives page refresh |
| Profile Load Time | <500ms | Time from login to populated dashboard |
| Document Upload | Working | Files stored and retrievable from Convex |
| Match Accuracy | Real-time | Percentages reflect actual completion |
| Application Flow | End-to-end | Browse → Interest → Track → Submit works |
| Profile Export | PDF + Link | Downloadable and shareable profile |

## Status
**Current Phase**: Not Started
**Priority**: Critical
**Created**: 2024-12-25
**Last Updated**: 2024-12-25
**Assignee**: Development Team
**Depends On**: PRP-001 (Complete)

## Technical Architecture

### Current State (Disconnected)
```
┌────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                          │
│                                                                │
│  ProfileModal ──▶ useState() ──▶ ❌ LOST ON REFRESH           │
│  StudentCard  ──▶ Hardcoded "James Patel"                     │
│  DocUpload    ──▶ 3-sec fake delay                            │
│  Matching     ──▶ Mock percentages                            │
│  Applications ──▶ Button does nothing                         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                         ╳ NOT CONNECTED ╳
┌────────────────────────────────────────────────────────────────┐
│                      CONVEX BACKEND                            │
│                                                                │
│  users.ts         ──▶ updateProfileSection()  [NEVER CALLED]  │
│  documents.ts     ──▶ uploadDocument()        [NEVER CALLED]  │
│  applications.ts  ──▶ createApplication()     [NEVER CALLED]  │
│  universities.ts  ──▶ getAllUniversities()    [NEVER CALLED]  │
│                                                                │
│  _storage         ──▶ File storage ready      [UNUSED]        │
└────────────────────────────────────────────────────────────────┘
```

### Target State (Fully Connected)
```
┌────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                          │
│                                                                │
│  ProfileModal ──▶ useMutation(updateProfileSection) ──▶ ✅    │
│  StudentCard  ──▶ useQuery(getUserProfile) ──▶ Real data      │
│  DocUpload    ──▶ Convex Storage API ──▶ Real files           │
│  Matching     ──▶ useQuery(getProfileSections) ──▶ Live %     │
│  Applications ──▶ useMutation(createApplication) ──▶ Tracked  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                         │ WebSocket (Real-time)
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                      CONVEX BACKEND                            │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ users         │ profileSections │ universities │ programs│ │
│  │ applications  │ documents       │ _storage              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  Real-time subscriptions │ ACID transactions │ File storage   │
└────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Backend Integration & Data Persistence
**Priority**: 🔴 CRITICAL (Blocks all other phases)
**Estimated Effort**: 2-3 days

### 1.1 User Sync on Login
**Goal**: Create/update Convex user record when Clerk authentication completes

**Files to modify:**
- `src/context/AuthContext.jsx`
- `convex/users.ts`

**Tasks:**
- [ ] Add `useEffect` to sync Clerk user to Convex on sign-in
- [ ] Call `createOrUpdateUser()` with Clerk ID, email, name
- [ ] Store Convex user ID in auth context for downstream use

**Implementation:**
```jsx
// src/context/AuthContext.jsx
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);
  const [convexUserId, setConvexUserId] = useState(null);

  // Sync Clerk user to Convex on sign-in
  useEffect(() => {
    if (isSignedIn && clerkUser) {
      createOrUpdateUser({
        clerkId: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        fullName: clerkUser.fullName,
      }).then(setConvexUserId);
    }
  }, [isSignedIn, clerkUser]);

  // ... rest of provider
};
```

### 1.2 Load Profile on Dashboard Mount
**Goal**: Fetch existing profile sections from Convex when dashboard loads

**Files to modify:**
- `src/pages/DashboardPage.jsx`

**Tasks:**
- [ ] Add `useQuery(api.users.getProfileSections)` call
- [ ] Show loading state while fetching
- [ ] Pre-populate `sections` state from Convex data
- [ ] Handle first-time users (empty profile)

**Implementation:**
```jsx
// src/pages/DashboardPage.jsx
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

function DashboardPage() {
  const { user } = useAuth();

  // Load profile sections from Convex
  const savedSections = useQuery(
    api.users.getProfileSections,
    user?.id ? { clerkId: user.id } : 'skip'
  );

  // Initialize local state from Convex data
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (savedSections) {
      setSections(savedSections.map(s => ({
        id: s.sectionId,
        completed: s.completed,
        data: s.data,
      })));
    }
  }, [savedSections]);

  // Show loading while fetching
  if (savedSections === undefined) {
    return <LoadingSpinner />;
  }

  // ... rest of component
}
```

### 1.3 Save Sections to Convex
**Goal**: Replace local state save with Convex mutation

**Files to modify:**
- `src/pages/DashboardPage.jsx`
- `src/components/modals/ProfileModal.jsx`

**Tasks:**
- [ ] Add `useMutation(api.users.updateProfileSection)` hook
- [ ] Call mutation in `handleSaveSection()` instead of `setSections()`
- [ ] Add optimistic UI update for instant feedback
- [ ] Handle save errors with user notification

**Implementation:**
```jsx
// src/pages/DashboardPage.jsx
const updateSection = useMutation(api.users.updateProfileSection);

const handleSaveSection = async (sectionId, data) => {
  try {
    await updateSection({
      clerkId: user.id,
      sectionId,
      completed: true,
      data,
    });
    // Convex will trigger re-render via useQuery subscription
  } catch (error) {
    toast.error('Failed to save. Please try again.');
  }
};
```

### 1.4 Auto-Calculate Profile Completion
**Goal**: Compute completion percentage from actual saved sections

**Files to modify:**
- `convex/users.ts`

**Tasks:**
- [ ] Create weighted completion calculation
- [ ] Update completion when sections change
- [ ] Return completion with user profile data

**Implementation:**
```typescript
// convex/users.ts
const SECTION_WEIGHTS: Record<string, number> = {
  personal: 10,
  education: 20,
  interests: 10,
  achievements: 10,
  experience: 10,
  languages: 15,
  statement: 25,
};

export const getProfileWithCompletion = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", q => q.eq("clerkId", clerkId))
      .first();

    if (!user) return null;

    const sections = await ctx.db
      .query("profileSections")
      .withIndex("by_userId", q => q.eq("userId", user._id))
      .collect();

    const completion = sections.reduce((total, section) => {
      if (section.completed) {
        return total + (SECTION_WEIGHTS[section.sectionId] || 0);
      }
      return total;
    }, 0);

    return { ...user, completion, sections };
  },
});
```

---

## Phase 2: Document Upload & Processing
**Priority**: 🟠 HIGH
**Estimated Effort**: 2-3 days

### 2.1 Real File Upload to Convex Storage
**Goal**: Replace mock delay with actual file storage

**Files to modify:**
- `src/components/sections/DocumentUpload.jsx`

**Tasks:**
- [ ] Call `generateUploadUrl()` to get presigned URL
- [ ] Upload file via fetch POST
- [ ] Save document metadata with `uploadDocument()` mutation
- [ ] Show upload progress indicator
- [ ] Handle upload errors gracefully

**Implementation:**
```jsx
// src/components/sections/DocumentUpload.jsx
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

function DocumentUpload({ userId }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const saveDocument = useMutation(api.documents.uploadDocument);
  const documents = useQuery(api.documents.getUserDocuments, { userId });

  const handleUpload = async (file) => {
    setUploading(true);
    setProgress(0);

    try {
      // Step 1: Get presigned upload URL
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload file to Convex Storage
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      const { storageId } = await response.json();

      // Step 3: Save document metadata
      await saveDocument({
        userId,
        storageId,
        fileName: file.name,
        fileType: file.type,
      });

      toast.success('Document uploaded successfully!');
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* Upload dropzone */}
      <Dropzone onDrop={handleUpload} disabled={uploading} />

      {/* Progress indicator */}
      {uploading && <ProgressBar value={progress} />}

      {/* Document list */}
      <DocumentList documents={documents} />
    </div>
  );
}
```

### 2.2 Document Display & Management
**Tasks:**
- [ ] Query documents on component mount
- [ ] Display list with file name, type, upload date
- [ ] Add download links via `getFileUrl()` query
- [ ] Enable document deletion
- [ ] Show document count in profile completion

### 2.3 Optional: AI Document Parsing
**Goal**: Extract profile data from uploaded transcripts/CVs

**Tasks:**
- [ ] Add Convex Action for AI processing
- [ ] Parse transcript for education data (school, grades)
- [ ] Parse CV for experience data
- [ ] Auto-populate profile sections from parsed data
- [ ] User confirms before applying extracted data

**Implementation Sketch:**
```typescript
// convex/actions/parseDocument.ts (Future)
export const parseTranscript = action({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    const fileUrl = await ctx.storage.getUrl(storageId);
    // Call OpenAI/Claude API to extract structured data
    // Return parsed education info
  },
});
```

---

## Phase 3: Real-Time University Matching
**Priority**: 🟠 HIGH
**Estimated Effort**: 1-2 days

### 3.1 Connect Matching to Real Profile Data
**Goal**: Match percentages reflect actual profile completion

**Files to modify:**
- `src/components/sections/UniversityMatches.jsx`

**Tasks:**
- [ ] Replace mock `sectionStatus` with Convex query
- [ ] Use real completion data in match calculation
- [ ] Real-time updates when profile changes
- [ ] Filter universities by user's actual interests

**Implementation:**
```jsx
// src/components/sections/UniversityMatches.jsx
function UniversityMatches({ clerkId }) {
  // Real profile data from Convex
  const profile = useQuery(api.users.getProfileWithCompletion, { clerkId });
  const universities = useQuery(api.universities.getAllUniversities);

  // Build section status from actual data
  const sectionStatus = useMemo(() => {
    if (!profile?.sections) return {};
    return profile.sections.reduce((acc, s) => {
      acc[s.sectionId] = s.completed;
      return acc;
    }, {});
  }, [profile?.sections]);

  // Calculate matches with real data
  const matches = useMemo(() => {
    if (!universities) return [];
    return calculateMatches(universities, sectionStatus);
  }, [universities, sectionStatus]);

  return (
    <div>
      <ProfileStrength completion={profile?.completion || 0} />
      <MatchList matches={matches} />
    </div>
  );
}
```

### 3.2 Enhanced Matching Algorithm
**Tasks:**
- [ ] Weight matches by user's stated interests
- [ ] Filter by preferred degree level
- [ ] Consider location preferences
- [ ] Show program-specific match scores

---

## Phase 4: University Application Workflow
**Priority**: 🟡 MEDIUM
**Estimated Effort**: 2-3 days

### 4.1 Express Interest Flow
**Goal**: "Express Interest" button creates trackable application

**Files to modify:**
- `src/pages/DashboardPage.jsx` (Universities tab)
- New: `src/components/sections/ApplicationTracker.jsx`

**Tasks:**
- [ ] Connect "Express Interest" button to `createApplication()` mutation
- [ ] Show confirmation modal before creating application
- [ ] Redirect to Applications tab after interest expressed
- [ ] Prevent duplicate applications to same program

**Implementation:**
```jsx
// University card in DashboardPage
const createApplication = useMutation(api.applications.createApplication);

const handleExpressInterest = async (programId, universityName) => {
  // Check for existing application
  const existing = await hasUserApplied({ userId, programId });
  if (existing) {
    toast.info('You already expressed interest in this program');
    return;
  }

  await createApplication({
    userId,
    programId,
    status: 'draft',
  });

  toast.success(`Interest expressed in ${universityName}!`);
  setActiveTab('applications'); // Switch to applications tab
};
```

### 4.2 Application Dashboard
**Goal**: Track all applications with status

**Tasks:**
- [ ] Create ApplicationTracker component
- [ ] Query user's applications with program/university details
- [ ] Display status badges (Draft, Submitted, Under Review, Accepted, Rejected)
- [ ] Enable status updates (Submit, Withdraw)
- [ ] Show application timeline

**Implementation:**
```jsx
// src/components/sections/ApplicationTracker.jsx
function ApplicationTracker({ userId }) {
  const applications = useQuery(
    api.applications.getUserApplicationsWithDetails,
    { userId }
  );
  const updateStatus = useMutation(api.applications.updateApplicationStatus);

  return (
    <div className="space-y-4">
      <h2>Your Applications ({applications?.length || 0})</h2>

      {applications?.map(app => (
        <ApplicationCard
          key={app._id}
          application={app}
          onSubmit={() => updateStatus({ id: app._id, status: 'submitted' })}
          onWithdraw={() => updateStatus({ id: app._id, status: 'withdrawn' })}
        />
      ))}

      {!applications?.length && (
        <EmptyState message="No applications yet. Explore universities to get started!" />
      )}
    </div>
  );
}
```

### 4.3 Add Applications Tab to Dashboard
**Tasks:**
- [ ] Add "Applications" as 4th tab in dashboard
- [ ] Show application count badge on tab
- [ ] Include ApplicationTracker component

---

## Phase 5: Student Card & Profile Export
**Priority**: 🟡 MEDIUM
**Estimated Effort**: 1-2 days

### 5.1 Dynamic Student Card
**Goal**: Show actual user data instead of hardcoded "James Patel"

**Files to modify:**
- `src/components/sections/StudentCard.jsx`

**Tasks:**
- [ ] Query user profile from Convex
- [ ] Display real name from Clerk/Convex
- [ ] Show actual GPA from education section
- [ ] Display interests/dream university from interests section
- [ ] Use Clerk profile image or uploaded photo
- [ ] Generate unique student ID from Convex ID

**Implementation:**
```jsx
// src/components/sections/StudentCard.jsx
function StudentCard({ clerkId }) {
  const profile = useQuery(api.users.getProfileWithCompletion, { clerkId });
  const { user: clerkUser } = useUser();

  // Extract data from sections
  const education = profile?.sections?.find(s => s.sectionId === 'education')?.data;
  const interests = profile?.sections?.find(s => s.sectionId === 'interests')?.data;
  const personal = profile?.sections?.find(s => s.sectionId === 'personal')?.data;

  // Generate unique ID
  const studentId = `EDU-${profile?._id?.slice(-6).toUpperCase() || 'XXXXXX'}`;

  return (
    <div className="student-card">
      <div className="card-header">
        <span className="student-id">{studentId}</span>
        <span className="status">Active</span>
      </div>

      <div className="card-body">
        <img src={clerkUser?.imageUrl} alt="Profile" className="profile-photo" />
        <h2>{profile?.fullName || clerkUser?.fullName || 'Complete Your Profile'}</h2>
        <p>Age: {calculateAge(personal?.dateOfBirth)}</p>
        <p>GPA: {education?.gpa || 'N/A'}</p>
        <p>Location: {personal?.country || 'Not set'}</p>
      </div>

      <div className="card-footer">
        <p>Dream University: {interests?.dreamUniversity || 'Not set'}</p>
        <p>Field: {interests?.fields?.[0] || 'Not set'}</p>
      </div>
    </div>
  );
}
```

### 5.2 PDF Profile Export
**Goal**: Download complete profile as PDF

**Tasks:**
- [ ] Add "Export PDF" button to Student Card
- [ ] Generate PDF with all profile sections
- [ ] Include Student Card visual
- [ ] Format for university submissions

**Implementation:**
```jsx
// Using react-pdf or jspdf
const exportToPDF = async () => {
  const doc = new jsPDF();

  // Add header with student card
  doc.setFontSize(20);
  doc.text(`Student Profile: ${profile.fullName}`, 20, 20);
  doc.text(`ID: ${studentId}`, 20, 30);

  // Add sections
  let y = 50;
  profile.sections.forEach(section => {
    doc.setFontSize(14);
    doc.text(section.sectionId.toUpperCase(), 20, y);
    y += 10;
    // Add section data...
  });

  doc.save(`educha-profile-${studentId}.pdf`);
};
```

### 5.3 Shareable Profile Link
**Goal**: Generate unique URL to share profile with universities

**Tasks:**
- [ ] Create public profile page route
- [ ] Generate unique share token
- [ ] Read-only profile view for visitors
- [ ] Copy link button on Student Card
- [ ] QR code generation

---

## Technical Requirements

### Dependencies
**Existing (no changes needed):**
- convex, @clerk/clerk-react, react, vite, tailwindcss

**Optional additions:**
- `jspdf` or `@react-pdf/renderer` - PDF export
- `qrcode.react` - QR code generation

### Security Considerations
- All mutations validate user ownership via clerkId
- Public profile links use secure random tokens
- File uploads restricted to allowed MIME types
- Rate limiting on mutations (Convex built-in)

### Performance Requirements
| Operation | Target | Notes |
|-----------|--------|-------|
| Profile load | <500ms | Convex caches queries |
| Form save | <200ms | Optimistic UI |
| File upload | Progress shown | Large files chunked |
| Match calc | <100ms | Memoized results |

## Testing Strategy

### Unit Tests
- [ ] Profile section CRUD operations
- [ ] Completion calculation accuracy
- [ ] Match score calculations

### Integration Tests
- [ ] Full profile save → reload cycle
- [ ] Document upload → list → download
- [ ] Application create → status update

### E2E Tests (Claude Chrome Integration)
- [ ] **Profile Flow**: Login → Fill all 7 sections → Refresh → Verify data persisted
- [ ] **Document Flow**: Upload PDF → See in list → Download → Delete
- [ ] **Application Flow**: Browse → Express Interest → View in tracker → Submit
- [ ] **Export Flow**: Complete profile → Export PDF → Verify contents

## Files Summary

### Files to Modify
| File | Phase | Changes |
|------|-------|---------|
| `src/context/AuthContext.jsx` | 1 | Add Convex user sync |
| `src/pages/DashboardPage.jsx` | 1,4 | Load profile, add Applications tab |
| `src/components/modals/ProfileModal.jsx` | 1 | Save to Convex |
| `src/components/sections/DocumentUpload.jsx` | 2 | Real file upload |
| `src/components/sections/UniversityMatches.jsx` | 3 | Use real profile data |
| `src/components/sections/StudentCard.jsx` | 5 | Dynamic user data |
| `convex/users.ts` | 1 | Add completion calculation |

### Files to Create
| File | Phase | Purpose |
|------|-------|---------|
| `src/components/sections/ApplicationTracker.jsx` | 4 | Application dashboard |
| `src/utils/pdfExport.js` | 5 | PDF generation helpers |

## Risk Mitigation

### Potential Issues
1. **localStorage migration**: Existing users lose data
   - *Mitigation*: One-time migration script on first Convex load

2. **Large file uploads**: Timeout on slow connections
   - *Mitigation*: Chunked uploads with progress indicator

3. **Race conditions**: Multiple tabs editing profile
   - *Mitigation*: Convex handles with real-time sync

### Rollback Plan
- Each phase can be feature-flagged independently
- Can disable Convex calls and fall back to localStorage
- Convex has point-in-time recovery for database

## Release Notes

### User-Facing Changes
- **Phase 1**: Profile data now persists forever
- **Phase 2**: Upload real documents (transcripts, CVs)
- **Phase 3**: Match percentages reflect your actual profile
- **Phase 4**: Track your university applications
- **Phase 5**: Export and share your Student Card

### Developer Notes
- All forms use Convex mutations (no more localStorage)
- Profile state managed server-side
- Real-time subscriptions for instant updates
- Type-safe API with generated types

## Next Steps

### Recommended Order
1. **Phase 1** first - unblocks all other phases
2. **Phase 3** second - provides immediate user value
3. **Phase 2** third - enhances profile building
4. **Phase 4** fourth - enables full user journey
5. **Phase 5** last - polish and sharing features

### Future Enhancements (Post-Launch)
- AI document parsing for auto-fill
- Email notifications for application updates
- University recommendation engine
- Application deadline reminders
- Multi-language support

---

**Approval Status**: Pending
**Approved By**:
**Approval Date**:
