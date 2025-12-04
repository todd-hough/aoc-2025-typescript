import { part1, part2 } from './day01';

describe('Day 1', () => {
  const sampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

  test('part1 should return 3 for sample input', () => {
    expect(part1(sampleInput)).toBe(3);
  });

  test('part2 should return 6 for sample input', () => {
    expect(part2(sampleInput)).toBe(6);
  });
});
