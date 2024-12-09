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
    <div key={index} className='mx-4 flex flex-col items-center p-4'>
      <div className='relative mb-2 h-24 w-24'>
        <Image
          src={`${baseUrl}cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
          alt={tech.name}
          width={100}
          height={100}
          objectFit='contain'
          className={cn('h-full w-auto', useWhiteFilter(tech.slug))}
          priority
        />
      </div>
      <p className='text-center text-sm font-light'>{tech.name}</p>
    </div>
  ));

  return <GenericCarousel items={items} className={className} delay={500} />;
};

export default TechnologiesCarousel;
