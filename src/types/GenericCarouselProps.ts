import React from 'react';

/**
 * Interface pour les props du composant GenericCarousel
 */
export interface GenericCarouselProps {
  /**
   * Tableau d'éléments React à afficher dans le carousel
   */
  items: React.ReactNode[];

  /**
   * Si les contrôles de navigation doivent être affichés
   * @default false
   */
  controls?: boolean;

  /**
   * Classes CSS supplémentaires pour le conteneur du carousel
   */
  className?: string;

  /**
   * Hauteur personnalisée pour le conteneur du carousel
   * @default 'h-[300px]'
   */
  containerHeight?: string;

  /**
   * Fonction de rappel déclenchée lorsque la diapositive active change
   * @param index - L'index de la nouvelle diapositive active
   */
  onSlideChange?: (index: number) => void;

  /**
   * Options personnalisées pour le plugin AutoScroll
   */
  autoplayOptions?: {
    speed?: number;
    direction?: 'forward' | 'backward';
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
    startOnInit?: boolean;
  };

  /**
   * Si l'autoplay doit être mis en pause au survol
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Si une barre de progression verticale doit être affichée
   * @default false
   */
  showProgressBar?: boolean;
}
