import { part1, part2 } from './day10';

describe('Day 10', () => {
  const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

  test('part1 returns 7 for the full example', () => {
    expect(part1(exampleInput)).toBe(7);
  });

  test('machine 1: minimum 2 presses', () => {
    const input = '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}';
    expect(part1(input)).toBe(2);
  });

  test('machine 2: minimum 3 presses', () => {
    const input = '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}';
    expect(part1(input)).toBe(3);
  });

  test('machine 3: minimum 2 presses', () => {
    const input = '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}';
    expect(part1(input)).toBe(2);
  });

  test('single button that matches target exactly', () => {
    const input = '[#.#] (0,2) {1,2,3}';
    expect(part1(input)).toBe(1);
  });

  test('target is all off (no presses needed)', () => {
    const input = '[...] (0,1) (1,2) {1,2,3}';
    expect(part1(input)).toBe(0);
  });

  describe('part2', () => {
    const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

    test('part2 returns 33 for the full example', () => {
      expect(part2(exampleInput)).toBe(33);
    });

    test('machine 1: minimum 10 presses', () => {
      const input = '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}';
      expect(part2(input)).toBe(10);
    });

    test('machine 2: minimum 12 presses', () => {
      const input = '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}';
      expect(part2(input)).toBe(12);
    });

    test('machine 3: minimum 11 presses', () => {
      const input = '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}';
      expect(part2(input)).toBe(11);
    });
  });
});
