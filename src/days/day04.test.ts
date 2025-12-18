import { part1, part2 } from './day04';

describe('Day 04', () => {
  describe('Part 1', () => {
    it('matches the example from the problem statement', () => {
      const exampleInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
      `.trim();

      expect(part1(exampleInput)).toBe(13);
    });

    it('returns 1 for a single roll with no neighbors', () => {
      expect(part1('@')).toBe(1);
    });

    it('correctly identifies corner rolls as accessible in a full grid', () => {
      const input = `
@@@
@@@
@@@
      `.trim();

      // Corners have 3 neighbors each (accessible)
      // Edges and center have 4+ neighbors (not accessible)
      expect(part1(input)).toBe(4);
    });

    it('correctly handles rolls with exactly 3 neighbors (accessible)', () => {
      const input = `
.@.
@@@
.@.
      `.trim();

      // Center roll has 4 neighbors (not accessible)
      // Top, bottom, left, right rolls each have 2 neighbors (accessible)
      expect(part1(input)).toBe(4);
    });

    it('returns 0 for a grid with no rolls', () => {
      const input = `
...
...
...
      `.trim();

      expect(part1(input)).toBe(0);
    });
  });

  describe('Part 2', () => {
    it('matches the example from the problem statement', () => {
      const exampleInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
      `.trim();

      expect(part2(exampleInput)).toBe(43);
    });

    it('removes a single roll with no neighbors', () => {
      expect(part2('@')).toBe(1);
    });

    it('removes all rolls from a 3x3 grid iteratively', () => {
      const input = `
@@@
@@@
@@@
      `.trim();

      // All 9 rolls should eventually be removed
      // First pass: 4 corners (3 neighbors each)
      // Second pass: 4 edges (now have <4 neighbors)
      // Third pass: 1 center
      expect(part2(input)).toBe(9);
    });

    it('returns 0 for a grid with no rolls', () => {
      const input = `
...
...
...
      `.trim();

      expect(part2(input)).toBe(0);
    });
  });
});
