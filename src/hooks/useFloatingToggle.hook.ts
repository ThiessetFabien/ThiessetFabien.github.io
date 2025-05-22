import { useState, useEffect, useRef, useCallback } from 'react';

import type { UseFloatingToggleProps } from '@src/types/useFloatingToggleProps';
/**
 * A custom hook that manages the visibility, blur effect, and scrolling direction
 * of a floating element based on the user's scroll position.
 *
 * @param {UseFloatingToggleProps} [options] - Configuration options for the hook.
 * @param {number} [options.threshold=100] - The scroll position threshold at which the floating element becomes visible.
 * @param {number} [options.maxScroll=300] - The maximum scroll distance used to calculate the blur effect.
 * @param {number} [options.maxBlur=8] - The maximum blur value applied to the floating element.
 * @param {'up' | 'down'} [options.direction='down'] - The direction in which the floating element should appear ('up' or 'down').
 *
 * @returns {Object} The state and properties of the floating element.
 * @returns {number} blur - The current blur value applied to the floating element.
 * @returns {boolean} visible - Whether the floating element is currently visible.
 * @returns {'up' | 'down'} direction - The current scrolling direction ('up' or 'down').
 *
 * @example
 * const { blur, visible, direction } = useFloatingToggle({
 *   threshold: 150,
 *   maxScroll: 400,
 *   maxBlur: 10,
 *   direction: 'up',
 * });
 *
 * @remarks
 * This hook uses the `window.scrollY` value to determine the scroll position and updates
 * the state accordingly. It also throttles the scroll event listener using `requestAnimationFrame`
 * to improve performance.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY | MDN: Window.scrollY}
 */
export function useFloatingToggle({
  threshold = 100,
  maxScroll = 300,
  maxBlur = 8,
  direction = 'down',
}: UseFloatingToggleProps = {}) {
  const [blur, setBlur] = useState(0);
  const [visible, setVisible] = useState(false);
  const [scrollingDirection, setScrollingDirection] = useState<'up' | 'down'>(
    'down'
  );

  const lastScrollYRef = useRef(0);
  const blurRef = useRef(0);
  const visibleRef = useRef(false);
  const isMountedRef = useRef(false);

  const updateState = useCallback(
    (currentScrollY: number) => {
      const scrollDirection =
        currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      lastScrollYRef.current = currentScrollY;

      if (scrollDirection !== scrollingDirection) {
        setScrollingDirection(scrollDirection);
      }

      const shouldBeVisible =
        (direction === 'down' && currentScrollY > threshold) ||
        (direction === 'up' && currentScrollY < threshold);

      if (shouldBeVisible !== visibleRef.current) {
        visibleRef.current = shouldBeVisible;
        setVisible(shouldBeVisible);
      }

      if (shouldBeVisible) {
        const scrollProgress = Math.min(
          1,
          direction === 'down'
            ? (currentScrollY - threshold) / (maxScroll - threshold)
            : 1 - currentScrollY / threshold
        );
        const newBlur = scrollProgress * maxBlur;

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

    const initialScrollY = window.scrollY;
    lastScrollYRef.current = initialScrollY;
    updateState(initialScrollY);

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
