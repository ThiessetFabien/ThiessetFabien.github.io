import { Technologies } from './TechnologiesProps';
import { Experiences } from './ExperiencesProps';
import { Projects } from './ProjectsProps';

/**
 * @file CardProps.tsx
 * @description This file contains the type definition for the props used in various card components.
 */

/**
 * CardProps type.
 * @typedef {Object} CardProps
 * @property {string} [imageSrc] - The source URL for the card image.
 * @property {string} [imageAlt] - The alt text for the card image.
 * @property {string} [title] - The title of the card.
 * @property {string} [description] - The description of the card.
 * @property {string} [cta1] - The text for the first call-to-action button.
 * @property {string} [icon1] - The icon for the first call-to-action button.
 * @property {string} [href1] - The href for the first call-to-action button.
 * @property {boolean} downloadActive1 - Whether the first call-to-action button should trigger a download.
 * @property {string} [cta2] - The text for the second call-to-action button.
 * @property {string} [icon2] - The icon for the second call-to-action button.
 * @property {string} [href2] - The href for the second call-to-action button.
 * @property {boolean} downloadActive2 - Whether the second call-to-action button should trigger a download.
 * @property {boolean} [map] - Whether to display a map in the card.
 * @property {Experiences[]} [experiences] - The experiences to display in the card.
 * @property {Experiences[]} [otherExperiences] - Other experiences to display in the card.
 * @property {Projects[]} [projects] - The projects to display in the card.
 * @property {Technologies[]} [technologies] - The technologies to display in the card.
 * @property {React.ReactNode} [content] - Additional content to display in the card.
 * @property {string} [className] - Additional class names for the card.
 */

export default interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  cta1?: string;
  icon1?: string;
  href1?: string;
  downloadActive1: boolean;
  cta2?: string;
  icon2?: string;
  href2?: string;
  downloadActive2: boolean;
  map?: boolean;
  experiences?: Experiences[];
  otherExperiences?: Experiences[];
  projects?: Projects[];
  technologies?: Technologies[];

  content?: React.ReactNode;
  className?: string;
}
