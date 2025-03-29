import { cn } from '../lib/utils';

export const cnSmallPadding = 'p-2 md:p-4';

export const cnPadding = 'p-4 md:p-6';

export const cnSmallPaddingX = 'px-2 md:px-4';

export const cnPaddingX = 'px-4 md:px-6';

export const cnPaddingY = 'py-4 md:py-6';

export const cnPaddingTop = 'pt-4 md:pt-6';

export const cnPaddingBottom = 'pb-4 md:pb-6';

export const cnSmallPaddingBottom = 'pb-2 md:pb-4';

export const cnSmallMarginX = 'mx-2 md:mx-4';

export const cnMarginX = 'mx-2 sm:mx-4 md:mx-6';

export const cnMargin = 'm-2 sm:m-4 md:m-6';

export const cnMarginY = 'my-2 sm:my-4 md:my-6';

export const cnSmallMarginLeft = 'ml-2 md:ml-4';

export const cnMarginLeft = 'ml-2 sm:ml-4 md:ml-6';

export const cnSmallMarginRight = 'mr-2 md:mr-4';

export const cnMarginRight = 'mr-2 sm:mr-4 md:mr-6';

export const cnMarginTop = 'mt-2 sm:mt-4 md:mt-6';

export const cnMarginBottom = 'mb-2 sm:mb-4 md:mb-6';

export const cnSpaceY = 'space-y-4 md:space-y-6';

export const cnSmallSpaceY = 'space-y-2 ';

export const cnSpaceX = 'space-x-4 md:space-x-6 ';

export const cnSmallSpaceX = 'space-x-2';

export const cnSmallGap = 'gap-2 md:gap-4';

export const cnGap = 'gap-4 md:gap-6';

export const cnGapX = 'gap-x-4 md:gap-x-6';

export const cnTopRightPosition = cn('right-4 md:right-6', 'top-4 md:top-6');

/**
 * A utility class name generator for positioning an element at the bottom-right corner
 * with responsive adjustments for different screen sizes.
 *
 * - On smaller screens, the element is positioned 1rem (4 units) from the right and bottom.
 * - On medium screens and above, the element is positioned 1.5rem (6 units) from the right and bottom.
 *
 * @constant
 */
export const cnBottomRightPosition = cn(
  'right-4 md:right-6',
  'bottom-4 md:bottom-6'
);

export const cnManipulation =
  'touch-manipulation cursor-pointer appearance-none ';
