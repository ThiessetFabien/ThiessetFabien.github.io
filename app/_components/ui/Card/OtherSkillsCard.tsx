import type { CardProps } from '@/types/CardProps';
import React from 'react';
import { TechnologiesCarousel } from '@/ui/Carousel/TechnologiesCarousel';

export const OtherSkillsCard: React.FC<CardProps> = ({ technologies }) => {
  return <TechnologiesCarousel technologies={technologies} />;
};
