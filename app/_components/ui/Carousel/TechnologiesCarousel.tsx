'use client';

import React from 'react';
import Image from 'next/image';
import GenericCarousel from './GenericCarousel';
import { Technologies } from '@/types/TechnologiesProps';
import { baseUrl } from '@/utils/constants/baseUrl';
import { cn } from '@/lib/utils';

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
export const TechnologiesCarousel: React.FC<Technologies> = ({
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
        'mx-2 flex max-w-full flex-shrink-0 flex-col items-center justify-center p-2',
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
      <p className='mt-2 text-center text-xs font-medium text-muted-foreground md:text-sm'>
        {tech.name}
      </p>
    </div>
  ));

  return (
    <>
      <GenericCarousel items={items} className={className} delay={500} />
    </>
  );
};

export default TechnologiesCarousel;
