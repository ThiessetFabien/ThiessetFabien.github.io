export interface ActionButtonProps {
  mailto?: string;
  type?: 'button' | 'submit' | 'reset';
  cta?: string;
  icon?: string;
  href?: string;
  downloadActive?: boolean;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'link'
    | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
