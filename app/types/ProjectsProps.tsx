/**
 * @file ProjectsProps.tsx
 * @description This file exports interfaces that represent a project and its associated tags.
 */

/**
 * Projects interface.
 * @typedef {Object} Projects
 * @property {string} title - The title of the project.
 * @property {string} organization - The organization associated with the project.
 * @property {string} imageSrc - The source URL for the project's image.
 * @property {string} imageAlt - The alt text for the project's image.
 * @property {string} [demo] - The URL for the project's demo (optional).
 * @property {string} website - The URL for the project's website.
 * @property {string} github - The URL for the project's GitHub repository.
 * @property {Tags[]} tags - An array of tags associated with the project.
 * @property {string} [className] - Additional class names for the project.
 * @example
 * const project: Projects = {
 *   title: 'My Project',
 *   organization: 'My Organization',
 *   imageSrc: '/path/to/image.jpg',
 *   imageAlt: 'Project Image',
 *   demo: 'https://demo.example.com',
 *   website: 'https://project.example.com',
 *   github: 'https://github.com/user/project',
 *   tags: [{ tag: 'JavaScript' }, { tag: 'React' }],
 *   className: 'my-project',
 * };
 */
export interface Projects {
  title: string;
  organization: string;
  imageSrc: string;
  imageAlt: string;
  demo?: string;
  website: string;
  github: string;
  tags: Tags[];
  className?: string;
}

/**
 * Tags interface.
 * @typedef {Object} Tags
 * @property {string} tag - The name of the tag.
 * @example
 * const tag: Tags = { tag: 'JavaScript' };
 */

export interface Tags {
  tag: string;
}
