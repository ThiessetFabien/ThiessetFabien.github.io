/**
 * @file dynamicMarginBottom.tsx
 * @description This file exports a function that returns a dynamic margin-bottom class based on the index.
 */

import { cnMarginBottom } from '@/styles/boxModelStyles';

/**
 * Returns a dynamic margin-bottom class based on the index.
 * @param {number} index - The index of the item.
 * @returns {string} The margin-bottom class.
 * @example
 * const marginClass = dynamicMarginBottom(1); // 'mb-4'
 * const marginClass = dynamicMarginBottom(3); // 'mb-0'
 */
export const dynamicMarginBottom = (index: number): string => {
  return index < 2 ? cnMarginBottom : 'mb-0';
};
