import React from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Circle,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';

interface LocationEventsProps {
  position: [number, number];
}

const LocationEvents: React.FC<LocationEventsProps> = ({ position }) => {
  const map = useMapEvents({
    click: () => {
      map.flyTo(position, map.getZoom());
    },
  });

  return null;
};

export const Map: React.FC = () => {
  const francePosition: [number, number] = [46.6034, 3.1236];
  const finalPosition: [number, number] = [
    50.38164502950426, 3.0532336241209292,
  ];
  const radius = 60000 / 2;

  return (
    <div className='h-[41.6rem] w-full'>
      <MapContainer
        center={francePosition}
        zoom={10}
        className='h-full w-full'
        scrollWheelZoom={false}
      >
        <Circle
          center={finalPosition}
          radius={radius}
          color='blue'
          fillColor='blue'
          fillOpacity={0.2}
        />
        <Marker
          position={finalPosition}
          icon={L.icon({
            iconUrl: '/leaflet/images/marker-icon.png',
            shadowUrl: '/leaflet/images/marker-shadow.png',
          })}
        >
          <Popup>I'm here</Popup>
        </Marker>
        <LocationEvents position={finalPosition} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};
