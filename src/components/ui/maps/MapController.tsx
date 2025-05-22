import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

/**
 * A component that controls the view of a Leaflet map.
 * It handles map size invalidation and smooth transitions to new locations.
 *
 * This component must be used as a child of a Leaflet Map component since it uses the useMap hook.
 *
 * @param props - The properties for the MapController
 * @param props.center - The coordinates [latitude, longitude] to center the map on
 * @param props.zoom - The zoom level to set the map to (default: 9)
 * @param props.startCenter - Optional starting point for the animation (default: France)
 * @param props.startZoom - Optional starting zoom level (default: 5)
 *
 * @returns null - This component doesn't render any visible elements
 */
export const MapController = ({
  center,
  zoom = 9,
  startCenter = [46.603354, 1.888334], // Centre de la France
  startZoom = 5, // Zoom éloigné pour voir la France entière
}: {
  center: [number, number];
  zoom?: number;
  startCenter?: [number, number];
  startZoom?: number;
}) => {
  const map = useMap();
  const animationRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Nettoyer le timeout lors du démontage du composant
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    if (!map) return;

    // Valider si le conteneur de la carte est prêt et visible
    const validateMapContainer = () => {
      try {
        const container = map.getContainer();
        return (
          container &&
          document.body.contains(container) &&
          container.clientWidth > 0 &&
          container.clientHeight > 0
        );
      } catch {
        return false;
      }
    };

    // Animation depuis la France vers la position cible
    const animateFromFranceToTarget = () => {
      if (!validateMapContainer()) return;

      try {
        // On place d'abord la carte sur la France sans animation
        map.setView(startCenter, startZoom, { animate: false, duration: 0 });

        // Puis on déclenche l'animation vers la cible avec un délai
        setTimeout(() => {
          map.flyTo(center, zoom, {
            duration: 2.5,
            easeLinearity: 0.25,
          });
        }, 300);
      } catch (e) {
        console.warn('Animation de carte abandonnée', e);
        // En cas d'erreur, on place simplement la vue sur la cible
        map.setView(center, zoom, { animate: false });
      }
    };

    try {
      // S'assurer que la carte a la bonne taille
      map.invalidateSize();

      // Si l'animation n'a pas encore été lancée
      if (!animationRef.current) {
        animationRef.current = true;

        // Déclencher l'animation avec un court délai pour s'assurer que la carte est bien rendue
        timeoutRef.current = setTimeout(animateFromFranceToTarget, 300);
      }
    } catch (e) {
      console.warn('Erreur lors de la mise à jour de la carte', e);
    }
  }, [map, center, zoom, startCenter, startZoom]);

  return null;
};
