/**
 * Constantes pour les classes CSS communes utilisées dans les composants d'interface
 */

/**
 * Classes pour les éléments de texte
 */
export const TEXT_CLASSES = {
  /**
   * Classes pour le texte centré avec césure automatique
   */
  CENTERED_TEXT: 'hyphens-auto break-words text-center',

  /**
   * Classes pour le padding responsif des descriptions
   */
  RESPONSIVE_PADDING: 'px-1 sm:px-0',

  /**
   * Classes pour les liens interactifs
   */
  INTERACTIVE_LINK:
    'text-primary hover:text-secondary/80 hover:underline focus:text-secondary/80 focus:underline',
};

/**
 * Classes pour les conteneurs
 */
export const CONTAINER_CLASSES = {
  /**
   * Classes pour les cartes flexibles
   */
  FLEX_CARD: 'flex flex-col justify-between',

  /**
   * Classes pour les espaces entre éléments
   */
  SMALL_GAP: 'gap-2',
  MEDIUM_GAP: 'gap-4',
  LARGE_GAP: 'gap-6',
};
