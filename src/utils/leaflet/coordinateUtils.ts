/**
 * Utilitaires pour la validation et le traitement des coordonnées géographiques
 * Ces fonctions aident à s'assurer que les coordonnées sont valides avant de les utiliser
 */

/**
 * Vérifie si les coordonnées sont valides pour être utilisées dans Leaflet
 * @param coordinates Les coordonnées à vérifier sous forme [latitude, longitude]
 * @returns true si les coordonnées sont valides, false sinon
 */
export const isValidLatLng = (coordinates: any): boolean => {
  // Vérifier que c'est un tableau avec exactement 2 éléments
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return false;
  }

  const [lat, lng] = coordinates;

  // Vérifier que les valeurs sont des nombres
  if (
    typeof lat !== 'number' ||
    typeof lng !== 'number' ||
    Number.isNaN(lat) ||
    Number.isNaN(lng)
  ) {
    return false;
  }

  // Vérifier que les valeurs sont dans les plages valides
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return false;
  }

  return true;
};

/**
 * Normalise les coordonnées pour s'assurer qu'elles sont valides
 * @param coordinates Les coordonnées à normaliser
 * @param defaultCoordinates Coordonnées par défaut à utiliser si les coordonnées d'origine sont invalides
 * @returns Coordonnées normalisées ou coordonnées par défaut
 */
export const normalizeLatLng = (
  coordinates: any,
  defaultCoordinates: [number, number] = [48.8566, 2.3522]
): [number, number] => {
  if (!isValidLatLng(coordinates)) {
    console.warn(
      'Coordonnées invalides détectées, utilisation des coordonnées par défaut',
      coordinates
    );
    return defaultCoordinates;
  }

  return coordinates as [number, number];
};

export default {
  isValidLatLng,
  normalizeLatLng,
};
