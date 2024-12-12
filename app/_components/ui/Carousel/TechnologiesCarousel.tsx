'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cnSmallText } from '@/styles/fontStyles';
import { useWhiteFilter } from '@/styles/filterStyles';
import { cnFlexCol, cnFlexFullCenter } from '@/styles/flexStyles';
import { sizeMiddleIcon } from '@/styles/sizeStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import GenericCarousel from './GenericCarousel';
import type CardProps from '@/types/CardProps';

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
export const TechnologiesCarousel: React.FC<CardProps> = ({
  technologies,
  className,
}) => {
  const items =
    technologies &&
    technologies.map((tech, index) => {
      const whiteFilterClass = useWhiteFilter(tech.slug);
      return (
        <div
          key={index}
          className={cn(
            cnFlexCol,
            cnFlexFullCenter,
            'flex-shrink-0',
            'h-auto',
            'min-w-8 xs:min-w-16'
          )}
        >
          <div className={cn(cnFlexFullCenter, 'relative')}>
            <Image
              src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
              alt={tech.name}
              width={50}
              height={50}
              objectFit='contain'
              className={cn(whiteFilterClass, sizeMiddleIcon, 'object-cover')}
              priority
            />
          </div>
          <p
            className={cn(
              cnSmallText,
              cnHiddenXs,
              'text-center font-light text-muted-foreground'
            )}
          >
            {tech.name}
          </p>
        </div>
      );
    });

  return <GenericCarousel items={items} className={className} delay={500} />;
};

export default TechnologiesCarousel;
