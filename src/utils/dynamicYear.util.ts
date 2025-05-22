/**
 * @file dynamicYear.util.ts
 * @description Utilitaire pour obtenir l'année actuelle et formater une plage d'années pour un copyright
 */

/**
 * Obtient l'année actuelle
 * @returns {number} L'année actuelle
 */
export const year: number = new Date().getFullYear();

/**
 * Formate une plage d'années pour un copyright
 * @param {number} startYear - L'année de départ
 * @param {number} [currentYear=year] - L'année actuelle (par défaut l'année en cours)
 * @returns {string} La plage d'années formatée (ex: "2024" ou "2024 - 2025")
 */
export const formatCopyrightYears = (
  startYear: number,
  currentYear: number = year
): string => {
  if (currentYear <= startYear) {
    return startYear.toString();
  }

  return `${startYear} - ${currentYear}`;
};
