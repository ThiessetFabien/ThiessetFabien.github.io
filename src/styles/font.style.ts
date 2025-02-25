import { cn } from '@lib/utils';

export const cnTitle1 = cn(
  'font-caption font-bold tracking-tight',
  'text-2xl',
  'sm:text-3xl',
  'md:text-4xl'
);

export const cnTitle2Size = cn('text-base', 'sm:text-lg', 'md:text-xl');

export const cnTitle2 = cn('font-caption font-bold tracking-tight');

export const cnTitle3 = cn(
  'font-caption font-semibold tracking-tight',
  'text-sm',
  'md:text-base'
);

export const cnBigDescription = cn(
  'font-normal',
  'text-sm',
  'sm:text-base',
  'md:text-lg'
);

export const cnDescription = cn('font-normal');

export const cnParagraph = cn('font-normal', 'text-xs lg:text-sm');

export const cnSmallText = cn('text-xs');

export const cnBoldTextMuted = cn('text-muted-foreground', 'font-semibold');

export const cnLightTextMuted = cn('text-muted-foreground', 'font-light');
