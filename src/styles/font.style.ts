import { cn } from '@lib/utils';

/**
 * A utility class name constant for styling title elements.
 * Combines multiple Tailwind CSS classes to define font style, weight, tracking, and responsive text sizes.
 *
 * - `font-caption font-bold tracking-tight`: Sets the font style to caption, makes it bold, and applies tight letter spacing.
 * - `text-3xl`: Sets the base text size to 3xl.
 * - `lg:text-6xl`: Adjusts the text size to 6xl on large screens.
 */
export const cnTitle1 = cn(
  'font-caption font-bold tracking-tight',
  'text-3xl',
  'lg:text-6xl'
);

export const cnTitle2Size = cn('text-3xl');

export const cnTitle2 = cn('font-caption font-bold tracking-tight');

export const cnTitle3 = cn('font-caption font-bold tracking-tight', 'text-2xl');

export const cnBigDescription = cn(
  'font-normal',
  'font-sans',
  'text-xl',
  'lg:text-2xl'
);

export const cnDescription = cn('font-normal', 'font-sans');

export const cnParagraph = cn('font-normal', 'font-sans', 'text-base');

export const cnSmallText = cn('text-xs', 'font-sans font-normal');

export const cnBoldTextMuted = cn(
  'text-muted-foreground',
  'font-sans',
  'font-semibold'
);

export const cnLightTextMuted = cn(
  'text-muted-foreground',
  'font-sans',
  'font-light'
);
