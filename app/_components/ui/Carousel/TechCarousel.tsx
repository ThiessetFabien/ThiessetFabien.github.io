import Image from 'next/image';
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { Technology } from '@/types/Technology';
import { Section } from '@/components/Section/Section';
import { Card } from '@/ui/card';

export const TechCarousel: React.FC<{ technologies: Technology[] }> = ({
  technologies,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 800, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <Card className='w-full overflow-hidden' ref={emblaRef}>
      <div className='flex'>
        {technologies.map((tech: Technology, index: number) => (
          <div
            key={index}
            className='mx-[1.1rem] flex flex-col items-center gap-y-[1.1rem] p-[1.1rem]'
          >
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
