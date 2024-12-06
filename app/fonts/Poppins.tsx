import { Poppins as PoppinsFont } from 'next/font/google';

/**
 * @file Poppins.tsx
 * @description This file imports and configures the Poppins font from Google Fonts using the next/font package.
 */

/**
 * Poppins font configuration.
 * @type {Object}
 * @property {string[]} subsets - The subsets of the font to include.
 * @property {string[]} style - The styles of the font to include.
 * @property {string[]} weight - The weights of the font to include.
 * @property {string} variable - The CSS variable name for the font.
 * @example
 * import { Poppins } from './Poppins';
 * <div className={Poppins.variable}>This text uses the Poppins font.</div>
 */

export const Poppins = PoppinsFont({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '500', '700'],
  variable: '--font-poppins-sans',
});
