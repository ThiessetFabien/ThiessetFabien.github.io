import { cn } from '@/lib/utils';

export const hideItem = (item: string) => {
  return item === '' ? 'hidden' : '';
};

export const cnHiddenSmBlock = cn('hidden sm:block');

export const cnHiddenXxsFlex = cn('xxs:flex hidden');

export const cnHiddenXsFlex = cn('xs:flex hidden');

export const cnHiddenSmFlex = cn('sm:flex hidden');

export const cnXxsHidden = 'xxs:hidden';

export const cnSmHidden = 'sm:hidden';
