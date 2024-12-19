import { cn } from '@/lib/utils';

export const cnButton = cn(
  'inline-flex items-center justify-center',
  'whitespace-nowrap',
  'sm:h-8 h-9 lg:h-10',
  'rounded-md lg:rounded-lg',
  'sm:px-3 px-4 lg:px-8',
  'py-2',
  'gap-2',
  'font-medium',
  'sm:text-xs',
  'transition-colors',
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
  'disabled:pointer-events-none disabled:opacity-50',
  '[&_svg]:pointer-events-none',
  '[&_svg]:size-4',
  '[&_svg]:shrink-0'
);

export const cnButtonIcon = cn(
  'sm:h-8 h-9 lg:h-10',
  'sm:w-8 w-9 lg:w-10',
  'px-1.5 py-0'
);
