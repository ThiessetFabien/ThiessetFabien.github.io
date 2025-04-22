import React, { memo, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import useIntersectionObserver from '@src/hooks/IntersectionObserver.hook';
import { type LeafletMapProps } from '@src/types/LeafletMapProps';
import { LocationEventsProps } from '@src/types/LocationEventsProps';

/**
 * LeafletMap component renders an interactive map using Leaflet.js.
 *
 * @param {Object} props - Component properties.
 * @param {[number, number]} [props.center=[50.3675, 3.0803]] - Initial center coordinates of the map.
 * @param {number} [props.zoom=9] - Initial zoom level of the map.
 * @param {Array<{ position: [number, number]; popup?: string; circle?: { radius: number; color: string; fillColor?: string; fillOpacity?: number } }>} [props.markers] - List of markers to display on the map.
 * @param {boolean} [props.scrollWheelZoom=false] - Enables or disables zooming with the scroll wheel.
 * @param {boolean} [props.flyToAnimation=true] - Enables or disables fly-to animation when the map is loaded.
 * @returns {JSX.Element} The rendered Leaflet map component.
 */
const LeafletMap: React.FC<LeafletMapProps> = ({
  center,
  zoom,
  markers,
  scrollWheelZoom,
  flyToAnimation,
}: LeafletMapProps): JSX.Element => {
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  const LocationEventsMap: React.FC<{
    position: LocationEventsProps['position'];
  }> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(position, zoom || 9, {
        duration: 1,
      });
    }, [map, position]);

    return null;
  };

  return (
    <div ref={ref} style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={scrollWheelZoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers &&
          markers.map((marker, index) => (
            <React.Fragment key={index}>
              {isIntersecting && flyToAnimation && (
                <LocationEventsMap position={marker.position} />
              )}
              {marker.circle && (
                <Circle
                  center={marker.position}
                  radius={marker.circle.radius}
                  pathOptions={{
                    color: marker.circle.color,
                    fillColor: marker.circle.fillColor || marker.circle.color,
                    fillOpacity: marker.circle.fillOpacity || 0.2,
                  }}
                />
              )}
            </React.Fragment>
          ))}
      </MapContainer>
    </div>
  );
};

export default memo(LeafletMap);
