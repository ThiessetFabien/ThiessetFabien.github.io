import { AutoplayOptionsType } from 'embla-carousel-autoplay';

export interface GenericCarouselProps {
  items: React.ReactNode[];
  delay?: number;
  controls?: boolean;
  containerHeight?: string;
  className?: string;
  showPartialNext?: boolean;
  onSlideChange?: (index: number) => void;
  autoplayOptions?: Partial<AutoplayOptionsType>;
  pauseOnInteraction?: boolean;
  pauseOnHover?: boolean;
}
