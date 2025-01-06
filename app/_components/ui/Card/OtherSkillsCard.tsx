import type { CardProps } from '@/types/CardProps';
import React from 'react';
import { TechnologiesCarousel } from '@/ui/Carousel/TechnologiesCarousel';

export const OtherSkillsCard: React.FC<{
  technologies: CardProps['technologies'];
}> = ({ technologies }) => {
  return <TechnologiesCarousel technologies={technologies} />;
};
