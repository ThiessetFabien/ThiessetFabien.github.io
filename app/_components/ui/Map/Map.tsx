import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Circle, TileLayer, useMap } from 'react-leaflet';
import { leafletConfig, titleLayerUrl } from '@/config/leafletConfig';

const OpenPopupMarker = ({ position }: { position: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      const marker = L.marker(position).addTo(map);
      marker.bindPopup('Je suis ici !').openPopup();
    }
  }, [map, position]);

  return null;
};

const DynamicMapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

export function Map() {
  const position: [number, number] = [50.38164502950426, 3.0532336241209292];

  useEffect(() => {
    leafletConfig();
  }, []);

  const radius = 60000 / 2;

  return (
    <div id='map-container' className='h-[41.6rem] w-[27rem]'>
      <DynamicMapContainer center={position} zoom={9} className='h-full w-full'>
        <TileLayer url={titleLayerUrl} />
        <OpenPopupMarker position={position} />
        <Circle
          center={position}
          radius={radius}
          color='blue'
          fillColor='blue'
          fillOpacity={0.2}
        />
      </DynamicMapContainer>
    </div>
  );
}
