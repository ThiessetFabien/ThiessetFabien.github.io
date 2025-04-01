import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Options for the useFloatingToggle hook
 */
interface UseFloatingToggleOptions {
  /** Scroll threshold in pixels to show/hide the element */
  threshold?: number;
  /** Maximum scroll value for blur effect */
  maxScroll?: number;
  /** Maximum blur amount (in pixels) */
  maxBlur?: number;
  /** Scroll direction ('up' or 'down') */
  direction?: 'up' | 'down';
}

/**
 * A hook to manage the visibility and blur effect of floating elements based on scroll behavior.
 * @param options Configuration options for the hook.
 * @returns An object containing blur amount, visibility, and scrolling direction.
 */
export function useFloatingToggle({
  threshold = 100,
  maxScroll = 300,
  maxBlur = 8,
  direction = 'down',
}: UseFloatingToggleOptions = {}) {
  const [blur, setBlur] = useState(0);
  const [visible, setVisible] = useState(false);
  const [scrollingDirection, setScrollingDirection] = useState<'up' | 'down'>(
    'down'
  );

  // Use refs to avoid update loops
  const lastScrollYRef = useRef(0);
  const blurRef = useRef(0);
  const visibleRef = useRef(false);
  const isMountedRef = useRef(false);

  // Update visibility and blur optimally
  const updateState = useCallback(
    (currentScrollY: number) => {
      const scrollDirection =
        currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentScrollY;

      // Update scroll direction
      if (scrollDirection !== scrollingDirection) {
        setScrollingDirection(scrollDirection);
      }

      // Determine if element should be visible
      const shouldBeVisible =
        (direction === 'down' && currentScrollY > threshold) ||
        (direction === 'up' && currentScrollY < threshold);

      // Only update visibility state if it changes
      if (shouldBeVisible !== visibleRef.current) {
        visibleRef.current = shouldBeVisible;
        setVisible(shouldBeVisible);
      }

      // Calculate new blur level
      if (shouldBeVisible) {
        const scrollProgress = Math.min(
          1,
          direction === 'down'
            ? (currentScrollY - threshold) / (maxScroll - threshold)
            : 1 - currentScrollY / threshold
        );
        const newBlur = scrollProgress * maxBlur;

        // Only update blur if it changes significantly
        if (Math.abs(newBlur - blurRef.current) > 0.1) {
          blurRef.current = newBlur;
          setBlur(newBlur);
        }
      } else if (blurRef.current > 0) {
        blurRef.current = 0;
        setBlur(0);
      }
    },
    [direction, maxBlur, maxScroll, scrollingDirection, threshold]
  );

  useEffect(() => {
    isMountedRef.current = true;

    // Initial setup without depending on previous values
    const initialScrollY = window.scrollY;
    lastScrollYRef.current = initialScrollY;
    updateState(initialScrollY);

    // Limit update frequency with throttling
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking && isMountedRef.current) {
        ticking = true;
        requestAnimationFrame(() => {
          if (isMountedRef.current) {
            const currentScrollY = window.scrollY;
            updateState(currentScrollY);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [updateState]);

  return {
    blur,
    visible,
    direction: scrollingDirection,
  };
}
