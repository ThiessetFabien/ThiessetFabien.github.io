export interface ScrollTopToggleProps {
  variant: 'default' | 'outline';
  size: 'default' | 'sm' | 'lg';
  onClick: () => void;
  icon: string;
  'aria-label': string;
  type?: 'button' | 'submit' | 'reset';
}
