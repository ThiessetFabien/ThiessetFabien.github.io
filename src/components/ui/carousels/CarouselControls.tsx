import React from 'react';

import { Button } from '@lib/components/ui/button';
import { cn } from '@lib/utils';
import { cnSmallPadding } from '@src/styles/boxModel.style';

import { IconLoader } from '../icons/IconLoader';

interface CarouselControlsProps {
  activeIndex: number;
  totalItems: number;
  isPaused: boolean;
  isHovering: boolean;
  onTogglePlayPause: () => void;
  onGoToFirst: () => void;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  activeIndex,
  totalItems,
  isPaused,
  isHovering,
  onTogglePlayPause,
  onGoToFirst,
}) => {
  return (
    <div
      className={cn(
        cnSmallPadding,
        'absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-border/40 bg-background/60 backdrop-blur-sm'
      )}
    >
      <div className='flex items-center gap-2'>
        <Button
          id='carousel-first-button'
          name='carousel-first'
          variant='outline'
          size='sm'
          className='rounded-full'
          onClick={onGoToFirst}
          aria-label='Premier témoignage'
        >
          <span className='text-xs font-medium'>Revenir au début</span>
        </Button>

        <span className='text-xs font-medium'>
          {activeIndex + 1} / {totalItems}
        </span>
      </div>

      <div className='flex items-center gap-3'>
        <div className='hidden items-center gap-1.5 text-[10px] opacity-70 sm:flex'>
          <div className='flex gap-0.5'>
            <kbd className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'>
              ↑
            </kbd>
            <kbd className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'>
              ↓
            </kbd>
          </div>
          <kbd className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'>
            P
          </kbd>
        </div>

        <Button
          id='carousel-play-pause-button'
          name='carousel-play-pause'
          variant='outline'
          size='icon'
          className='rounded-full'
          onClick={onTogglePlayPause}
          aria-label={isPaused ? 'Reprendre le défilement' : 'Mettre en pause'}
        >
          {isPaused || isHovering ? (
            <IconLoader icon='Play' />
          ) : (
            <IconLoader icon='Pause' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CarouselControls;
