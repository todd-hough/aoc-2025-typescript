import { readInput } from './utils/input';

interface DaySolution {
  part1: (input: string) => number | string;
  part2: (input: string) => number | string;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: npm run solve -- <day> [part]');
    console.error('  day:  1-12');
    console.error('  part: 1 or 2 (optional, runs both if not specified)');
    process.exit(1);
  }

  const day = parseInt(args[0], 10);
  const part = args[1] ? parseInt(args[1], 10) : null;

  // Validate day
  if (isNaN(day) || day < 1 || day > 12) {
    console.error('Error: Day must be a number between 1 and 12');
    process.exit(1);
  }

  // Validate part if provided
  if (part !== null && (isNaN(part) || (part !== 1 && part !== 2))) {
    console.error('Error: Part must be 1 or 2');
    process.exit(1);
  }

  // Format day with leading zero
  const paddedDay = day.toString().padStart(2, '0');

  try {
    // Dynamically import the day's solution
    const solution: DaySolution = await import(`./days/day${paddedDay}`);

    // Read input
    const input = readInput(day);

    console.log(`\n=== Day ${day} ===\n`);

    // Run requested part(s)
    if (part === null || part === 1) {
      console.log('Part 1:');
      const start1 = performance.now();
      const result1 = solution.part1(input);
      const end1 = performance.now();
      console.log(`Result: ${result1}`);
      console.log(`Time: ${(end1 - start1).toFixed(3)}ms\n`);
    }

    if (part === null || part === 2) {
      console.log('Part 2:');
      const start2 = performance.now();
      const result2 = solution.part2(input);
      const end2 = performance.now();
      console.log(`Result: ${result2}`);
      console.log(`Time: ${(end2 - start2).toFixed(3)}ms\n`);
    }
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'MODULE_NOT_FOUND') {
      console.error(`Error: Solution for day ${day} not found`);
      console.error(`Expected file: src/days/day${paddedDay}.ts`);
    } else {
      console.error('Error running solution:', error);
    }
    process.exit(1);
  }
}

main();
