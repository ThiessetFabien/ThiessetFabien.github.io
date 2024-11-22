import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect } from 'react';
import { TechCarouselProps } from '../../../types/TechCarouselProps';
import { Technology } from '../../../types/Technology';

export const TechCarousel: React.FC<TechCarouselProps> = ({ technologies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className='w-full overflow-hidden' ref={emblaRef}>
      <div className='flex'>
        {technologies.map((tech, index) => {
          return (
            <div
              key={index}
              className='mx-[1.1rem] flex flex-col items-center border'
            >
              <Image
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.slug}.svg`}
                alt={tech.name}
                width={100}
                height={auto}
              />
              <p className='text-2xl'>{tech.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechCarousel;
