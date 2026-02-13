interface Machine {
  readonly target: number;
  readonly buttons: readonly number[];
}

function parseMachine(line: string): Machine {
  const bracketMatch = line.match(/\[([.#]+)\]/);
  if (!bracketMatch) throw new Error(`Invalid line: ${line}`);

  const pattern = bracketMatch[1];
  let target = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '#') {
      target |= 1 << i;
    }
  }

  const buttonMatches = line.matchAll(/\(([^)]+)\)/g);
  const buttons: number[] = [];
  for (const match of buttonMatches) {
    let bitmask = 0;
    for (const idx of match[1].split(',')) {
      bitmask |= 1 << parseInt(idx, 10);
    }
    buttons.push(bitmask);
  }

  return { target, buttons };
}

function popcount(n: number): number {
  let count = 0;
  let v = n;
  while (v) {
    v &= v - 1;
    count++;
  }
  return count;
}

function solveMinPresses(machine: Machine): number {
  const { target, buttons } = machine;
  const m = buttons.length;

  const halfA = Math.floor(m / 2);
  const halfB = m - halfA;

  // First half: enumerate all 2^halfA subsets
  const mapA = new Map<number, number>();
  const subsetsA = 1 << halfA;
  for (let mask = 0; mask < subsetsA; mask++) {
    let xor = 0;
    const pressed = popcount(mask);
    for (let i = 0; i < halfA; i++) {
      if (mask & (1 << i)) {
        xor ^= buttons[i];
      }
    }
    const existing = mapA.get(xor);
    if (existing === undefined || pressed < existing) {
      mapA.set(xor, pressed);
    }
  }

  // Second half: enumerate all 2^halfB subsets, look up complement
  let minPresses = Infinity;
  const subsetsB = 1 << halfB;
  for (let mask = 0; mask < subsetsB; mask++) {
    let xor = 0;
    const pressed = popcount(mask);
    for (let i = 0; i < halfB; i++) {
      if (mask & (1 << i)) {
        xor ^= buttons[halfA + i];
      }
    }
    const need = target ^ xor;
    const complement = mapA.get(need);
    if (complement !== undefined) {
      minPresses = Math.min(minPresses, pressed + complement);
    }
  }

  if (minPresses === Infinity) {
    throw new Error('No solution found for machine');
  }

  return minPresses;
}

export function part1(input: string): number {
  const lines = input.trim().split('\n');
  let total = 0;
  for (const line of lines) {
    const machine = parseMachine(line);
    total += solveMinPresses(machine);
  }
  return total;
}

interface MachinePart2 {
  readonly buttons: readonly number[][]; // each button is array of counter indices it affects
  readonly targets: readonly number[];
}

function parseMachinePart2(line: string): MachinePart2 {
  const buttonMatches = line.matchAll(/\(([^)]+)\)/g);
  const buttons: number[][] = [];
  for (const match of buttonMatches) {
    buttons.push(match[1].split(',').map(s => parseInt(s, 10)));
  }

  const targetMatch = line.match(/\{([^}]+)\}/);
  if (!targetMatch) throw new Error(`No targets found: ${line}`);
  const targets = targetMatch[1].split(',').map(s => parseInt(s, 10));

  return { buttons, targets };
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    [x, y] = [y, x % y];
  }
  return x;
}

type Frac = readonly [number, number]; // [numerator, denominator], always reduced, den > 0

function fracNew(n: number, d: number): Frac {
  if (d === 0) throw new Error('Division by zero');
  if (n === 0) return [0, 1];
  const sign = d < 0 ? -1 : 1;
  const g = gcd(Math.abs(n), Math.abs(d));
  return [(sign * n) / g, (sign * d) / g];
}

function fracSub(a: Frac, b: Frac): Frac {
  return fracNew(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
}

function fracMul(a: Frac, b: Frac): Frac {
  return fracNew(a[0] * b[0], a[1] * b[1]);
}

function fracDiv(a: Frac, b: Frac): Frac {
  return fracNew(a[0] * b[1], a[1] * b[0]);
}

const ZERO: Frac = [0, 1];
const ONE: Frac = [1, 1];

function solveMinPressesPart2(machine: MachinePart2): number {
  const { buttons, targets } = machine;
  const n = targets.length; // number of counters (rows)
  const m = buttons.length; // number of buttons (columns)

  // Build augmented matrix [A|b] as fractions
  // A[i][j] = 1 if button j affects counter i
  const aug: Frac[][] = [];
  for (let i = 0; i < n; i++) {
    const row: Frac[] = [];
    for (let j = 0; j < m; j++) {
      row.push(buttons[j].includes(i) ? ONE : ZERO);
    }
    row.push(fracNew(targets[i], 1)); // augmented column
    aug.push(row);
  }

  // Gaussian elimination to RREF
  const pivotCol: number[] = []; // pivotCol[row] = column index of pivot
  let col = 0;
  for (let row = 0; row < n && col < m; col++) {
    // Find pivot
    let pivotRow = -1;
    for (let i = row; i < n; i++) {
      if (aug[i][col][0] !== 0) {
        pivotRow = i;
        break;
      }
    }
    if (pivotRow === -1) continue;

    // Swap rows
    [aug[row], aug[pivotRow]] = [aug[pivotRow], aug[row]];

    // Scale pivot row
    const pivotVal = aug[row][col];
    for (let j = 0; j <= m; j++) {
      aug[row][j] = fracDiv(aug[row][j], pivotVal);
    }

    // Eliminate column in all other rows
    for (let i = 0; i < n; i++) {
      if (i === row || aug[i][col][0] === 0) continue;
      const factor = aug[i][col];
      for (let j = 0; j <= m; j++) {
        aug[i][j] = fracSub(aug[i][j], fracMul(factor, aug[row][j]));
      }
    }

    pivotCol.push(col);
    row++;
  }

  const rank = pivotCol.length;
  const pivotSet = new Set(pivotCol);
  const freeVars: number[] = [];
  for (let j = 0; j < m; j++) {
    if (!pivotSet.has(j)) freeVars.push(j);
  }

  // Check consistency: any row with all-zero coefficients but nonzero RHS
  for (let i = rank; i < n; i++) {
    if (aug[i][m][0] !== 0) {
      throw new Error('No solution: inconsistent system');
    }
  }

  // For each pivot variable (row r, pivot column pivotCol[r]):
  // x_pivotCol[r] = aug[r][m] - sum over free vars f: aug[r][f] * x_f
  // We need all x >= 0 and integer, minimize sum(x)

  // Compute bounds for each free variable from non-negativity of all variables
  // For a pivot row r: x_pivot = aug[r][m] - sum(aug[r][f] * x_f)
  // x_pivot >= 0 means: sum(aug[r][f] * x_f) <= aug[r][m]

  // We'll enumerate free variables. First compute their bounds.
  const k = freeVars.length;

  if (k === 0) {
    // Unique solution - check if it's non-negative integer
    let total = 0;
    for (let r = 0; r < rank; r++) {
      const val = aug[r][m];
      if (val[0] < 0 || val[0] % val[1] !== 0) {
        throw new Error('No non-negative integer solution');
      }
      total += val[0] / val[1];
    }
    return total;
  }

  // Precompute RREF coefficients as floating point for fast bound computation
  const rrefCoeffs: number[][] = []; // rrefCoeffs[r][fi] = coefficient of free var fi in pivot row r
  const rrefRhs: number[] = []; // rrefRhs[r] = RHS of pivot row r
  for (let r = 0; r < rank; r++) {
    const coeffs: number[] = [];
    for (let fi = 0; fi < k; fi++) {
      coeffs.push(aug[r][freeVars[fi]][0] / aug[r][freeVars[fi]][1]);
    }
    rrefCoeffs.push(coeffs);
    rrefRhs.push(aug[r][m][0] / aug[r][m][1]);
  }

  // Enumerate free variable assignments with dynamic bounds
  let bestTotal = Infinity;
  const freeAssign = new Array<number>(k).fill(0);
  // Track partial sums per pivot row: remaining[r] = rhs[r] - sum(coeff * assigned)
  const remaining = rrefRhs.slice();

  const enumerate = (idx: number, freeSum: number): void => {
    if (freeSum >= bestTotal) return;

    if (idx === k) {
      // Check all pivot values are non-negative integers (use exact arithmetic)
      let pivotSum = 0;
      for (let r = 0; r < rank; r++) {
        let val = aug[r][m];
        for (let fi = 0; fi < k; fi++) {
          if (freeAssign[fi] !== 0) {
            val = fracSub(val, fracMul(aug[r][freeVars[fi]], fracNew(freeAssign[fi], 1)));
          }
        }
        if (val[0] < 0 || val[0] % val[1] !== 0) return;
        pivotSum += val[0] / val[1];
      }
      const total = freeSum + pivotSum;
      if (total < bestTotal) bestTotal = total;
      return;
    }

    // Compute dynamic bounds for current free variable
    // For pivot row r: remaining[r] - coeff[idx]*x_idx - sum_{fi>idx}(coeff[fi]*x_fi) >= 0
    // Account for future free vars: negative coefficients can add to remaining
    const maxFreeVal = Math.max(...targets);
    let upper = maxFreeVal;
    let lower = 0;
    for (let r = 0; r < rank; r++) {
      const c = rrefCoeffs[r][idx];
      // Compute max possible contribution from future free vars (to loosen constraint)
      let futureRelief = 0;
      for (let fi = idx + 1; fi < k; fi++) {
        const fc = rrefCoeffs[r][fi];
        if (fc < -1e-9) {
          // Negative coeff means future var can increase remaining
          futureRelief += -fc * maxFreeVal;
        }
      }
      if (c > 1e-9) {
        // Upper bound: c * x_idx <= remaining[r] + futureRelief
        const maxVal = Math.floor((remaining[r] + futureRelief) / c + 1e-9);
        upper = Math.min(upper, maxVal);
      } else if (c < -1e-9) {
        // Lower bound: -|c| * x_idx <= -(remaining[r]) only when remaining is sufficiently negative
        // remaining[r] - c*x_idx + future >= 0
        // |c|*x_idx <= remaining[r] + future  → but c<0, so -c*x_idx adds
        // remaining[r] + |c|*x_idx + future >= 0
        // If remaining[r] + futureRelief < 0, we need |c|*x_idx >= -(remaining[r] + futureRelief)
        const adjustedRemaining = remaining[r] + futureRelief;
        if (adjustedRemaining < -1e-9) {
          // |c| * x_idx >= -adjustedRemaining → x_idx >= -adjustedRemaining / |c|
          const minVal = Math.ceil(-adjustedRemaining / -c - 1e-9);
          lower = Math.max(lower, minVal);
        }
      }
    }

    if (lower > upper) return; // infeasible

    for (let v = lower; v <= upper; v++) {
      freeAssign[idx] = v;
      // Update remaining for next level
      for (let r = 0; r < rank; r++) {
        remaining[r] -= rrefCoeffs[r][idx] * v;
      }
      enumerate(idx + 1, freeSum + v);
      // Restore remaining
      for (let r = 0; r < rank; r++) {
        remaining[r] += rrefCoeffs[r][idx] * v;
      }
    }
  };

  enumerate(0, 0);

  if (bestTotal === Infinity) {
    throw new Error('No feasible solution found');
  }

  return bestTotal;
}

export function part2(input: string): number {
  const lines = input.trim().split('\n');
  let total = 0;
  for (const line of lines) {
    const machine = parseMachinePart2(line);
    total += solveMinPressesPart2(machine);
  }
  return total;
}
