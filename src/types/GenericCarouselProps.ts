import React from 'react';

/**
 * Interface for GenericCarousel component props
 */
export interface GenericCarouselProps {
  /**
   * Array of React elements to display in the carousel
   */
  items: React.ReactNode[];

  /**
   * Whether navigation controls should be displayed
   * @default false
   */
  controls?: boolean;

  /**
   * Additional CSS classes for the carousel container
   */
  className?: string;

  /**
   * Custom height for the carousel container
   * @default 'h-[300px]'
   */
  containerHeight?: string;

  /**
   * Callback function triggered when the active slide changes
   * @param index - The index of the new active slide
   */
  onSlideChange?: (index: number) => void;

  /**
   * Custom options for the AutoScroll plugin
   */
  autoplayOptions?: {
    speed?: number;
    direction?: 'forward' | 'backward';
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
    startOnInit?: boolean;
  };

  /**
   * Whether autoplay should be paused on hover
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Whether a vertical progress bar should be displayed
   * @default false
   */
  showProgressBar?: boolean;
}
