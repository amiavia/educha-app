# Claude Code Project Instructions

## PRP (Product Requirements Prompt) Policy

**MANDATORY**: When creating any PRP document, you MUST:

1. Use the template at `PRPs/templates/PRP-TEMPLATE.md` as the base
2. Follow the naming convention: `PRP-XXX-DESCRIPTIVE-NAME.md`
3. Save all PRPs to the `PRPs/` directory
4. Fill out ALL sections - no placeholder text allowed
5. Include specific file paths, concrete metrics, and real implementation details

Use `/create-prp` command to create PRPs with proper enforcement.

## Project Overview

This is **Educha** - an educational application built with:
- **Frontend**: Vite + React
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Directory Structure

```
/src          - Source code
/public       - Static assets
/PRPs         - Product Requirements Prompts
/.claude      - Claude Code configuration
```
