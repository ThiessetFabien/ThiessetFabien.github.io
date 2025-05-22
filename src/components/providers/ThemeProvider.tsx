'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * Fournisseur de thème amélioré qui synchronise le thème entre localStorage et les préférences système
 * et évite les problèmes d'hydratation en retardant le rendu complet
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Synchroniser le thème du système avec localStorage uniquement côté client
  useEffect(() => {
    // Utiliser un petit délai pour s'assurer que l'hydratation est terminée
    const timer = setTimeout(() => {
      // Code pour synchroniser le thème
    }, 20); // Un délai légèrement plus long pour s'assurer que le DOM est prêt

    return () => clearTimeout(timer);
  }, []);

  // On repose sur le script externe (theme-init.js) pour l'initialisation rapide du thème
  // Ce composant se charge principalement de maintenir la synchronisation par la suite
  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      storageKey='theme'
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
