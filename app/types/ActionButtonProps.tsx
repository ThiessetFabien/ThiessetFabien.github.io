export interface ActionButton {
  cta: string;
  icon: string;
  href: string;
  downloadActive: boolean;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
}