'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook amélioré pour gérer le thème avec persistance et détection du système
 * Ajoute une synchronisation système <-> localStorage
 */
export function useThemeManager() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Attendre le montage côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Détecter les changements de préférence système
  useEffect(() => {
    if (!isMounted) return;

    // Créer un MediaQueryList pour détecter les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Fonction de gestionnaire pour synchroniser le thème lorsque le système change
    const handleSystemChange = (e: MediaQueryEvent) => {
      // Ne mettre à jour que si le thème est réglé sur "system"
      if (theme === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    // Ajouter l'écouteur d'événements
    mediaQuery.addEventListener('change', handleSystemChange);

    // Nettoyer l'écouteur d'événements
    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, [isMounted, theme]);

  // Fonction pour basculer le thème avec animation
  const toggleTheme = useCallback(() => {
    if (!isMounted) return;

    setIsChanging(true);
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Réinitialiser l'état de changement après l'animation
    setTimeout(() => setIsChanging(false), 500);
  }, [isMounted, resolvedTheme, setTheme]);

  return {
    theme,
    resolvedTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    isMounted,
    isChanging,
  };
}

// Type pour l'événement MediaQuery
interface MediaQueryEvent {
  matches: boolean;
}
