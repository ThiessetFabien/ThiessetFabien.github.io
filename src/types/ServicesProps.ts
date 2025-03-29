import { IconName } from './IconNameProps';

/**
 * Represents the properties for a service item.
 */
export interface ServicesProps {
  /**
   * The name of the icon associated with the service.
   */
  icon: IconName;

  /**
   * The description or name of the service item.
   */
  item: string;
}
