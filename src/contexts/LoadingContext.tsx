'use client';

import { usePathname } from 'next/navigation';
import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

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
  const pathname = usePathname();

  // Effet pour gérer les transitions de page et désactiver automatiquement le chargement
  useEffect(() => {
    if (pathname) {
      // Pour toute nouvelle navigation, on active brièvement le loader
      setIsLoading(true);

      // Désactiver le chargement après un délai raisonnable
      const timer = setTimeout(() => {
        // Si nous sommes sur la page 404, elle gère elle-même le chargement
        if (!pathname.includes('not-found')) {
          setIsLoading(false);
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Mémorise la fonction setLoading pour éviter les re-renders inutiles
  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  // Mémorise la valeur du contexte pour éviter les re-renders inutiles
  const contextValue = useMemo(
    () => ({
      isLoading,
      setLoading,
    }),
    [isLoading, setLoading]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
