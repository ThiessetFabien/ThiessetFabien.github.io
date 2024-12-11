'use client';

import React from 'react';
import Image from 'next/image';
import GenericCarousel from './GenericCarousel';
import technologies from '@/types/CardProps';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cn } from '@/lib/utils';
import { cnParagraph } from '@/styles/fontStyles';

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
export const TechnologiesCarousel: React.FC<technologies> = ({
  technologies,
  className,
}) => {
  const useWhiteFilter = (item: string) => {
    return item.includes('express') ? 'filter-white' : '';
  };

  const items = technologies.map((tech, index) => (
    <div
      key={index}
      className={cn(
        'flex flex-shrink-0 flex-col items-center justify-center',
        className
      )}
    >
      <div className='relative mb-2 flex h-8 w-8 justify-center'>
        <Image
          src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
          alt={tech.name}
          width={50}
          height={50}
          objectFit='contain'
          className={cn(useWhiteFilter(tech.slug))}
          priority
        />
      </div>
      <p className={cn(cnParagraph, 'mt-2 text-center')}>{tech.name}</p>
    </div>
  ));

  return <GenericCarousel items={items} className={className} delay={1000} />;
};

export default TechnologiesCarousel;
