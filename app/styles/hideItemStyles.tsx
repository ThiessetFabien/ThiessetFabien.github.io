import { cn } from '@/lib/utils';

export const hideItem = (item: string) => {
  return item === '' ? 'hidden' : '';
};

export const cnHidden = cn('hidden sm:block');

export const cnHiddenXs = cn('xs:flex hidden');
