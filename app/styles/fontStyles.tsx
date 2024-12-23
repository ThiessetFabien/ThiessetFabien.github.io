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
  'font-caption leading-tight tracking-tight',
  'text-sm',
  'sm:text-base',
  'md:text-lg'
);

export const cnBigDescription = cn(
  // 'w-full max-w-prose',
  'font-light leading-relaxed',
  'text-sm',
  'sm:text-base',
  'md:text-lg'
);

export const cnDescription = cn(
  // 'w-full max-w-prose',
  'font-light leading-relaxed'
  // 'text-sm',
  // 'sm:text-base',
  // 'md:text-lg'
);

export const cnParagraph = cn(
  // 'w-full max-w-prose',
  'font-light leading-relaxed text-sm'
  // 'text-xs',
  // 'sm:text-sm',
  // 'md:text-base'
);

export const cnSmallText = cn('text-xs lg:text-sm', 'leading-relaxed ');

export const cnBoldTextMuted = cn('text-muted-foreground', 'font-semibold');

export const cnLightTextMuted = cn('text-muted-foreground', 'font-light');
