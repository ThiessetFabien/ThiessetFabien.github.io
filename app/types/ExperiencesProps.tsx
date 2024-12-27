import { Experience } from './ExperienceProps';
import { OtherExperience } from './OtherExperienceProps';
/**
 * @file ExperiencesProps.tsx
 * @description This file exports interfaces that represent different types of experiences.
 */

/**
 * Experiences interface.
 * @typedef {Object} Experiences
 * @property {Experience[]} developer - An array of developer experiences.
 * @property {Experience[]} projectCoordinator - An array of project coordinator experiences.
 * @property {Experience[]} nurseAssistant - An array of nurse assistant experiences.
 * @property {string} [classNames] - Additional class names for the experiences.
 * @example
 * const experiences: Experiences = {
 *   developer: [{ title: 'Developer', company: 'Company A', date: '2020 - Present' }],
 *   projectCoordinator: [{ title: 'Coordinator', company: 'Company B', date: '2018 - 2020' }],
 *   nurseAssistant: [{ title: 'Assistant', company: 'Company C', date: '2015 - 2018' }]
 * };
 */
export type Experiences = {
  developer: Experience[];
  projectCoordinator: OtherExperience[];
  nurseAssistant: OtherExperience[];
};
