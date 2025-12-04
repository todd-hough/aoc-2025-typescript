import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Reads the input file for a given day
 * @param day - The day number (1-12)
 * @returns The raw input as a string
 */
export function readInput(day: number): string {
  const paddedDay = day.toString().padStart(2, '0');
  const filePath = join(__dirname, '..', 'inputs', `day${paddedDay}.txt`);
  return readFileSync(filePath, 'utf-8');
}

/**
 * Reads input and splits by lines, removing empty lines at the end
 * @param day - The day number (1-12)
 * @returns Array of lines
 */
export function readLines(day: number): string[] {
  return readInput(day).trim().split('\n');
}

/**
 * Reads input and splits by double newlines (useful for grouped data)
 * @param day - The day number (1-12)
 * @returns Array of groups
 */
export function readGroups(day: number): string[] {
  return readInput(day).trim().split('\n\n');
}

/**
 * Reads input and parses as integers, one per line
 * @param day - The day number (1-12)
 * @returns Array of numbers
 */
export function readNumbers(day: number): number[] {
  return readLines(day).map(line => parseInt(line, 10));
}
