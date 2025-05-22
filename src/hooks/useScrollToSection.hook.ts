import { useCallback, useEffect } from 'react';

/**
 * Hook to handle smooth scrolling to sections when URL hash changes.
 *
 * @param {number} [offset=100] - Offset from the top (useful for fixed headers).
 * @returns {Function} A function to scroll to a specific element by its ID.
 */
export const useScrollToSection = (offset: number = 100) => {
  const scrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    },
    [offset]
  );

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const elementId = hash.slice(1);
        setTimeout(() => scrollToElement(elementId), 100);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollToElement]);

  return scrollToElement;
};
