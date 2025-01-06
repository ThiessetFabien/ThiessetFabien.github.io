import { useEffect, useState } from 'react';

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  // console.log('initial render', isClient);

  useEffect(() => {
    setIsClient(true);
    // console.log('Effect render');
  }, []);

  return isClient;
};
