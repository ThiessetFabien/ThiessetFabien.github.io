/**
 * Fonctions utilitaires pour le rendu des expertises
 */
import React from 'react';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from './formatText.util';

/**
 * Affiche une liste d'expertises formatée avec séparateurs
 *
 * @param {string[] | string | undefined} expertises - Liste des expertises ou une seule expertise
 * @returns {React.ReactNode} Les expertises formatées avec séparateurs
 */
export const formatExpertisesList = (
  expertises: string[] | string | undefined
): React.ReactNode => {
  if (!expertises || (Array.isArray(expertises) && expertises.length === 0)) {
    return null;
  }

  if (Array.isArray(expertises)) {
    return expertises.map((expertise: React.Key | undefined, i: number) =>
      React.createElement(
        'span',
        { key: expertise },
        capitalizeFirstLetterOfEachWord(formatSpecialWords(String(expertise))),
        i < expertises.length - 1 ? ' | ' : ''
      )
    );
  }

  return capitalizeFirstLetterOfEachWord(formatSpecialWords(expertises));
};
