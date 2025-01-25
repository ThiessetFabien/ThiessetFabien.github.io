import type { EmblaOptionsType } from 'embla-carousel';

export interface GenericCarouselProps {
  items?: React.ReactNode[];
  options?: EmblaOptionsType;
  delay?: number;
}
