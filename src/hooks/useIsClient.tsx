import { useEffect, useState } from 'react';

/**
 * Hook pour vérifier si le code s'exécute côté client.
 * Permet d'éviter les erreurs d'hydratation lors du rendu de composants nécessitant le DOM.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  // Utiliser un useEffect pour définir isClient à true après montage
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
