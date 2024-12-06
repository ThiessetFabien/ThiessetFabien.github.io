/**
 * @file getRandomElement.ts
 * @description This file exports a function that returns a random element from an array.
 */

/**
 * Returns a random element from an array.
 * @param {Array} array - The array to get a random element from.
 * @returns {any} A random element from the array.
 * @example
 * const randomElement = getRandomElement([1, 2, 3, 4, 5]);
 */
export const getRandomElement = <T,>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
