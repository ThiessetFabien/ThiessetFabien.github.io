import { IconName } from './IconNameProps';

/**
 * Defines the properties for a service item.
 */
export interface ServicesProps {
  /**
   * The name of the icon associated with the service.
   */
  icon: IconName;

  /**
   * The name of the service item.
   */
  item: string;

  /**
   * A brief description of the service.
   */
  description: string;
}
