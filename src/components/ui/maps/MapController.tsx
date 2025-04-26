import { useEffect } from 'react';
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

  useEffect(() => {
    map.invalidateSize();

    setTimeout(() => {
      map.flyTo(center, zoom, { duration: 1 });
    }, 300);
  }, [map, center, zoom]);

  return null;
};
