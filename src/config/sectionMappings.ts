/**
 * Mapping des index des cartes vers les identifiants de section
 * Utilisé pour la navigation et l'ancrage dans le DOM
 */
export const SECTION_MAPPINGS: Record<number, string> = {
  0: 'home',
  1: 'about',
  2: 'portfolio',
  3: 'experiences',
  4: 'contact',
};

/**
 * Obtient l'identifiant de section à partir de l'index de la carte
 * @param index - L'index de la carte
 * @returns L'identifiant de section correspondant, ou un identifiant générique si non trouvé
 */
export function getSectionId(index: number): string {
  return SECTION_MAPPINGS[index] || `section-${index}`;
}
