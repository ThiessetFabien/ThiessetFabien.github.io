import localFont from 'next/font/local';

/**
 * @file OrpheusPro.tsx
 * @description This file imports and configures the OrpheusPro font from a local file using the next/font package.
 */

/**
 * OrpheusPro font configuration.
 * @type {Object}
 * @property {string} src - The source path of the local font file.
 * @property {string} variable - The CSS variable name for the font.
 * @example
 * import { OrpheusPro } from './OrpheusPro';
 * <div className={OrpheusPro.variable}>This text uses the OrpheusPro font.</div>
 */

export const OrpheusPro = localFont({
  src: 'OrpheusPro.woff2',
  variable: '--font-caption',
});
