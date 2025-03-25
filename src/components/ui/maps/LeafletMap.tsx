import { type Map as LeafletMapType } from 'leaflet';
import React, { memo, useEffect, useRef, useState } from 'react';

// Options pour personnaliser la carte
interface LeafletMapProps {
  center?: [number, number]; // Coordonnées du centre de la carte
  zoom?: number; // Niveau de zoom initial
  markers?: Array<{
    // Liste des marqueurs à afficher
    position: [number, number];
    popup?: string;
    circle?: {
      radius: number;
      color: string;
      fillColor?: string;
      fillOpacity?: number;
    };
  }>;
  scrollWheelZoom?: boolean; // Activer/désactiver le zoom à la molette
  flyToAnimation?: boolean; // Activer/désactiver l'animation flyTo
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [50.3675, 3.0803],
  zoom = 9,
  markers = [
    {
      position: [50.381645, 3.053234],
      popup: 'I code here every day !',
      circle: {
        radius: 30000,
        color: '#22c55e',
        fillColor: '#22c55e',
        fillOpacity: 0.3,
      },
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

    // Import dynamique de Leaflet seulement côté client
    const loadMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (mapInstanceRef.current) return;

      // Définir les icônes personnalisées
      const customIcon = new L.Icon({
        iconUrl: '/images/leaflet/marker-icon.png',
        iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
        shadowUrl: '/images/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Commence avec une vue sur la France entière
      const francePosition: [number, number] = [46.6034, 3.1236];
      const initialZoom = flyToAnimation ? 5 : zoom;
      const initialCenter = flyToAnimation ? francePosition : center;

      // Initialiser la carte
      const map = L.map(mapRef.current as HTMLElement, {
        preferCanvas: true,
        attributionControl: true, // Activez pour vérifier que la carte se charge
        zoomControl: true,
        scrollWheelZoom,
      }).setView(initialCenter, initialZoom);

      mapInstanceRef.current = map;

      // Ajout des tuiles avec options de performance
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // Augmentez le zoom maximal
        tileSize: 256, // Utilisez la taille standard de tuile
        zoomOffset: 0, // Réinitialisez l'offset
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Recalculer la taille après le rendu
      map.invalidateSize();

      console.log('Initialisation de la carte terminée');

      // Ajouter les marqueurs et cercles
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
          console.log("Ajout d'un marqueur à la position:", marker.position);

          const leafletMarker = L.marker(marker.position, {
            icon: customIcon,
          }).addTo(map);

          if (marker.popup) {
            leafletMarker.bindPopup(marker.popup);
          }

          if (marker.circle) {
            console.log("Ajout d'un cercle avec rayon:", marker.circle.radius);

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

      // Si l'animation flyTo est activée, configurer l'observateur d'intersection
      if (flyToAnimation) {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
          const [entry] = entries;
          if (entry.isIntersecting && mapInstanceRef.current) {
            console.log("La carte est visible, démarrage de l'animation flyTo");

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

        interface CustomIcon extends L.Icon {}

        const addPopupToFirstMarker = (
          markers: Marker[],
          mapInstance: LeafletMapType,
          customIcon: CustomIcon
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

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 500);
    };

    loadMap().catch((error) => {
      console.error('Erreur lors du chargement de la carte:', error);
    });

    // Nettoyage
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [center, zoom, markers, scrollWheelZoom, flyToAnimation]);

  return (
    <div
      ref={mapRef}
      className='h-[400px] w-full overflow-hidden rounded-md'
      style={{ position: 'relative' }}
    >
      {!isMapInitialized && (
        <div className='flex h-full w-full items-center justify-center bg-gray-100'>
          <p>Chargement de la carte...</p>
        </div>
      )}
    </div>
  );
};

export default memo(LeafletMap);
