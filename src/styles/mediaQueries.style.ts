import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * Hook to check if the viewport width is less than or equal to 363px.
 * @returns {boolean} True if the viewport width is less than or equal to 363px.
 */
export const useIsXxs = (): boolean => {
  return useMediaQuery({ query: '(max-width: 363px)' });
};

/**
 * Hook to check if the viewport width is less than or equal to 471px.
 * @returns {boolean} True if the viewport width is less than or equal to 471px.
 */
export const useIsXs = (): boolean => {
  return useMediaQuery({ query: '(max-width: 471px)' });
};

/**
 * Hook to check if the viewport width is greater than or equal to 640px.
 * @returns {boolean} True if the viewport width is greater than or equal to 640px.
 */
export const useIsSm = (): boolean => {
  return useMediaQuery({ query: '(min-width: 640px)' });
};

/**
 * Hook to check if the viewport width is greater than or equal to 768px.
 * @returns {boolean} True if the viewport width is greater than or equal to 768px.
 */
export const useIsMd = (): boolean => {
  return useMediaQuery({ query: '(min-width: 768px)' });
};

/**
 * Hook to check if the viewport width is greater than or equal to 1024px.
 * @returns {boolean} True if the viewport width is greater than or equal to 1024px.
 */
export function useIsLg(): boolean {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    setIsLg(window.innerWidth >= 1024);

    function handleResize() {
      setIsLg(window.innerWidth >= 1024);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isLg;
}

/**
 * Hook to check if the viewport width is greater than or equal to 1280px.
 * @returns {boolean} True if the viewport width is greater than or equal to 1280px.
 */
export const useIsXl = (): boolean => {
  return useMediaQuery({ query: '(min-width: 1280px)' });
};

/**
 * Component that returns a responsive image size based on the viewport width.
 * @returns {number} The size of the image (100, 200, or 300).
 */
export const ResponsiveImage = (): number => {
  const isXs = useIsXs();
  const isSm = useIsSm();

  return isXs ? 100 : isSm ? 200 : 300;
};
