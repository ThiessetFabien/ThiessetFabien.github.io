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
 *
 * @returns null - This component doesn't render any visible elements
 */
export const MapController = ({
  center,
  zoom = 9,
}: {
  center: [number, number];
  zoom?: number;
}) => {
  const map = useMap();
  const initializedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!map) return;

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

    try {
      map.invalidateSize();

      if (!initializedRef.current) {
        map.setView(center, zoom, { animate: false, duration: 0 });
        initializedRef.current = true;

        timeoutRef.current = setTimeout(() => {
          if (validateMapContainer()) {
            try {
              map.setView(center, zoom, { animate: true, duration: 1 });
            } catch (e) {
              console.warn('Animation de carte abandonnée', e);
              map.setView(center, zoom, { animate: false });
            }
          }
        }, 300);
      } else {
        if (validateMapContainer()) {
          try {
            map.setView(center, zoom, { animate: true, duration: 1 });
          } catch (e) {
            console.warn('Animation de carte abandonnée', e);
            map.setView(center, zoom, { animate: false });
          }
        }
      }
    } catch (e) {
      console.warn('Erreur lors de la mise à jour de la carte', e);
    }
  }, [map, center, zoom]);

  return null;
};
