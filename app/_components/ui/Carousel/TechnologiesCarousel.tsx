import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
  cnParagraph,
} from '@/styles/fontStyles';
import { cnFlexFullCenter } from '@/styles/flexStyles';
import { sizeIcon } from '@/styles/sizeStyles';
import GenericCarousel from './GenericCarousel';
import type { CardProps } from '@/types/CardProps';
import { Badge } from '@/lib/components/ui/badge';

/**
 * @file TechCarousel.tsx
 * @description This file exports a component that renders a carousel of technology icons.
 */

/**
 * TechCarousel component.
 * @param {Object} props - The props for the component.
 * @param {Technologies[]} props.technologies - An array of technology objects to be displayed.
 * @param {string} props.className - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered TechCarousel component.
 * @example
 * <TechCarousel technologies={technologies} className="custom-class" />
 */
export const TechnologiesCarousel: React.FC<{
  technologies: CardProps['technologies'];
  className: string;
}> = ({ technologies, className }) => {
  const items =
    technologies &&
    technologies.map((tech, index) => {
      return (
        <Badge key={index} variant='outline' className={cn(className)}>
          <div className={cn(cnFlexFullCenter)}>
            <Image
              src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
              alt={tech.name}
              width={50}
              height={50}
              className={cn(sizeIcon)}
              priority
            />
          </div>
          <p className={cn(cnParagraph, 'text-center')}>
            {capitalizeFirstLetterOfPhrase(formatSpecialWords(tech.name))}
          </p>
        </Badge>
      );
    });

  return (
    <GenericCarousel
      items={items}
      fastRotate={true}
      arrowButtons={false}
      dotButtons={false}
    />
  );
};

export default TechnologiesCarousel;
