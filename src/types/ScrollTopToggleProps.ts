/**
 * Props for the ScrollTopToggle component.
 */
export interface ScrollTopToggleProps {
  variant: 'default' | 'outline'; // The style variant of the toggle.
  size: 'default' | 'sm' | 'lg'; // The size of the toggle.
  onClick: () => void; // Function to handle click events.
  icon: string; // Icon to display in the toggle.
  'aria-label': string; // Accessibility label for the toggle.
  type?: 'button' | 'submit' | 'reset'; // The button type (optional).
  className?: string; // Additional CSS classes (optional).
}
