# Convex Seed Script

This directory contains the seed script to migrate mock data from `/src/data/mockData.js` to Convex.

## Prerequisites

1. Make sure you have initialized Convex in your project:
   ```bash
   npx convex dev
   ```

2. This will create a `convex.json` file and connect your project to a Convex deployment.

## Running the Seed Script

To seed the database with universities and programs:

```bash
npx convex run seed:seedUniversities
```

This command will:
- Clear existing universities and programs data
- Insert 18 universities with their details
- Insert all associated programs (bachelor, master, and PhD) for each university
- Print confirmation with counts of created records

## Available Seed Functions

### `seedUniversities`
Main seeding function that populates all universities and programs.

```bash
npx convex run seed:seedUniversities
```

### `clearAllData`
Clears all universities and programs from the database.

```bash
npx convex run seed:clearAllData
```

### `seedSingleUniversity`
Seeds a single university by index (0-17).

```bash
npx convex run seed:seedSingleUniversity '{"universityIndex": 0}'
```

## Data Structure

### Universities
- name: University name
- location: City and country
- ranking: Numeric ranking
- logo: Emoji icon
- description: Auto-generated description

### Programs
- universityId: Reference to university
- name: Program name
- level: "bachelor", "master", or "phd"
- duration: Program duration string
- fee: Annual fee string

## Schema

The schema is defined in `schema.ts` with the following tables:
- `universities`: University information
- `programs`: Academic programs linked to universities

Programs are linked to universities via the `universityId` field and indexed for efficient queries.
