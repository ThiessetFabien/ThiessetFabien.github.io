/**
 * @file CardProps.tsx
 * @description This file contains the type definition for the props used in various card components.
 */
import type { TechnologieProps } from './TechnologieProps';
import type { AchievementProps } from './AchievementProps';
import type { QuoteProps } from './QuoteProps';
import type { ExperiencesProps } from './ExperiencesProps';
import type { OtherExperienceProps } from './OtherExperienceProps';
import type { ProjectProps } from './ProjectProps';
import type { TestimonialProps } from './TestimonialProps';
import type { TopTechnologieProps } from './Top3TechnologieProps';
import type { ActionButtonProps } from './ActionButtonProps';

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

export type CardProps = {
  index?: number;
  title?: string;
  description?: string;

  imageSrc?: string;
  imageAlt?: string;

  map?: boolean;

  cta1?: ActionButtonProps['cta'];
  icon1?: ActionButtonProps['icon'];
  href1?: ActionButtonProps['href'];
  downloadActive1?: ActionButtonProps['downloadActive'];

  cta2?: ActionButtonProps['cta'];
  icon2?: ActionButtonProps['icon'];
  href2?: ActionButtonProps['href'];
  downloadActive2?: ActionButtonProps['downloadActive'];

  cta3?: ActionButtonProps['cta'];
  icon3?: ActionButtonProps['icon'];
  href3?: ActionButtonProps['href'];
  downloadActive3?: ActionButtonProps['downloadActive'];

  cta4?: ActionButtonProps['cta'];
  icon4?: ActionButtonProps['icon'];
  href4?: ActionButtonProps['href'];
  downloadActive4?: ActionButtonProps['downloadActive'];

  experiences?: ExperiencesProps[];
  otherExperiences?: OtherExperienceProps[];

  projects?: ProjectProps[];

  topTechnologies?: TopTechnologieProps[];
  technologies?: TechnologieProps[];
  quote?: QuoteProps;

  testimonials?: TestimonialProps[];

  achievements?: AchievementProps[];

  content?: React.ReactNode;
  funFact?: string;

  mailto?: string;

  className?: string;
  colSpan?: string;
};
