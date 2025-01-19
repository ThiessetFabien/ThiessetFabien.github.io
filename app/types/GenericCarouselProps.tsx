import type { EmblaOptionsType } from 'embla-carousel';

export interface GenericCarouselProps {
  items?: React.ReactNode[];
  options?: EmblaOptionsType;
  fastRotate: boolean;
  dotButtons: boolean;
  arrowButtons: boolean;
  delay?: number;
}
