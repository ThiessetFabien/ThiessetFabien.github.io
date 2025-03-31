import { cn } from '@lib/utils';

/**
 * Utility class for styling title elements with combined Tailwind CSS classes.
 */
export const cnTitle1 = cn(
  'font-caption font-bold tracking-tight',
  'text-3xl',
  'lg:text-6xl'
);

/**
 * Utility class for defining the size of Title 2 elements.
 */
export const cnTitle2Size = cn('text-3xl');

/**
 * Utility class for styling Title 2 elements.
 */
export const cnTitle2 = cn('font-caption font-bold tracking-tight');

/**
 * Utility class for styling Title 3 elements.
 */
export const cnTitle3 = cn('font-caption font-bold tracking-tight', 'text-2xl');

/**
 * Utility class for styling large description text.
 */
export const cnBigDescription = cn(
  'font-normal',
  'font-sans',
  'text-xl',
  'lg:text-2xl'
);

/**
 * Utility class for styling description text.
 */
export const cnDescription = cn('font-normal', 'font-sans');

/**
 * Utility class for styling paragraph text.
 */
export const cnParagraph = cn('font-normal', 'font-sans');

/**
 * Utility class for styling small text.
 */
export const cnSmallText = cn('text-sm', 'font-sans font-normal');

/**
 * Utility class for styling bold muted text.
 */
export const cnBoldTextMuted = cn(
  'text-muted-foreground',
  'font-sans',
  'font-semibold'
);

/**
 * Utility class for styling light muted text.
 */
export const cnLightTextMuted = cn(
  'text-muted-foreground',
  'font-sans',
  'font-light'
);
