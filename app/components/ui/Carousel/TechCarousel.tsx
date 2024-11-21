import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect } from 'react';
import { TechCarouselProps } from '../../../types/TechCarouselProps';

export const TechCarousel: React.FC<TechCarouselProps> = ({ technologies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className='w-full overflow-hidden' ref={emblaRef}>
      <div className='mx-[1.1rem] flex'>
        {technologies.map((tech, index) => {
          const iconClass = `devicon-${tech.slug}`;
          return (
            <div key={index} className='flex flex-col items-center border'>
              <i className={`${iconClass} colored h-50 w-50 text-6xl`}></i>
              <p className='text-2xl'>{tech.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechCarousel;
