import { type Map as LeafletMapType } from 'leaflet';
import React, { memo, useEffect, useRef, useState } from 'react';

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
  }>;
  scrollWheelZoom?: boolean;
  flyToAnimation?: boolean;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [50.3675, 3.0803],
  zoom = 9,
  markers = [
    {
      position: [50.381645, 3.053234],
      popup: 'I code here every day !',
    },
  ],
  scrollWheelZoom = false,
  flyToAnimation = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMapType | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (mapInstanceRef.current) return;

      const customIcon = new L.Icon({
        iconUrl: '/images/leaflet/marker-icon.png',
        iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
        shadowUrl: '/images/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const francePosition: [number, number] = [46.6034, 3.1236];
      const initialZoom = flyToAnimation ? 5 : zoom;
      const initialCenter = flyToAnimation ? francePosition : center;

      // Ajustement du zoom pour les petits écrans
      const isMobile = window.innerWidth < 768;
      const adjustedZoom = isMobile
        ? Math.max(initialZoom - 1, 4)
        : initialZoom;

      const map = L.map(mapRef.current as HTMLElement, {
        preferCanvas: true,
        attributionControl: true,
        zoomControl: true,
        scrollWheelZoom,
        // Ajouter des options spécifiques pour mobile
        dragging: true,
        touchZoom: true,
      }).setView(initialCenter, adjustedZoom);

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        tileSize: 256,
        zoomOffset: 0,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Force invalidateSize plusieurs fois pour s'assurer du rendu correct
      map.invalidateSize();
      interface Marker {
        position: [number, number];
        popup?: string;
        circle?: {
          radius: number;
          color: string;
          fillColor?: string;
          fillOpacity?: number;
        };
      }

      interface CircleOptions {
        radius: number;
        color: string;
        fillColor: string;
        fillOpacity: number;
        weight: number;
        opacity: number;
        interactive: boolean;
        pane: string;
      }

      const addMarkersAndCircles = (
        markers: Marker[],
        map: LeafletMapType,
        customIcon: L.Icon
      ) => {
        markers.forEach((marker) => {
          const leafletMarker = L.marker(marker.position, {
            icon: customIcon,
          }).addTo(map);

          if (marker.popup) {
            leafletMarker.bindPopup(marker.popup);
          }

          if (marker.circle) {
            const circleOptions: CircleOptions = {
              radius: marker.circle.radius,
              color: marker.circle.color,
              fillColor: marker.circle.fillColor || marker.circle.color,
              fillOpacity: marker.circle.fillOpacity || 0.3,
              weight: 3,
              opacity: 0.8,
              interactive: false,
              pane: 'overlayPane',
            };

            L.circle(marker.position, circleOptions).addTo(map);
          }
        });
      };

      addMarkersAndCircles(markers, mapInstanceRef.current!, customIcon);

      setIsMapInitialized(true);

      if (flyToAnimation) {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
          const [entry] = entries;
          if (entry.isIntersecting && mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(center, zoom, {
              duration: 1.5,
              easeLinearity: 0.25,
            });

            mapInstanceRef.current.invalidateSize();

            setTimeout(() => {
              markers.forEach((marker) => {
                if (marker.popup) {
                  const popupMarkers = document.querySelectorAll(
                    '.leaflet-marker-icon'
                  );
                  popupMarkers.forEach((popupMarker, index) => {
                    if (index === 0) {
                      (popupMarker as HTMLElement).click();
                    }
                  });
                }
              });
            }, 1600);

            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        };

        observerRef.current = new IntersectionObserver(handleIntersection, {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        });

        if (mapRef.current) {
          observerRef.current.observe(mapRef.current);
        }
      } else {
        interface Marker {
          position: [number, number];
          popup?: string;
          circle?: {
            radius: number;
            color: string;
            fillColor?: string;
            fillOpacity?: number;
          };
        }

        const addPopupToFirstMarker = (
          markers: Marker[],
          mapInstance: LeafletMapType,
          customIcon: L.Icon
        ) => {
          markers.forEach((marker, index) => {
            if (marker.popup && index === 0) {
              const leafletMarker = L.marker(marker.position, {
                icon: customIcon,
              }).addTo(mapInstance);
              leafletMarker.openPopup();
            }
          });
        };

        addPopupToFirstMarker(markers, mapInstanceRef.current!, customIcon);
      }

      // Répéter invalidateSize à plusieurs intervalles
      const invalidateIntervals = [100, 500, 1000, 2000];
      invalidateIntervals.forEach((delay) => {
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, delay);
      });
    };

    loadMap().catch((error) => {
      console.error('Error while loading the map :', error);
    });

    // Ajouter un écouteur de redimensionnement
    window.addEventListener('resize', () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      // Nettoyer l'écouteur de redimensionnement
      window.removeEventListener('resize', () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
    };
  }, [center, zoom, markers, scrollWheelZoom, flyToAnimation]);

  return (
    <div
      ref={mapRef}
      className='h-full w-full overflow-hidden rounded-md'
      style={{ position: 'relative', touchAction: 'manipulation' }}
    >
      {!isMapInitialized && (
        <div className='flex h-full w-full items-center justify-center bg-gray-100'>
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default memo(LeafletMap);
