import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { leafletConfig } from '../../../config/leafletConfig';

const OpenPopupMarker = ({ position }: { position: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    const marker = L.marker(position).addTo(map);
    marker.bindPopup('Je suis ici !').openPopup();
  }, [map, position]);

  return null;
};

export function Map() {
  const position: [number, number] = [50.38164502950426, 3.0532336241209292];

  leafletConfig();

  return (
    <div className='h-96 w-full'>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        className='h-full w-full'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <OpenPopupMarker position={position} />
      </MapContainer>
    </div>
  );
}
