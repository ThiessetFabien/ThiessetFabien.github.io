import { useCallback, useEffect } from 'react';

/**
 * Hook to handle smooth scrolling to sections when URL hash changes
 *
 * @param offset - Offset from the top (useful for fixed headers)
 */
export const useScrollToSection = (offset: number = 100) => {
  // Function to scroll to the target element
  const scrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        // Calculate position with offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        // Scroll smoothly to the element
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    },
    [offset]
  );

  // Handle initial load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # character
        const elementId = hash.slice(1);
        // Scroll to the target element
        setTimeout(() => scrollToElement(elementId), 100);
      }
    };

    // Handle the hash on initial page load
    if (window.location.hash) {
      handleHashChange();
    }

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollToElement]);

  return scrollToElement;
};
