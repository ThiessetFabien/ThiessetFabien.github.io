/**
 * Interface defining the structure for the About section data
 */
export interface AboutProps {
  /**
   * The title of the About section
   */
  title: string;

  /**
   * Array of job objects representing different professional roles
   */
  jobs: JobProps[];
}

/**
 * Interface defining the structure for each job in the About section
 */
export interface JobProps {
  /**
   * The name or title of the job
   */
  name: string;

  /**
   * A detailed description of the job responsibilities
   */
  description: string;

  /**
   * Optional array of skills associated with this job
   */
  skills?: string[];
}
