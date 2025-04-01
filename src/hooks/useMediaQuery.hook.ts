'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);

      const handleChange = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };

      // Set initial value
      setMatches(media.matches);

      // Setup listeners for changes
      if (media.addEventListener) {
        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        media.addListener(handleChange);
        return () => media.removeListener(handleChange);
      }
    }

    return undefined;
  }, [query]);

  return matches;
}

// Predefined media query hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}
