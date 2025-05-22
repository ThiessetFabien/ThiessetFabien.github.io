/**
 * @file motion.util.ts
 * @description Configurations d'animation réutilisables pour Framer Motion
 */

import { ANIMATION_VALUES } from '@src/config/constants';

/**
 * Animation pour les boutons interactifs
 */
export const buttonAnimation = {
  /**
   * Animation au survol
   */
  hover: { scale: ANIMATION_VALUES.HOVER_SCALE },

  /**
   * Animation au clic
   */
  tap: { scale: ANIMATION_VALUES.TAP_SCALE },
};

/**
 * Animation de fade in
 */
export const fadeInAnimation = {
  /**
   * État initial (invisible)
   */
  initial: { opacity: 0 },

  /**
   * État animé (visible)
   */
  animate: { opacity: 1 },

  /**
   * Configuration de transition
   */
  transition: { duration: 0.5 },
};

/**
 * Animation de slide in depuis le bas
 */
export const slideInFromBottomAnimation = {
  /**
   * État initial (en bas, invisible)
   */
  initial: { y: 50, opacity: 0 },

  /**
   * État animé (position normale, visible)
   */
  animate: { y: 0, opacity: 1 },

  /**
   * Configuration de transition
   */
  transition: { duration: 0.5 },
};
