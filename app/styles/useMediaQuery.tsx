import { useMediaQuery } from 'react-responsive';

const useIsXS = () => {
  return useMediaQuery({ query: '(max-width: 471px)' });
};

export default useIsXS;
