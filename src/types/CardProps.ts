import { AchievementProps } from './AchievementProps';
import type { ActionButtonProps } from './ActionButtonProps';
import type { ExperiencesProps } from './ExperiencesProps';
import { JobsProps } from './JobsProps';
import type { OtherExperienceProps } from './OtherExperiencesProps';
import type { ProjectProps } from './ProjectProps';
import type { ServicesProps } from './ServicesProps';
import type { TechnologieProps } from './TechnologieProps';
import type { TestimonialProps } from './TestimonialProps';
import type { TopTechnologieProps } from './Top3TechnologieProps';

/**
 * Represents the properties for a card component.
 *
 * @interface CardProps
 * @property {number} [index] - The index of the card.
 * @property {string} name - The name associated with the card.
 * @property {string} familyName - The family name associated with the card.
 * @property {ServicesProps[]} services - The list of services provided.
 * @property {string[]} expertises - The list of expertises.
 * @property {JobsProps[]} jobs - The list of jobs.
 * @property {string} [title] - The title of the card.
 * @property {string} [description] - The description of the card.
 * @property {string} [imageSrc] - The source URL for the card image.
 * @property {string} [imageAlt] - The alt text for the card image.
 * @property {boolean} [map] - Indicates if a map should be displayed.
 * @property {string} [cta1] - Text for the first call-to-action button.
 * @property {string} [icon1] - Icon for the first call-to-action button.
 * @property {string} [href1] - Href for the first call-to-action button.
 * @property {boolean} [downloadActive1] - Indicates if the first button triggers a download.
 * @property {string} [cta2] - Text for the second call-to-action button.
 * @property {string} [icon2] - Icon for the second call-to-action button.
 * @property {string} [href2] - Href for the second call-to-action button.
 * @property {boolean} [downloadActive2] - Indicates if the second button triggers a download.
 * @property {string} [cta3] - Text for the third call-to-action button.
 * @property {string} [icon3] - Icon for the third call-to-action button.
 * @property {string} [href3] - Href for the third call-to-action button.
 * @property {boolean} [downloadActive3] - Indicates if the third button triggers a download.
 * @property {string} [cta4] - Text for the fourth call-to-action button.
 * @property {string} [icon4] - Icon for the fourth call-to-action button.
 * @property {string} [href4] - Href for the fourth call-to-action button.
 * @property {boolean} [downloadActive4] - Indicates if the fourth button triggers a download.
 * @property {string} [cta5] - Text for the fifth call-to-action button.
 * @property {string} [icon5] - Icon for the fifth call-to-action button.
 * @property {string} [href5] - Href for the fifth call-to-action button.
 * @property {boolean} [downloadActive5] - Indicates if the fifth button triggers a download.
 * @property {ExperiencesProps[]} [experiences] - List of experiences.
 * @property {OtherExperienceProps[]} [otherExperiences] - List of other experiences.
 * @property {ProjectProps[]} [projects] - List of projects.
 * @property {TopTechnologieProps[]} [topTechnologies] - List of top technologies.
 * @property {TechnologieProps[]} [technologies] - List of technologies.
 * @property {TestimonialProps[]} [testimonials] - List of testimonials.
 * @property {AchievementProps[]} [achievements] - List of achievements.
 * @property {React.ReactNode} [content] - Additional content for the card.
 * @property {string} [funFact] - A fun fact to display.
 * @property {string} [mailto] - Email address for contact.
 * @property {string} [className] - Additional class names for styling.
 * @property {string} [colSpan] - Column span for layout purposes.
 */
export interface CardProps {
  index?: number;
  name: string;
  familyName: string;
  services: ServicesProps[];

  expertises: string[];
  jobs: JobsProps[];

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

  cta5?: ActionButtonProps['cta'];
  icon5?: ActionButtonProps['icon'];
  href5?: ActionButtonProps['href'];
  downloadActive5?: ActionButtonProps['downloadActive'];

  experiences?: ExperiencesProps[];
  otherExperiences?: OtherExperienceProps[];

  projects?: ProjectProps[];

  topTechnologies?: TopTechnologieProps[];
  technologies?: TechnologieProps[];

  testimonials?: TestimonialProps[];

  achievements?: AchievementProps[];

  content?: React.ReactNode;
  funFact?: string;

  mailto?: string;

  className?: string;
  colSpan?: string;
}
