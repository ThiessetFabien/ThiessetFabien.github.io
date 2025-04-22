import { cn } from '@src/lib/utils';

export const cnSizeIcon: string = cn(
  'w-auto flex-shrink-0',
  'h-5 min-w-5',
  '[&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:pointer-events-none'
);

/**
 * A constant representing the class names for a middle-sized icon.
 *
 * This utility combines multiple Tailwind CSS classes to define the width and height
 * of the icon for different screen sizes:
 * - Default: Auto width and height of 7.
 * - Small screens (`sm`): Height of 8.
 * - Medium breakpoint (`mb`): Height of 15.
 * - Large screens (`lg`): Height of 18.
 *
 * @constant
 * @type {string}
 */
export const cnSizeMiddleIcon: string = cn(
  'w-auto  h-7',
  'sm:h-8',
  'mb:h-15',
  'lg:h-18'
);

export const cnSizeBigIcon: string = cn(
  'h-10 w-auto',
  'xs:h-12',
  'sm:h-14',
  'mb:h-18'
);

export const cnSizeAuto: string = 'w-auto h-auto';

export const cnSizeFull: string = 'w-full h-full';

export const cnAutoHeightFullWidth: string = 'h-auto w-full';

export const cnAutoWidthFullHeight: string = 'w-auto h-full';
