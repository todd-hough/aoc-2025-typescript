import { part1, part2, solveBank, solveBankPart2 } from './day03';

describe('Day 03', () => {
  describe('solveBank (Suffix Max Logic)', () => {
    it('finds 98 in descending sequence', () => {
      expect(solveBank('987654321111111')).toBe(98);
    });

    it('finds 89 with max at end', () => {
      expect(solveBank('811111111111119')).toBe(89);
    });

    it('finds 78 in mixed sequence', () => {
      expect(solveBank('234234234234278')).toBe(78);
    });

    it('finds 92 in scattered sequence', () => {
      expect(solveBank('818181911112111')).toBe(92);
    });

    it('handles simple case', () => {
      expect(solveBank('12345')).toBe(45); // 4 then 5
    });

    it('handles unsorted case', () => {
      // Tens: 1, max suffix 5 -> 15
      // Tens: 5, max suffix 2 -> 52
      // Tens: 2, max suffix 4 -> 24
      // Tens: 4, max suffix 3 -> 43
      // Tens: 3, max suffix -1
      expect(solveBank('15243')).toBe(54);
    });
  });

  describe('Part 1 Example', () => {
    const exampleInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();

    it('matches the example total', () => {
      expect(part1(exampleInput)).toBe(357);
    });
  });

  describe('solveBankPart2 (Greedy Stack Logic)', () => {
    it('finds 987654321111 for first example', () => {
      expect(solveBankPart2('987654321111111')).toBe(987654321111);
    });

    it('finds 811111111119 for second example', () => {
      expect(solveBankPart2('811111111111119')).toBe(811111111119);
    });

    it('finds 434234234278 for third example', () => {
      expect(solveBankPart2('234234234234278')).toBe(434234234278);
    });

    it('finds 888911112111 for fourth example', () => {
      expect(solveBankPart2('818181911112111')).toBe(888911112111);
    });
  });

  describe('Part 2 Example', () => {
    const exampleInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();

    it('matches the example total', () => {
      expect(part2(exampleInput)).toBe(3121910778619);
    });
  });
});
