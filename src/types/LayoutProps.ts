/**
 * Props communs pour les composants de mise en page
 */
export interface LayoutProps {
  /**
   * Contenu enfant à afficher dans le layout
   */
  children: React.ReactNode;
}

/**
 * Props pour le layout principal avec données
 */
export interface DataLayoutProps extends LayoutProps {
  /**
   * Données à utiliser dans le layout
   */
  data: unknown[];
}
