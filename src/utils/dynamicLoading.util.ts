import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Utilitaire pour charger dynamiquement des composants afin d'améliorer
 * les performances de première compilation et le temps de démarrage.
 *
 * @param importFunc - Fonction d'importation dynamique du composant
 * @param options - Options de configuration du chargement dynamique
 * @returns Composant chargé dynamiquement avec les options spécifiées
 */
export function dynamicComponent<T = any>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options: {
    ssr?: boolean;
    loading?: React.ComponentType<any> | null;
    displayName?: string;
  } = {}
) {
  // Options par défaut
  const defaultOptions = {
    ssr: true,
    loading: null,
    displayName: 'DynamicComponent',
  };

  // Fusionner les options par défaut avec celles fournies
  const mergedOptions = { ...defaultOptions, ...options };

  // Créer le composant dynamique
  const DynamicComponent = dynamic(importFunc, {
    ssr: mergedOptions.ssr,
    loading: mergedOptions.loading ? () => null : undefined,
  });

  // Définir le displayName pour faciliter le débogage
  if (mergedOptions.displayName) {
    DynamicComponent.displayName = mergedOptions.displayName;
  }

  return DynamicComponent;
}

/**
 * Précharge un composant dynamique pour améliorer les performances.
 * Utile pour les composants qui seront nécessaires après une interaction utilisateur.
 *
 * @param importFunc - Fonction d'importation dynamique du composant à précharger
 */
export function preloadComponent(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) {
  // Déclencher le chargement en arrière-plan
  importFunc().catch((err) => {
    console.warn('Erreur lors de la précharge du composant :', err);
  });
}

/**
 * Charge un composant de manière différée après le montage initial
 * pour améliorer les performances de rendu initiales.
 *
 * @param importFunc - Fonction d'importation dynamique du composant
 * @param delay - Délai en ms avant le chargement différé (par défaut: 200ms)
 */
export function lazyLoadComponent<T = any>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  delay: number = 200
) {
  return dynamicComponent<T>(
    () =>
      new Promise((resolve) => {
        // Attendre que le rendu initial soit terminé avant de charger
        setTimeout(() => {
          importFunc()
            .then(resolve)
            .catch((err) => {
              console.error('Erreur lors du chargement différé :', err);
              // Résoudre avec un composant vide en cas d'erreur
              resolve({ default: (() => null) as React.ComponentType<T> });
            });
        }, delay);
      }),
    { ssr: false }
  );
}

/**
 * Optimise le chargement des images en les préchargeant de manière intelligente
 * pour améliorer les performances lors de la première compilation.
 *
 * @param imageSrc - Source de l'image à précharger
 * @param priority - Priorité de chargement (faible, moyenne, haute)
 * @param onLoad - Callback appelé lorsque l'image est chargée
 */
export function optimizedImageLoader(
  imageSrc: string | undefined,
  priority: 'low' | 'medium' | 'high' = 'medium',
  onLoad?: () => void
): Promise<HTMLImageElement | null> {
  if (!imageSrc) return Promise.resolve(null);

  // Délai basé sur la priorité
  let delay: number;
  switch (priority) {
    case 'high':
      delay = 0;
      break;
    case 'medium':
      delay = 100;
      break;
    default: // 'low'
      delay = 500;
      break;
  }

  return new Promise((resolve) => {
    // Différer légèrement le chargement pour permettre au JavaScript critique de s'exécuter
    setTimeout(() => {
      const img = new Image();

      img.onload = () => {
        if (onLoad) onLoad();
        resolve(img);
      };

      img.onerror = () => {
        console.warn(`Échec du chargement de l'image: ${imageSrc}`);
        resolve(null);
      };

      // Définir les attributs pour optimiser le chargement
      if (priority === 'low') {
        img.loading = 'lazy';
        img.fetchPriority = 'low';
      } else if (priority === 'high') {
        img.fetchPriority = 'high';
      }

      img.src = imageSrc;
    }, delay);
  });
}
