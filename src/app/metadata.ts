import type { Metadata } from 'next';

/**
 * Metadata object containing information about the portfolio.
 *
 * @property {string} title - The title of the portfolio, including the name and expertise of Fabien Thiesset.
 * @property {string} description - A brief description of Fabien Thiesset's portfolio, highlighting his skills and experience as a full-stack developer.
 * @property {string} keywords - A comma-separated list of keywords related to web and mobile development, technologies, and tools.
 * @property {Array<{ name: string }>} authors - An array of author objects, each containing the name of an author.
 */
export const metadata: Metadata = {
  title: 'Fabien Thiesset | Expert React & Node - Développeur Full-Stack',
  description:
    'Portfolio de Fabien Thiesset, Expert React et Node - Développeur Web & Mobile Full-Stack. Découvrez mes projets, compétences et expériences.',
  keywords:
    'web, mobile, developer, react.js, next.js, node.js, tailwind, typescript',
  authors: [{ name: 'Fabien Thiesset' }],
};
