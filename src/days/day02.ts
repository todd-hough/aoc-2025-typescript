function generateDoubledNumbers(max: number): number[] {
  const doubled: number[] = [];
  for (let k = 1; k <= 10; k++) {
    const minBase = k === 1 ? 1 : 10 ** (k - 1);
    const maxBase = 10 ** k - 1;
    for (let b = minBase; b <= maxBase; b++) {
      const num = b * (10 ** k + 1);
      if (num > max) break;
      doubled.push(num);
    }
  }
  return doubled.sort((a, b) => a - b);
}

function parseRanges(input: string): [number, number][] {
  return input
    .trim()
    .split(',')
    .filter((s) => s.length > 0)
    .map((r) => {
      const [lo, hi] = r.split('-').map(Number);
      return [lo, hi];
    });
}

export function part1(input: string): number | string {
  const ranges = parseRanges(input);
  const maxVal = Math.max(...ranges.map(([, hi]) => hi));
  const doubled = generateDoubledNumbers(maxVal);

  let sum = 0;
  for (const [lo, hi] of ranges) {
    for (const d of doubled) {
      if (d > hi) break;
      if (d >= lo) sum += d;
    }
  }
  return sum;
}

function generatePeriodicNumbers(max: number): number[] {
  const periodic = new Set<number>();
  const maxDigits = max.toString().length;

  for (let patternLen = 1; patternLen <= maxDigits / 2; patternLen++) {
    const minPattern = patternLen === 1 ? 1 : 10 ** (patternLen - 1);
    const maxPattern = 10 ** patternLen - 1;

    for (let p = minPattern; p <= maxPattern; p++) {
      const ps = p.toString();
      let repeated = ps + ps;
      let num = parseInt(repeated, 10);

      while (num <= max) {
        periodic.add(num);
        repeated += ps;
        num = parseInt(repeated, 10);
      }
    }
  }
  return [...periodic].sort((a, b) => a - b);
}

export function part2(input: string): number | string {
  const ranges = parseRanges(input);
  const maxVal = Math.max(...ranges.map(([, hi]) => hi));
  const periodic = generatePeriodicNumbers(maxVal);

  let sum = 0;
  for (const [lo, hi] of ranges) {
    for (const d of periodic) {
      if (d > hi) break;
      if (d >= lo) sum += d;
    }
  }
  return sum;
}
