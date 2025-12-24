# Testing Framework Documentation

## Overview
This project uses Vitest as the testing framework with React Testing Library for component testing.

## Installation
All testing dependencies have been installed:
- `vitest` - Fast unit test framework
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM implementation for Node.js
- `@vitest/ui` - Visual test UI
- `@vitest/coverage-v8` - Code coverage reporting

## Configuration

### vitest.config.ts
- Uses jsdom environment for DOM testing
- React plugin enabled
- Global test setup in `src/test/setup.ts`
- Coverage thresholds set to 60% (currently achieving 100%)
- Path aliases configured

### Test Setup (src/test/setup.ts)
- Imports jest-dom matchers
- Auto-cleanup after each test
- Mocked localStorage
- Mocked window.matchMedia

## Running Tests

### Run all tests in watch mode
```bash
npm test
```

### Run tests once (CI mode)
```bash
npm test -- --run
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run tests with UI
```bash
npm run test:ui
```

## Test Files

### Button Component Tests
**File:** `/Users/antonsteininger/Workspaces/educha/src/components/ui/Button.test.jsx`
- Tests all variants (primary, secondary, ghost)
- Tests all sizes (small, medium, large)
- Tests custom className application
- Tests event handling
- Tests prop passing
- **15 test cases, 100% coverage**

### Card Component Tests
**File:** `/Users/antonsteininger/Workspaces/educha/src/components/ui/Card.test.jsx`
- Tests children rendering
- Tests hover effects
- Tests custom className
- Tests nested cards
- Tests complex children
- **11 test cases, 100% coverage**

### AuthContext Tests
**File:** `/Users/antonsteininger/Workspaces/educha/src/context/AuthContext.test.jsx`
- Tests login with correct credentials
- Tests login with incorrect credentials
- Tests logout functionality
- Tests localStorage persistence
- Tests context provider behavior
- Tests error handling
- **14 test cases, 100% coverage**

## Coverage Report

Current coverage: **100%** on tested files
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

Coverage reports are generated in:
- Terminal (text format)
- `coverage/index.html` (visual HTML report)
- `coverage/coverage-final.json` (JSON format)

## Writing New Tests

### Example Test Structure
```jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YourComponent from './YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<YourComponent onClick={handleClick} />);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Best Practices

1. **Test user behavior**, not implementation details
2. **Use semantic queries** (getByRole, getByLabelText) over test IDs
3. **Mock external dependencies** (localStorage, API calls, etc.)
4. **Keep tests focused** - one assertion per test when possible
5. **Use descriptive test names** that explain what is being tested
6. **Clean up after tests** - automatically handled by setup file
7. **Test edge cases** - empty states, error states, loading states

## Mocking

### Mock Functions
```jsx
const mockFn = vi.fn();
```

### Mock Modules
```jsx
vi.mock('./module', () => ({
  default: vi.fn(),
  namedExport: vi.fn(),
}));
```

### Mock localStorage (already configured)
```jsx
localStorage.getItem.mockReturnValue('value');
localStorage.setItem.mockImplementation(() => {});
```

## Troubleshooting

### Tests not running
- Ensure all dependencies are installed: `npm install`
- Check vitest.config.ts is properly configured
- Verify test files match pattern: `**/*.test.{js,jsx,ts,tsx}`

### Coverage not meeting thresholds
- Run `npm run test:coverage` to see which lines are uncovered
- Add tests for uncovered branches and functions
- Check coverage/index.html for visual report

### React 19 compatibility
- Using @testing-library/react@16.3.1+ for React 19 support
- All async operations use userEvent.setup() pattern

## Status

All tests passing: ✅
- 3 test files
- 40 test cases
- 100% coverage on tested components
