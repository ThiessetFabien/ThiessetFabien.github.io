import { Technologie } from './TechnologieProps';
/**
 * @file CardProps.tsx
 * @description This file contains the type definition for the props used in various card components.
 */

import { Experiences } from './ExperiencesProps';
import { Project } from './ProjectProps';
import { Testimonial } from './TestimonialProps';
import { Top3Technologie } from './Top3TechnologieProps';

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
  title?: string;
  description?: string;

  imageSrc?: string;
  imageAlt?: string;

  map?: boolean;

  cta1?: string;
  icon1?: string;
  href1?: string;
  downloadActive1?: boolean;

  cta2?: string;
  icon2?: string;
  href2?: string;
  downloadActive2?: boolean;

  experiences?: Experiences[];

  projects?: Project[];

  top3Technologies?: Top3Technologie[];
  technologies?: Technologie[];

  testimonials?: Testimonial[];

  content?: React.ReactNode;

  className?: string;
  colSpan?: string;
}
