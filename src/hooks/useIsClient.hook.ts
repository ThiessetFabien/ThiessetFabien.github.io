import React, { useEffect, useState, type ReactNode } from 'react';

/**
 * Hook personnalisé qui détecte si le code s'exécute côté client
 * @returns {boolean} True si le code s'exécute dans le navigateur, false sinon
 */
export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

/**
 * Props pour le composant NoSSR
 */
interface NoSSRProps {
  /** Contenu à rendre uniquement côté client */
  children: ReactNode;
  /** Contenu à afficher pendant le rendu serveur */
  fallback?: ReactNode;
}

/**
 * Composant qui rend son contenu uniquement côté client
 * Utile pour les composants qui utilisent des APIs spécifiques au navigateur
 *
 * @param props - Propriétés du composant
 * @returns Le contenu enfant sur le client, sinon le fallback
 */
export function NoSSR({
  children,
  fallback = null,
}: NoSSRProps): JSX.Element | null {
  const isClient = useIsClient();

  if (!isClient) {
    return (fallback as React.ReactElement) || null;
  }

  return children as React.ReactElement;
}
