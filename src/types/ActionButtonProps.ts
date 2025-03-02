import type { ButtonProps } from '@lib/components/ui/button';

import type { IconName } from './IconNameProps';

export interface ActionButtonProps extends Omit<ButtonProps, 'children'> {
  mailto?: string;
  type?: 'button' | 'submit' | 'reset';
  cta?: string;
  icon?: IconName;
  href?: string;
  downloadActive?: boolean;
  disabled?: boolean;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
