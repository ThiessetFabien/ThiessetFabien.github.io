import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @file utils.tsx
 * @description This file exports utility functions for the application.
 */

/**
 * Combines class names using clsx and merges Tailwind CSS classes using twMerge.
 * @param {...ClassValue[]} inputs - The class names to combine and merge.
 * @returns {string} The combined and merged class names.
 * @example
 * const className = cn('p-4', 'text-center', 'bg-blue-500');
 * className will be a string with the combined and merged class names.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
