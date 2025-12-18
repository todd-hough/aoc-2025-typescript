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
    it('returns 0 (not implemented)', () => {
      expect(part2('test')).toBe(0);
    });
  });
});
