# Educha Production Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the app (development mode with mock data):**
   ```bash
   npm run dev
   ```

## Full Production Setup

### 1. Convex Backend Setup

1. **Initialize Convex:**
   ```bash
   npm run convex:init
   ```
   - Follow the prompts to create a new Convex project
   - This will generate your `VITE_CONVEX_URL`

2. **Copy environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Add your Convex URL to `.env.local`:**
   ```
   VITE_CONVEX_URL=https://your-project.convex.cloud
   ```

4. **Start Convex dev server:**
   ```bash
   npm run convex:dev
   ```

### 2. Clerk Authentication Setup

1. **Create a Clerk account:** https://clerk.com

2. **Create a new application** in the Clerk Dashboard

3. **Configure sign-in methods:**
   - Enable Email/Password
   - Enable Google OAuth (optional)
   - Enable Magic Links (optional)

4. **Get your API keys** from the Clerk Dashboard:
   - Publishable Key
   - Secret Key
   - Domain (e.g., `clerk.your-app.com`)

5. **Add Clerk keys to `.env.local`:**
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_DOMAIN=clerk.your-app.com
   ```

6. **Configure Clerk with Convex:**
   - In Clerk Dashboard, go to JWT Templates
   - Create a new template named "convex"
   - Add the Convex issuer URL

### 3. Seed the Database

After Convex is running, seed the university data:

```bash
# Open the Convex dashboard
npx convex dashboard

# Run the seed function from the dashboard
# Or use the CLI:
npx convex run seed:seedUniversities
```

### 4. Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

### 5. Build for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview

# Deploy Convex to production
npm run convex:deploy
```

## Project Structure

```
educha/
├── convex/                    # Convex backend
│   ├── schema.ts             # Database schema
│   ├── users.ts              # User queries/mutations
│   ├── universities.ts       # University queries/mutations
│   ├── applications.ts       # Application queries/mutations
│   ├── documents.ts          # Document queries/mutations
│   ├── seed.ts               # Database seed script
│   └── auth.config.ts        # Clerk authentication config
├── src/
│   ├── components/           # React components
│   ├── context/              # React context (Auth)
│   ├── hooks/                # Custom hooks (useConvex)
│   ├── lib/                  # Utilities (validations)
│   ├── pages/                # Page components
│   └── providers/            # Providers (ConvexClerk)
├── PRPs/                     # Product Requirements Prompts
└── tests/                    # Test files
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:ui` | Run tests with UI |
| `npm run lint` | Run ESLint |
| `npm run convex:dev` | Start Convex dev server |
| `npm run convex:deploy` | Deploy Convex to production |
| `npm run convex:init` | Initialize new Convex project |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CONVEX_URL` | Convex deployment URL | Yes (for production) |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes (for auth) |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes (for auth) |
| `CLERK_DOMAIN` | Clerk domain | Yes (for auth) |

## Test Credentials (Development)

When running without Convex/Clerk configured, use these demo credentials:
- **Email:** meera@educha.co.uk
- **Password:** educha1113

## Support

For issues, see the [PRP-001-PRODUCTION-READINESS.md](PRPs/PRP-001-PRODUCTION-READINESS.md) document.
