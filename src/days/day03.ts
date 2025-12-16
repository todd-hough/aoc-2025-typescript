/**
 * Calculates the maximum 2-digit number formed by choosing two digits
 * from the input string at indices i and j such that i < j.
 *
 * Uses a Suffix Maximum (Dynamic Programming) approach:
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
export function solveBank(line: string): number {
  const digits = line.split('').map(Number);
  const n = digits.length;

  if (n < 2) return 0;

  // suffixMax[i] will store the maximum digit found in digits[i+1...n-1]
  const suffixMax: number[] = new Array(n).fill(-1) as number[];

  // Base case: the last element has no suffix
  let currentMax = -1;

  // Build the suffix max array from right to left
  for (let i = n - 2; i >= 0; i--) {
    currentMax = Math.max(currentMax, digits[i + 1]);
    suffixMax[i] = currentMax;
  }

  let maxJoltage = 0;

  // Iterate through each position as the potential "tens" digit
  for (let i = 0; i < n - 1; i++) {
    const tens = digits[i];
    const ones = suffixMax[i];

    if (ones !== -1) {
      const joltage = tens * 10 + ones;
      if (joltage > maxJoltage) {
        maxJoltage = joltage;
      }
    }
  }

  return maxJoltage;
}

export function part1(input: string): number {
  // Use readLines utility if passing raw file content, or split manually
  // The runner passes the raw string content of the file.
  const lines = input.trim().split(/\r?\n/);

  return lines.reduce((sum, line) => {
    if (!line.trim()) return sum;
    return sum + solveBank(line.trim());
  }, 0);
}

export function part2(input: string): number | string {
  const lines = input.trim().split(/\r?\n/);
  return lines.reduce((sum, line) => {
    if (!line.trim()) return sum;
    return sum + solveBankPart2(line.trim());
  }, 0);
}

/**
 * Finds the lexicographically largest subsequence of length 12.
 * Uses a Greedy Monotonic Stack approach.
 * Time Complexity: O(N)
 * Space Complexity: O(K) where K=12
 */
export function solveBankPart2(line: string): number {
  const digits = line.split('').map(Number);
  const n = digits.length;
  const k = 12;

  if (n < k) return 0;

  const stack: number[] = [];
  let remainingToDrop = n - k;

  for (const digit of digits) {
    while (remainingToDrop > 0 && stack.length > 0 && stack[stack.length - 1] < digit) {
      stack.pop();
      remainingToDrop--;
    }
    stack.push(digit);
  }

  // If we didn't drop enough (e.g. descending sequence), drop from end
  // Effectively taking the first k elements of the stack
  const resultDigits = stack.slice(0, k);

  return parseInt(resultDigits.join(''), 10);
}
