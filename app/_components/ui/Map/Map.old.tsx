import { useEffect } from 'react';
import { Circle, TileLayer, useMap, MapContainer } from 'react-leaflet';
import L from 'leaflet';
import { leafletConfig, titleLayerUrl } from '@/config/leafletConfig';

const OpenPopupMarker = ({ position }: { position: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    const marker = L.marker(position).addTo(map);
    marker.bindPopup("I'm here").openPopup();
  }, [map, position]);

  return null;
};

export function Map() {
  const position: [number, number] = [50.38164502950426, 3.0532336241209292];

  useEffect(() => {
    leafletConfig();
  }, []);

  const radius = 60000 / 2;

  return (
    <div className='h-[41.6rem] w-full'>
      <MapContainer
        center={position}
        zoom={10}
        className='h-full w-full'
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={titleLayerUrl}
        />
        <OpenPopupMarker position={position} />
        <Circle
          center={position}
          radius={radius}
          color='blue'
          fillColor='blue'
          fillOpacity={0.2}
        />
      </MapContainer>
    </div>
  );
}
