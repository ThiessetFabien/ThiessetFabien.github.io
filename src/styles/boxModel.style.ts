import { cn } from '../lib/utils';

export const cnSmallPadding: string = 'p-2 md:p-4';

export const cnPadding: string = 'p-4 md:p-6';

export const cnSmallPaddingX: string = 'px-2 md:px-4';

export const cnSmallPaddingY: string = 'py-2 md:py-4';

export const cnPaddingX: string = 'px-4 md:px-6';

export const cnPaddingY: string = 'py-4 md:py-6';

export const cnPaddingTop: string = 'pt-4 md:pt-6';

export const cnPaddingBottom: string = 'pb-4 md:pb-6';

export const cnSmallPaddingRight: string = 'pr-2 md:pr-4';

export const cnSmallPaddingLeft: string = 'pl-2 md:pl-4';

export const cnSmallPaddingBottom: string = 'pb-2 md:pb-4';

export const cnSmallMarginX: string = 'mx-2 md:mx-4';

export const cnMarginX: string = 'mx-2 sm:mx-4 md:mx-6';

export const cnMargin: string = 'm-2 sm:m-4 md:m-6';

export const cnMarginY: string = 'my-2 sm:my-4 md:my-6';

export const cnSmallMarginLeft: string = 'ml-2 md:ml-4';

export const cnMarginLeft: string = 'ml-2 sm:ml-4 md:ml-6';

export const cnSmallMarginRight: string = 'mr-2 md:mr-4';

export const cnMarginRight: string = 'mr-2 sm:mr-4 md:mr-6';

export const cnMarginTop: string = 'mt-2 sm:mt-4 md:mt-6';

export const cnMarginBottom: string = 'mb-2 sm:mb-4 md:mb-6';

export const cnSpaceY: string = 'space-y-4 md:space-y-6';

export const cnSmallSpaceY: string = 'space-y-2 ';

export const cnSpaceX: string = 'space-x-4 md:space-x-6 ';

export const cnSmallSpaceX: string = 'space-x-2';

export const cnSmallGap: string = 'gap-2 md:gap-4';

export const cnGap: string = 'gap-4 md:gap-6';

export const cnGapX: string = 'gap-x-4 md:gap-x-6';

export const cnTopRightPosition: string = 'right-4 top-4';

/**
 * Utility class names for positioning an element at the bottom-right corner
 * with responsive adjustments for different screen sizes.
 */
export const cnBottomRightPosition: string = 'right-4 bottom-4';

/**
 * Utility class names for positioning an element at the left-center of the screen.
 */
export const cnLeftCenterPosition: string = cn(
  'left-4',
  'top-1/2 -translate-y-1/2'
);

/**
 * Utility class names for touch manipulation and pointer interaction.
 */
export const cnManipulation: string =
  'touch-manipulation cursor-pointer appearance-none ';
