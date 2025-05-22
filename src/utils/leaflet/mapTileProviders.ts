/**
 * Fournisseurs de tuiles pour les cartes Leaflet
 * Ce fichier permet de gérer facilement différents fournisseurs de tuiles
 * et de basculer entre eux en cas de problème de connexion
 */

export interface TileProvider {
  /** URL du fournisseur de tuiles */
  url: string;
  /** Attribution à afficher (copyright) */
  attribution: string;
  /** Sous-domaines disponibles pour la répartition de charge */
  subdomains: string[];
  /** Zoom maximum supporté */
  maxZoom: number;
  /** Zoom minimum supporté */
  minZoom?: number;
  /** Opacité des tuiles (0-1) */
  opacity?: number;
  /** Détection automatique des écrans haute résolution */
  detectRetina?: boolean;
  /** Priorité du fournisseur (plus bas = plus prioritaire) */
  priority: number;
}

const tileProviders: Record<string, TileProvider> = {
  openStreetMap: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
    priority: 1,
  },
  cartoDBLight: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 19,
    priority: 2,
  },
  cartoDBVoyager: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 19,
    priority: 3,
  },
  stamenTerrain: {
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 18,
    priority: 4,
  },
};

/**
 * Obtient les fournisseurs de tuiles ordonnés par priorité
 * @returns Tableau de fournisseurs triés par priorité
 */
export const getTileProviders = (): TileProvider[] =>
  Object.values(tileProviders).sort((a, b) => a.priority - b.priority);

/**
 * Obtient un fournisseur de tuiles par son nom
 * @param name Nom du fournisseur
 * @returns Fournisseur de tuiles ou le fournisseur par défaut si non trouvé
 */
export const getTileProvider = (name: string): TileProvider =>
  tileProviders[name] || tileProviders.openStreetMap;

/**
 * Obtient le fournisseur de tuiles principal
 * @returns Fournisseur de tuiles principal
 */
export const getMainTileProvider = (): TileProvider =>
  tileProviders.openStreetMap;

/**
 * Obtient le fournisseur de tuiles de secours
 * @returns Fournisseur de tuiles de secours
 */
export const getFallbackTileProvider = (): TileProvider =>
  tileProviders.cartoDBLight;

export default tileProviders;
