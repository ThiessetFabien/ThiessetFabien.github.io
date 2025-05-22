import React from 'react';

import { Button } from '@lib/components/ui/button';
import { cn } from '@lib/utils';
import { cnSmallPadding } from '@styles/boxModel.style';

import { Counter } from '@src/components/ui/counter/Counter';
import { IconLoader } from '@src/components/ui/icons/IconLoader';

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
}) => (
  <div
    className={cn(
      cnSmallPadding,
      'absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-border/40 bg-background/60 backdrop-blur-sm',
      'pointer-events-auto'
    )}
    role='toolbar'
    aria-label='Contrôles du carousel'
    onClick={(e) => e.stopPropagation()}
    onKeyDown={(e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
      }
    }}
  >
    <div className='flex items-center gap-2'>
      <Button
        id='carousel-first-button'
        name='carousel-first'
        variant='outline'
        size='sm'
        className='rounded-full'
        onClick={(e) => {
          e.stopPropagation();
          onGoToFirst();
        }}
        aria-label='Premier témoignage'
      >
        <span className='text-xs font-medium'>Revenir au début</span>
      </Button>
      <Counter value={activeIndex} max={totalItems} />
    </div>

    <div className='flex items-center gap-3'>
      <div className='hidden items-center gap-1.5 text-[10px] opacity-70 sm:flex'>
        <div className='flex gap-0.5'>
          <kbd
            id='control-up-key'
            className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'
          >
            ↑
          </kbd>
          <kbd
            id='control-down-key'
            className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'
          >
            ↓
          </kbd>
        </div>
        <kbd
          id='control-pause-key'
          className='inline-flex h-5 w-5 items-center justify-center rounded border border-border/60 bg-background/90 font-sans'
        >
          P
        </kbd>
      </div>

      <Button
        id='carousel-play-pause-button'
        name='carousel-play-pause'
        variant='outline'
        size='icon'
        className='rounded-full'
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlayPause();
        }}
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

export default CarouselControls;
