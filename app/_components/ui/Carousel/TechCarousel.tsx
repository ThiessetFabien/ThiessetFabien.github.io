'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { Technologies } from '@/types/Technologies';
import { Card } from '@/lib/components/ui/card';

/**
 * @file CardProjects.tsx
 * @description This file exports a component that renders a list of project cards.
 */

/**
 * CardProjects component.
 * @param {Object} props - The props for the component.
 * @param {Projects[]} props.projects - An array of project objects to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered CardProjects component.
 * @example
 * <CardProjects projects={projects} className="custom-class" />
 */

export const TechCarousel: React.FC<{
  technologies: Technologies[];
  className: string;
}> = ({ technologies, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 500, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <Card
      className={`overflow-hidden rounded-xl border shadow ${className}`}
      ref={emblaRef}
    >
      <div className='flex'>
        {technologies.map((tech: Technologies, index: number) => (
          <div key={index} className='mx-4 flex flex-col items-center p-4'>
            <Image
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
              alt={tech.name}
              width={100}
              height={100}
              className={`h-full w-auto ${tech.slug.includes('express') ? 'filter-white' : ''}`}
              priority
            />
            <p className='text-center text-sm font-light'>{tech.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default TechCarousel;
