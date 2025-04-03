/**
 * Interface for menu item properties
 */
export interface MenuItemProps {
  id: string;
  icon: string;
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  disabled?: boolean;
  items?: {
    id: string;
    label: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
  }[];
}
