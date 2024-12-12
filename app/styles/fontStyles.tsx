import { cn } from '@/lib/utils';

export const cnTitle1 = cn(
  'font-caption font-bold leading-tight tracking-tight',
  'text-base',
  'sm:text-lg',
  'md:text-xl',
  'lg:text-2xl'
);

export const cnTitle2 = cn(
  'font-caption font-semibold leading-tight tracking-tight',
  'text-sm',
  'sm:text-base',
  'md:text-lg',
  'lg:text-xl'
);

export const cnDescription = cn(
  'w-full max-w-prose',
  'font-light leading-relaxed',
  'text-sm',
  'sm:text-base',
  'md:text-lg',
  'lg:text-xl'
);

export const cnParagraph = cn(
  'w-full max-w-prose',
  'font-light leading-relaxed text-muted-foreground',
  'text-xs',
  'sm:text-sm',
  'md:text-base',
  'lg:text-lg'
);

export const cnSmallText = cn('text-xs lg:text-sm', 'leading-relaxed ');

export const cnBoldTextMuted = cn('text-muted-foreground', 'font-semibold');

export const cnLightTextMuted = cn('text-muted-foreground', 'font-light');
