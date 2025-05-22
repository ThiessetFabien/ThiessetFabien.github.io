import { useState, useEffect, useRef, useCallback } from 'react';

import useIntersectionObserver from './IntersectionObserver.hook';

/**
 * Custom hook to detect the active section based on scrolling.
 * Uses the existing useIntersectionObserver hook to observe multiple sections.
 *
 * @returns {Object} An object containing the active section ID and functions to observe and interact with sections.
 */
export const useActiveSection = (): {
  activeSection: string | null;
  observeSection: (id: string, element: HTMLDivElement | null) => void;
  observerRef: React.RefObject<HTMLDivElement>;
} => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefsRef = useRef<Record<string, HTMLDivElement>>({});

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0.3,
  };

  const [observerRef] = useIntersectionObserver(observerOptions);

  const observeSection = useCallback(
    (id: string, element: HTMLDivElement | null) => {
      if (element) {
        sectionRefsRef.current[id] = element;
      }
    },
    []
  );

  const findMostVisibleSection = useCallback(() => {
    // Sélectionner les sections de notre application (celles définies dans notre mapping)
    const sections = document.querySelectorAll(
      '#home, #about, #portfolio, #experiences, #contact'
    );
    let maxVisibility = 0;
    let mostVisibleSection = null;

    sections.forEach((section) => {
      // Calculer la visibilité en pourcentage de la hauteur visible de la section
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityRatio = visibleHeight / rect.height;

      // Mettre à jour la section la plus visible
      if (visibilityRatio > maxVisibility) {
        maxVisibility = visibilityRatio;
        mostVisibleSection = section.id;
      }
    });

    return mostVisibleSection;
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        // Utiliser requestAnimationFrame pour optimiser les performances
        window.requestAnimationFrame(() => {
          const mostVisibleSection = findMostVisibleSection();
          if (mostVisibleSection && mostVisibleSection !== activeSection) {
            setActiveSection(mostVisibleSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Ajouter l'écouteur d'événement avec l'option passive pour améliorer les performances
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Exécuter une fois au montage pour détecter la section initiale
    handleScroll();

    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, findMostVisibleSection]);

  return { activeSection, observerRef, observeSection };
};
