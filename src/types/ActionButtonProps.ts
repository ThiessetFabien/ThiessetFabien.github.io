import type { IconName } from './IconNameProps';

export interface ActionButtonProps {
  cta?: string;
  icon?: IconName;
  href?: string;
  downloadActive?: boolean;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  type?: string;
  size?: 'icon' | 'default' | 'sm' | 'lg' | 'xs' | null;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
  ) => void;
}
