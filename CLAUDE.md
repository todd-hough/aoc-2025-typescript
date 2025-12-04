# Claude Working Instructions - AOC 2025

This file contains important restrictions and design decisions for this project.

## CRITICAL RESTRICTION

**NEVER search for existing Advent of Code solutions to these problems.**

- Do NOT use WebSearch to find solutions
- Do NOT look up AOC solution repositories
- Do NOT search for hints or approaches from existing solutions
- We solve these problems using our own reasoning only
- Analysis and problem-solving should be done from first principles

## Project Overview

- **Challenge**: Advent of Code 2025 (12 days only this year)
- **Language**: TypeScript
- **Runtime**: ts-node (for strong type checking)

## Design Decisions

### TypeScript Setup
- **Runtime**: ts-node 10.9.x (chosen over tsx for strong type checking during execution)
- **TypeScript**: 5.9.x with strict mode enabled
- **Node Types**: @types/node 24.x (matching Node.js v24 LTS 'Krypton')
- **Rationale**: Prioritized type safety over execution speed for catching errors early

### Configuration
- `tsconfig.json`: Strict type checking enabled (all strict flags on)
- `noUnusedLocals` and `noUnusedParameters` enforced
- ES2022 target with CommonJS modules

### Code Style Requirements

**ALWAYS write idiomatic TypeScript:**

- Use TypeScript-specific features (types, interfaces, enums, etc.)
- Leverage type inference where appropriate
- Use const assertions and as const when needed
- Prefer readonly and immutability where possible
- Use modern ES2022+ features (optional chaining, nullish coalescing, etc.)
- Write functional and declarative code when it improves readability
- Use array methods (map, filter, reduce) over imperative loops where clearer
- Utilize destructuring for cleaner code
- Employ template literals for string concatenation
- Use async/await over raw promises when handling async code

**DO NOT write JavaScript-like code in TypeScript files.**

### Required Tooling
- **Testing**: Jest (configured)
- **Formatting**: Prettier (configured)
- **Linting**: ESLint with TypeScript support (configured) + TypeScript compiler (built-in via `tsc`)

### Project Structure

```
src/
├── days/              # Solution files (create as needed)
│   ├── day01.ts       # Solution implementation
│   └── day01.test.ts  # Tests for day01
├── inputs/            # Puzzle inputs (create as needed)
│   └── day01.txt
├── utils/
│   └── input.ts       # Helper functions for reading/parsing input
└── runner.ts          # CLI for executing solutions
```

**Important**: Each solution file (`dayXX.ts`) must have a corresponding test file (`dayXX.test.ts`).

### File Naming Convention
- Solution files: `dayXX.ts` (zero-padded, e.g., `day01.ts`, `day12.ts`)
- Test files: `dayXX.test.ts` (zero-padded, e.g., `day01.test.ts`, `day12.test.ts`)
- Input files: `dayXX.txt` (zero-padded, e.g., `day01.txt`, `day12.txt`)

### Solution Template
```typescript
export function part1(_input: string): number | string {
  // TODO: Implement solution
  return 0;
}

export function part2(_input: string): number | string {
  // TODO: Implement solution
  return 0;
}
```

**Note**: Use `_input` prefix for unused parameters to satisfy TypeScript's strict checking. Remove underscore when implementing the solution.

## Usage Patterns

### Creating New Day Solutions
When ready to work on a new day:
1. Create the source file: `touch src/days/dayXX.ts`
2. Create the input file: `touch src/inputs/dayXX.txt`
3. Copy the template structure from day01.ts
4. Paste puzzle input into the .txt file

### Running Solutions
```bash
npm run solve -- <day>        # Both parts
npm run solve -- <day> 1      # Part 1 only
npm run solve -- <day> 2      # Part 2 only
```

### Quality Assurance Commands
```bash
npm run typecheck   # Run TypeScript type checking without building
npm run build       # Compile and type check
npm run lint        # Run ESLint to check code quality
npm run lint:fix    # Run ESLint and auto-fix issues
npm run format      # Format code with Prettier
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
```

## Utility Functions

Located in `src/utils/input.ts`:
- `readInput(day)` - Raw input as string
- `readLines(day)` - Split by newlines
- `readGroups(day)` - Split by double newlines
- `readNumbers(day)` - Parse as integer array

## File Creation Strategy

**Only create files as needed** - Don't pre-generate all 12 days. This:
- Avoids build errors from unused parameters
- Keeps the codebase clean
- Follows just-in-time development

## Development Workflow

### CRITICAL: Definition of Done

**Work is NOT complete until ALL of the following are done:**

1. ✅ Solution implemented
2. ✅ Tests written and passing
3. ✅ Code formatted
4. ✅ Code linted (ESLint and type checking pass)
5. ✅ Solution runs successfully with actual input
6. ✅ Documentation updated

**NEVER declare work complete without completing all steps above.**

### Step-by-Step Process

1. **Read the problem** (user will provide it)
2. **Analyze and discuss approach**
   - Break down the problem
   - Identify edge cases
   - Discuss algorithm and data structures
3. **Create day files** if they don't exist
   - `src/days/dayXX.ts`
   - `src/inputs/dayXX.txt`
   - `src/days/dayXX.test.ts`
4. **Implement solution** in `src/days/dayXX.ts`
5. **Write tests** in `src/days/dayXX.test.ts`
   - Test with example inputs from problem statement
   - Test edge cases
   - Test both part1 and part2
6. **Run quality checks** (in order):
   ```bash
   npm run typecheck    # Must pass
   npm run lint         # Must pass
   npm run format       # Auto-format code
   npm test             # All tests must pass
   npm run solve -- X   # Verify with actual input
   ```
7. **Update documentation**
   - Add any new utility functions to README
   - Document any interesting algorithms or approaches
   - Update this file if workflow changes

### Testing Requirements

**Every solution MUST have tests.**

Test file location: `src/days/dayXX.test.ts`

Tests should include:
- Example inputs from the problem statement
- Expected outputs for examples
- Edge cases (empty input, single item, etc.)
- Both part1 and part2 functions

**DO NOT skip testing.** Tests help catch regressions and verify correctness.

## Maintenance Notes

- All dependencies use caret ranges for automatic minor/patch updates
- TypeScript strict mode is non-negotiable for this project
- Performance timing is built into the runner for optimization analysis
