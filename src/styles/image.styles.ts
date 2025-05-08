import { cn } from '@lib/utils';

/**
 * CSS class names for a responsive fixed-size image element.
 *
 * Provides the following fixed dimensions at different breakpoints:
 * - Default (mobile): 100x100px
 * - Small screens (sm): 200x200px
 * - Medium screens (md): 300x300px
 *
 * Uses the `cn` utility to combine Tailwind CSS classes.
 */
export const cnBigImage = cn(
  'max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px]',
  'sm:max-h-[200px] sm:min-h-[200px] sm:min-w-[200px] sm:max-w-[200px]',
  'md:max-h-[300px] md:min-h-[300px] md:min-w-[300px] md:max-w-[300px]'
);
