/**
 * Interface representing testimonial properties.
 */
export interface TestimonialProps {
  /**
   * The author of the testimonial
   */
  author: string;

  /**
   * The job title of the author
   */
  job: string;

  /**
   * The company where the author works
   */
  company: string;

  /**
   * The testimonial content/message
   */
  content: string;

  /**
   * The source URL for the author's image
   */
  imageSrc: string;

  /**
   * The LinkedIn profile URL of the author
   */
  linkedin: string;
}
