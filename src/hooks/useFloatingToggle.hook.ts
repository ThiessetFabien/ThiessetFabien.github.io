import { useEffect, useState } from 'react';

export type FloatingDirection = 'up' | 'down';

interface UseFloatingToggleOptions {
  threshold?: number;
  maxScroll?: number;
  maxOpacity?: number;
  direction?: FloatingDirection;
}

/**
 * A hook to manage the visibility and opacity of floating elements based on scroll behavior.
 * @param options Configuration options for the hook.
 * @returns An object containing opacity, visibility, and scrolling direction.
 */
export function useFloatingToggle({
  threshold = 100,
  maxScroll = 300,
  maxOpacity = 1,
  direction = 'down',
}: UseFloatingToggleOptions = {}) {
  const [opacity, setOpacity] = useState(0);
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDirection, setScrollingDirection] = useState<'up' | 'down'>(
    'down'
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      setScrollingDirection(isScrollingDown ? 'down' : 'up');
      setLastScrollY(currentScrollY);

      const shouldBeVisible =
        (direction === 'down' && currentScrollY > threshold) ||
        (direction === 'up' && currentScrollY < threshold);

      setVisible(shouldBeVisible);

      if (shouldBeVisible) {
        const scrollProgress = Math.min(
          1,
          direction === 'down'
            ? (currentScrollY - threshold) / (maxScroll - threshold)
            : 1 - currentScrollY / threshold
        );
        setOpacity(scrollProgress * maxOpacity);
      } else {
        setOpacity(0);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, maxScroll, maxOpacity, direction, lastScrollY]);

  return {
    opacity,
    visible,
    scrollingDirection,
  };
}
