import { cn } from '@/lib/utils';

export const cnTitle1 = cn(
  'font-caption font-bold leading-tight tracking-tight',
  'text-2xl',
  'sm:text-3xl',
  'md:text-4xl'
);

export const cnTitle2Size = cn('text-base', 'sm:text-lg', 'md:text-xl');

export const cnTitle2 = cn(
  'font-caption font-bold leading-tight tracking-tight'
);

export const cnTitle3 = cn(
  'font-caption font-semibold leading-tight tracking-tight',
  'text-xs',
  'sm:text-sm',
  'md:text-base'
);

export const cnBigDescription = cn('text-sm', 'sm:text-base', 'md:text-lg');

export const cnDescription = cn('font-light');

export const cnParagraph = cn('font-light', 'text-xs lg:text-sm');

export const cnSmallText = cn('text-xs');

export const cnBoldTextMuted = cn('text-muted-foreground', 'font-semibold');

export const cnLightTextMuted = cn('text-muted-foreground', 'font-light');
