import { useMediaQuery } from 'react-responsive';

export const useIsXxs = () => {
  return useMediaQuery({ query: '(max-width: 363px)' });
};

export const useIsXs = () => {
  return useMediaQuery({ query: '(max-width: 471px)' });
};

export const useIsMd = () => {
  return useMediaQuery({ query: '(min-width: 768px)' });
};

export const useIsLg = () => {
  return useMediaQuery({ query: '(min-width: 1024px)' });
};

export const useIsXl = () => {
  return useMediaQuery({ query: '(min-width: 1280px)' });
};
