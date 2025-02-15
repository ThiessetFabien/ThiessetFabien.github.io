/**
 * Experience interface.
 * @typedef {Object} Experience
 * @property {string} title - The title of the position.
 * @property {string} company - The company where the position was held.
 * @property {string} date - The date range of the position.
 * @example
 * const experience: Experience = { title: 'Developer', company: 'Company A', date: '2020 - Present' };
 */
export interface ExperienceProps {
  title?: string;
  company?: string;
  date?: string;
}
