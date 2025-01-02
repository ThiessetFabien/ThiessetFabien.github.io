export interface ActionButtonProps {
  cta?: string;
  icon?: string;
  href?: string;
  downloadActive?: boolean;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'link'
    | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
}
