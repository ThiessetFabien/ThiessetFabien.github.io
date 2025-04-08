import { useState, useEffect, useRef, useCallback } from 'react';

import useIntersectionObserver from './IntersectionObserver.hook';

/**
 * Custom hook to detect the active section based on scrolling.
 * Uses the existing useIntersectionObserver hook to observe multiple sections.
 *
 * @returns {Object} An object containing the active section ID and a function to observe a section.
 */
export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefsRef = useRef<Record<string, HTMLDivElement>>({});

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0.3,
  };

  const [observerRef] = useIntersectionObserver(observerOptions);

  const observeSection = useCallback(
    (id: string, element: HTMLDivElement | null) => {
      if (element) {
        sectionRefsRef.current[id] = element;
      }
    },
    []
  );

  const findMostVisibleSection = useCallback(() => {
    const sections = document.querySelectorAll('[id^="card-"]');
    let maxVisibility = 0;
    let mostVisibleSection = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibilityRatio = visibleHeight / rect.height;

      if (visibilityRatio > maxVisibility) {
        maxVisibility = visibilityRatio;
        mostVisibleSection = section.id.replace('card-', '');
      }
    });

    return mostVisibleSection;
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const mostVisibleSection = findMostVisibleSection();
          if (mostVisibleSection && mostVisibleSection !== activeSection) {
            setActiveSection(mostVisibleSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, findMostVisibleSection]);

  return { activeSection, observerRef, observeSection };
};
