# Create PRP

When creating a new PRP (Product Requirements Prompt), you MUST:

1. **Always use the template** from `PRPs/templates/PRP-TEMPLATE.md`
2. **Number PRPs sequentially** - check existing PRPs in `PRPs/` folder and use the next number
3. **Name format**: `PRP-XXX-DESCRIPTIVE-NAME.md` (e.g., `PRP-001-PRODUCTION-READINESS.md`)
4. **Fill out ALL sections** - do not leave placeholder text
5. **Be specific** - include actual file paths, concrete metrics, real implementation details

## Command Usage

```
/create-prp [feature-name]
```

## Process

1. Read the template from `PRPs/templates/PRP-TEMPLATE.md`
2. Analyze the codebase to understand current state
3. Create a new PRP with the next available number
4. Fill in all sections with specific, actionable content
5. Save to `PRPs/PRP-XXX-FEATURE-NAME.md`

## Quality Checklist

Before saving the PRP, ensure:
- [ ] Executive summary clearly explains the WHY
- [ ] All technical details are specific to this codebase
- [ ] Implementation phases have concrete tasks
- [ ] Success metrics are measurable
- [ ] File paths reference actual project structure
- [ ] Testing strategy covers unit, integration, and E2E
