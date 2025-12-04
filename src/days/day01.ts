export function part1(input: string): number | string {
  let index = 50;
  let count = 0;

  const lines = input.trim().split('\n');

  for (const line of lines) {
    const direction = line[0];
    const value = parseInt(line.slice(1), 10);

    if (direction === 'L') {
      index = mod(index - value, 100);
    } else {
      index = (index + value) % 100;
    }

    if (index === 0) {
      count += 1;
    }
  }

  return count;
}

export function part2(input: string): number | string {
  let index = 50;
  let count = 0;

  const lines = input.trim().split('\n');

  for (const line of lines) {
    const direction = line[0];
    const value = parseInt(line.slice(1), 10);

    if (direction === 'L') {
      for (let i = 0; i < value; i++) {
        index = mod(index - 1, 100);
        if (index === 0) {
          count += 1;
        }
      }
    } else {
      for (let i = 0; i < value; i++) {
        index = (index + 1) % 100;
        if (index === 0) {
          count += 1;
        }
      }
    }
  }

  return count;
}

/**
 * Proper modulo operation that handles negative numbers correctly
 * (JavaScript's % operator returns negative results for negative dividends)
 */
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
