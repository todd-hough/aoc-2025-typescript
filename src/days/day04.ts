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

function countAdjacentRollsInMutableGrid(grid: string[][], row: number, col: number): number {
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

function findAccessibleRolls(grid: string[][]): [number, number][] {
  const accessible: [number, number][] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '@') {
        const adjacentRolls = countAdjacentRollsInMutableGrid(grid, row, col);
        if (adjacentRolls < 4) {
          accessible.push([row, col]);
        }
      }
    }
  }

  return accessible;
}

export function part2(input: string): number {
  const grid = input
    .trim()
    .split('\n')
    .map(row => row.split(''));
  let totalRemoved = 0;

  let accessible = findAccessibleRolls(grid);
  while (accessible.length > 0) {
    for (const [row, col] of accessible) {
      grid[row][col] = '.';
    }
    totalRemoved += accessible.length;
    accessible = findAccessibleRolls(grid);
  }

  return totalRemoved;
}
