import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect } from 'react';

interface CarouselProps {
  technologies: { name: string; iconSrc: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ technologies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className='w-full overflow-hidden' ref={emblaRef}>
      <div className='flex'>
        {technologies.map((tech, index) => (
          <div className='min-w-20% relative p-2.5' key={index}>
            <img
              src={tech.iconSrc}
              alt={tech.name}
              className='block h-auto w-full'
            />
            <p>{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
