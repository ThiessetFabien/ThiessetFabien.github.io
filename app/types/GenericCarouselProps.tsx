import type { EmblaOptionsType } from 'embla-carousel';

export interface GenericCarouselProps {
  items?: React.ReactNode[];
  options?: EmblaOptionsType;
  fastRotate: boolean;
  idStart?: number;
  controls: 'dots' | 'arrows' | 'both' | 'none';
  delay?: number;
}
