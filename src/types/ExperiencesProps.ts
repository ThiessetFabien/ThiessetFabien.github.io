/**
 * Represents the properties of an experience entry.
 *
 * @property job - The title of the job or position.
 * @property date - The date or duration of the experience.
 * @property company - The name of the company or organization.
 * @property location - The location where the experience took place.
 * @property goal - (Optional) The main objective or purpose of the role.
 * @property role - (Optional) A description of the role or responsibilities.
 * @property tasks - (Optional) A list of tasks or duties performed.
 * @property stack - (Optional) A list of technologies or tools used.
 * @property skills - (Optional) A list of skills acquired or utilized.
 */
export interface ExperiencesProps {
  job: string;
  date: string;
  company: string;
  location: string;
  goal?: string;
  role?: string;
  tasks?: string[];
  stack?: string[];
  skills?: string[];
}
