# Advent of Code 2025 - TypeScript

Solutions for Advent of Code 2025 using TypeScript with strong type checking.

## Setup

Install dependencies:

```bash
npm install
```

## Project Structure

```
aoc-2025-typescript/
├── src/
│   ├── days/              # Solution files and tests
│   │   ├── day01.ts       # Solution implementation
│   │   └── day01.test.ts  # Tests for day01
│   ├── inputs/            # Input files (day01.txt - day12.txt)
│   ├── utils/             # Helper utilities
│   │   └── input.ts       # Input reading functions
│   └── runner.ts          # Main runner script
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

### Running Solutions

Run both parts for a specific day:
```bash
npm run solve -- <day>
```

Run only part 1:
```bash
npm run solve -- <day> 1
```

Run only part 2:
```bash
npm run solve -- <day> 2
```

### Examples

```bash
npm run solve -- 1        # Run both parts for day 1
npm run solve -- 5 1      # Run only part 1 for day 5
npm run solve -- 12 2     # Run only part 2 for day 12
```

### Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Code Quality

Type check your code:
```bash
npm run typecheck
```

Lint your code with ESLint:
```bash
npm run lint
```

Auto-fix linting issues:
```bash
npm run lint:fix
```

Format code with Prettier:
```bash
npm run format
```

Check if code is formatted:
```bash
npm run format:check
```

Build the project:
```bash
npm run build
```

## Adding Solutions

1. Create the solution file in `src/days/` (e.g., `day01.ts`)
2. Create the test file in `src/days/` (e.g., `day01.test.ts`)
3. Paste your puzzle input into `src/inputs/` (e.g., `day01.txt`)
4. Implement the `part1()` and `part2()` functions
5. Write tests using example inputs from the problem
6. Run quality checks:
   ```bash
   npm run typecheck    # Type check
   npm run lint         # Lint code
   npm run format       # Format code
   npm test             # Run tests
   npm run solve -- <day>  # Run with actual input
   ```

### Test Example

```typescript
// src/days/day01.test.ts
import { part1, part2 } from './day01';

describe('Day 1', () => {
  const exampleInput = `example input here`;

  test('part1 should return expected result', () => {
    expect(part1(exampleInput)).toBe(expectedResult);
  });

  test('part2 should return expected result', () => {
    expect(part2(exampleInput)).toBe(expectedResult);
  });
});
```

## Utility Functions

The `src/utils/input.ts` file provides helpful functions:

- `readInput(day)` - Read raw input as string
- `readLines(day)` - Split input into lines
- `readGroups(day)` - Split input by double newlines
- `readNumbers(day)` - Parse input as array of integers

## Features

- **Strong TypeScript type checking** with strict mode enabled
- **Linting** with ESLint for code quality and best practices
- **Testing** with Jest for reliable solutions
- **Code formatting** with Prettier for consistent style
- **Performance timing** for each part
- **Flexible runner** to execute specific days/parts
- **Clean project structure** for 12 days of challenges
