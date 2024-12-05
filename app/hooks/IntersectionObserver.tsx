import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * @file IntersectionObserver.tsx
 * @description This file exports a custom hook that uses the Intersection Observer API to determine if an element is in the viewport.
 */

/**
 * Custom hook that uses the Intersection Observer API to determine if an element is in the viewport.
 * @param {IntersectionObserverInit} options - The options for the Intersection Observer.
 * @returns {[RefObject<HTMLDivElement>, boolean]} A tuple containing a ref to be attached to the element and a boolean indicating if the element is intersecting.
 * @example
 * const [ref, isIntersecting] = useIntersectionObserver({ root: null, rootMargin: '0px', threshold: 1.0 });
 * return <div ref={ref}>{isIntersecting ? 'In view' : 'Out of view'}</div>;
 */

const useIntersectionObserver = (
  options: IntersectionObserverInit
): [RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

export default useIntersectionObserver;
