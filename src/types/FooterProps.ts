/**
 * Types pour les composants liés au footer
 */

import type { ActionButtonProps } from './ActionButtonProps';
import type { CardProps } from './CardProps';

/**
 * Propriétés pour le composant Footer
 */
export interface FooterProps {
  /**
   * Prénom de l'utilisateur
   */
  name?: string;

  /**
   * Nom de famille de l'utilisateur
   */
  familyName?: string;

  /**
   * Liste des domaines d'expertise
   */
  expertises?: string[] | string;

  /**
   * Classes CSS additionnelles
   */
  className?: string;

  /**
   * Email de contact
   */
  contactEmail?: string;
}

/**
 * Propriétés pour le composant FooterCard
 */
export interface FooterCardProps {
  /**
   * Adresse email pour le lien mailto
   */
  mailto?: CardProps['mailto'];

  /**
   * Texte du premier bouton d'action
   */
  cta1?: ActionButtonProps['cta'];

  /**
   * Icône du premier bouton d'action
   */
  icon1?: ActionButtonProps['icon'];

  /**
   * URL du premier bouton d'action
   */
  href1?: ActionButtonProps['href'];

  /**
   * Indique si le premier bouton permet un téléchargement
   */
  downloadActive1?: ActionButtonProps['downloadActive'];

  /**
   * Indique si le premier bouton est désactivé
   */
  disabled1?: ActionButtonProps['disabled'];

  /**
   * Texte du deuxième bouton d'action
   */
  cta2?: ActionButtonProps['cta'];

  /**
   * Icône du deuxième bouton d'action
   */
  icon2?: ActionButtonProps['icon'];

  /**
   * URL du deuxième bouton d'action
   */
  href2?: ActionButtonProps['href'];

  /**
   * Indique si le deuxième bouton permet un téléchargement
   */
  downloadActive2?: ActionButtonProps['downloadActive'];

  /**
   * Texte du troisième bouton d'action
   */
  cta3?: ActionButtonProps['cta'];

  /**
   * Icône du troisième bouton d'action
   */
  icon3?: ActionButtonProps['icon'];

  /**
   * URL du troisième bouton d'action
   */
  href3?: ActionButtonProps['href'];

  /**
   * Indique si le troisième bouton permet un téléchargement
   */
  downloadActive3?: ActionButtonProps['downloadActive'];

  /**
   * Classes CSS additionnelles
   */
  className?: CardProps['className'];
}
