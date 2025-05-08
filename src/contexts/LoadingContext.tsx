import React, { createContext, useState, useContext, ReactNode } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  isPageLoading?: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setLoading: () => {},
});

/**
 * Provider component for the Loading context.
 *
 * This component manages and provides loading state to its child components
 * through React's Context API. Any component wrapped within this provider
 * can access the loading state and the function to update it.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components that will have access to the loading context
 * @returns {JSX.Element} A Context Provider wrapping the children with loading state values
 */
export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
