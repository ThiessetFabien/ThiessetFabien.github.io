'use client';

import { cn } from '@src/lib/utils';
import LoadingSpinner from './spinner/LoadingSpinner';
import { cnFlexFullCenter } from '@styles/flex.style';

export default function LoadingScreen() {
  return (
    <div className={cn('h-screen w-screen', cnFlexFullCenter)}>
      <LoadingSpinner size='lg' message='Chargement...' />
    </div>
  );
}
