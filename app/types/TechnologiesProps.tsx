/**
 * @file TechnologiesProps.tsx
 * @description This file exports an interface that represents a technology with a name and a slug.
 */

/**
 * Technologies interface.
 * @typedef {Object} Technologies
 * @property {string} name - The name of the technology.
 * @property {string} slug - The slug of the technology, typically used for URLs or identifiers.
 * @example
 * const tech: Technologies = { name: 'React.js', slug: 'react/react-original' };
 */
export interface Technologies {
  name: string;
  slug: string;
  className?: string;
}
