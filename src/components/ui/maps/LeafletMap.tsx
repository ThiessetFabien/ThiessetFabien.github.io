import React, { memo } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MapController } from '@src/components/ui/maps/MapController';
import useIntersectionObserver from '@src/hooks/IntersectionObserver.hook';
import { type LeafletMapProps } from '@src/types/LeafletMapProps';

/**
 * Leaflet map component
 */
const LeafletMap = ({
  center = [50.3675, 3.0803],
  zoom = 9,
  markers = [],
  scrollWheelZoom = false,
  flyToAnimation = true,
}: LeafletMapProps) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px',
  });

  return (
    <div ref={ref} className='h-full min-h-[300px] w-full'>
      {isVisible && (
        <MapContainer
          center={center}
          zoom={zoom}
          className='z-[1] h-full w-full'
          scrollWheelZoom={scrollWheelZoom}
          attributionControl={false}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {flyToAnimation && <MapController center={center} zoom={zoom} />}

          {markers.map(
            (marker, index) =>
              marker.circle && (
                <Circle
                  key={`marker-${index}`}
                  center={marker.position}
                  radius={marker.circle.radius}
                  pathOptions={{
                    color: marker.circle.color,
                    fillColor: marker.circle.fillColor || marker.circle.color,
                    fillOpacity: marker.circle.fillOpacity || 0.2,
                    weight: marker.circle.weight || 1,
                  }}
                />
              )
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default memo(LeafletMap);
