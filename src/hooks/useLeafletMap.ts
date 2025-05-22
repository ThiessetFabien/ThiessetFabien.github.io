// filepath: /home/fabien/Projets/Portfolio/src/hooks/useLeafletMap.ts
import { useRef, useState, useEffect, useCallback } from 'react';
import L from 'leaflet';

/**
 * Options pour le hook useLeafletMap
 */
interface UseLeafletMapOptions {
  /** Callback appelé lorsque la carte est prête */
  onMapReady?: (map: L.Map) => void;
  /** Si true, initialise les icônes Leaflet par défaut */
  initDefaultIcons?: boolean;
  /** Chemin de base pour les icônes Leaflet */
  iconsPath?: string;
}

/**
 * Hook personnalisé pour gérer une carte Leaflet
 * @param options Options de configuration
 * @returns Objet contenant les états et fonctions pour gérer la carte
 */
const useLeafletMap = (options: UseLeafletMapOptions = {}) => {
  const {
    onMapReady,
    initDefaultIcons = true,
    iconsPath = '/images/leaflet',
  } = options;

  // Référence à l'instance de la carte
  const mapRef = useRef<L.Map | null>(null);
  // État d'initialisation
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  // Compteur d'erreurs de tuiles
  const [tileErrors, setTileErrors] = useState(0);

  // Callback lorsque la carte est prête
  const handleMapReady = useCallback(
    (map: L.Map) => {
      mapRef.current = map;
      setIsMapInitialized(true);

      // Force une mise à jour de la taille pour éviter les problèmes d'affichage
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Gestion des erreurs de tuiles
      const handleTileError = () => {
        setTileErrors((prev) => prev + 1);
      };

      map.on('tileerror', handleTileError);

      // Appeler le callback externe si fourni
      if (onMapReady) {
        onMapReady(map);
      }

      return () => {
        map.off('tileerror', handleTileError);
      };
    },
    [onMapReady]
  );

  // Initialisation des icônes par défaut
  useEffect(() => {
    if (initDefaultIcons) {
      // Réinitialisation des URLs d'icônes sans utiliser directement _getIconUrl
      // Pour éviter l'avertissement ESLint no-underscore-dangle
      const resetIconDefaults = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const iconDefault = L.Icon.Default as any;
        if (iconDefault.prototype) {
          // Utilisation de la notation par crochet pour éviter l'avertissement ESLint
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/dot-notation, no-underscore-dangle
          if (iconDefault.prototype['_getIconUrl']) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/dot-notation, no-underscore-dangle
            delete iconDefault.prototype['_getIconUrl'];
          }
        }
      };

      resetIconDefaults();

      L.Icon.Default.mergeOptions({
        iconUrl: `${iconsPath}/marker-icon.png`,
        iconRetinaUrl: `${iconsPath}/marker-icon-2x.png`,
        shadowUrl: `${iconsPath}/marker-shadow.png`,
      });
    }
  }, [initDefaultIcons, iconsPath]);

  // Fonction pour forcer un rechargement des tuiles
  const refreshTiles = useCallback(() => {
    if (mapRef.current) {
      // Forcer un petit changement de zoom pour recharger les tuiles
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom + 0.1);
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.setZoom(currentZoom);
        }
      }, 100);
    }
  }, []);

  // Fonction pour récupérer l'instance de la carte
  const getMap = useCallback(() => mapRef.current, []);

  return {
    handleMapReady,
    isMapInitialized,
    tileErrors,
    refreshTiles,
    getMap,
  };
};

export default useLeafletMap;
