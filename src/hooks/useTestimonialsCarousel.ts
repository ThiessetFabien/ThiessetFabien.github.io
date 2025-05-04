import { useState, useRef, useCallback, useEffect } from 'react';

import type { TestimonialProps } from '@src/types/TestimonialProps';

export interface TestimonialCarouselOptions {
  autoPlayInterval?: number;
}

export interface VisibleTestimonial {
  testimonial: TestimonialProps;
  index: number;
  isPartial: boolean;
}

export const useTestimonialsCarousel = (
  testimonials: TestimonialProps[],
  containerHeight: number,
  options: TestimonialCarouselOptions = {}
) => {
  const { autoPlayInterval = 6000 } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const determineVisibleCount = useCallback(() => {
    const avgTestimonialHeight = 210;
    const partialTestimonialHeight = 90;

    const maxFullTestimonials = Math.floor(
      containerHeight / avgTestimonialHeight
    );
    const fullTestimonialsCount = Math.max(1, maxFullTestimonials);

    const remainingHeight =
      containerHeight - fullTestimonialsCount * avgTestimonialHeight;
    const hasPartialSpace = remainingHeight >= partialTestimonialHeight;

    return {
      full: fullTestimonialsCount,
      hasPartial: hasPartialSpace,
    };
  }, [containerHeight]);

  const getVisibleTestimonials = useCallback((): VisibleTestimonial[] => {
    const { full, hasPartial } = determineVisibleCount();
    const result = [];

    for (let i = 0; i < full; i++) {
      const index = (activeIndex + i) % testimonials.length;
      result.push({
        testimonial: testimonials[index],
        index,
        isPartial: false,
      });
    }

    if (hasPartial) {
      const partialIndex = (activeIndex + full) % testimonials.length;
      result.push({
        testimonial: testimonials[partialIndex],
        index: partialIndex,
        isPartial: true,
      });
    }

    return result;
  }, [activeIndex, determineVisibleCount, testimonials]);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const togglePlayPause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const goToFirst = useCallback(() => {
    setActiveIndex(0);
  }, []);

  const goToLast = useCallback(() => {
    setActiveIndex(testimonials.length - 1);
  }, [testimonials.length]);

  const goToPage = useCallback(
    (page: number) => {
      const visibleCount = determineVisibleCount().full;
      setActiveIndex((prev) =>
        Math.min(
          Math.max(0, prev + page * visibleCount),
          testimonials.length - 1
        )
      );
    },
    [determineVisibleCount, testimonials.length]
  );

  useEffect(() => {
    const shouldBePaused = isPaused || isHovering;

    if (!shouldBePaused) {
      intervalRef.current = setInterval(nextTestimonial, autoPlayInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, isHovering, nextTestimonial, autoPlayInterval]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleKeyboardNavigation = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          prevTestimonial();
          e.preventDefault();
          break;
        case 'ArrowDown':
          nextTestimonial();
          e.preventDefault();
          break;
        case ' ':
        case 'p':
        case 'P':
          togglePlayPause();
          e.preventDefault();
          break;
        case 'Home':
          goToFirst();
          e.preventDefault();
          break;
        case 'End':
          goToLast();
          e.preventDefault();
          break;
        case 'PageUp':
          goToPage(-1);
          e.preventDefault();
          break;
        case 'PageDown':
          goToPage(1);
          e.preventDefault();
          break;
      }
    },
    [
      nextTestimonial,
      prevTestimonial,
      togglePlayPause,
      goToFirst,
      goToLast,
      goToPage,
    ]
  );

  return {
    activeIndex,
    isPaused,
    isHovering,
    nextTestimonial,
    prevTestimonial,
    togglePlayPause,
    goToFirst,
    getVisibleTestimonials,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyboardNavigation,
    determineVisibleCount,
  };
};
