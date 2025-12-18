const DIRECTIONS: readonly (readonly [number, number])[] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

function countAdjacentRolls(grid: string[], row: number, col: number): number {
  let count = 0;

  for (const [dr, dc] of DIRECTIONS) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[newRow].length) {
      if (grid[newRow][newCol] === '@') {
        count++;
      }
    }
  }

  return count;
}

export function part1(input: string): number {
  const grid = input.trim().split('\n');
  let accessibleCount = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '@') {
        const adjacentRolls = countAdjacentRolls(grid, row, col);
        if (adjacentRolls < 4) {
          accessibleCount++;
        }
      }
    }
  }

  return accessibleCount;
}

export function part2(_input: string): number {
  return 0;
}
