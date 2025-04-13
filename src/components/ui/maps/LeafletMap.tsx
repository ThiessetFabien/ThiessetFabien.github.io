import L, { type Map as LeafletMapType } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { memo, useEffect, useRef, useState } from 'react';

import { cn } from '@/src/lib/utils';
import { cnBorderRadiusMd } from '@/src/styles/border.style';
import { cnFlexFullCenter } from '@/src/styles/flex.style';
import { cnSizeFull } from '@/src/styles/size.style';
import { type LeafletMapProps } from '@/src/types/LeafletMapProps';

/**
 * LeafletMap component renders an interactive map using Leaflet.js.
 *
 * @param {LeafletMapProps} props - The properties for the LeafletMap component.
 * @param {[number, number]} [props.center=[50.3675, 3.0803]] - The initial center of the map.
 * @param {number} [props.zoom=9] - The initial zoom level of the map.
 * @param {Array<{ position: [number, number]; popup?: string }>} [props.markers] - Array of markers to display on the map.
 * @param {boolean} [props.scrollWheelZoom=false] - Enables or disables zooming with the scroll wheel.
 * @param {boolean} [props.flyToAnimation=true] - Enables or disables fly-to animation when the map is loaded.
 */
const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [50.3675, 3.0803],
  zoom = 8,
  markers = [
    {
      position: [50.381645, 3.053234],
      circle: {
        radius: 30000, // 30km approximativement pour 30 minutes en voiture
        color: '#4F46E5',
        fillColor: '#4F46E5',
        fillOpacity: 0.2,
        weight: 2,
      },
    },
  ],
  scrollWheelZoom = false,
  flyToAnimation = true,
}: LeafletMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMapType | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    const preloadTiles = async () => {
      const urls = [
        'https://a.tile.openstreetmap.org/4/8/5.png',
        'https://b.tile.openstreetmap.org/4/8/5.png',
        'https://c.tile.openstreetmap.org/4/8/5.png',
      ];

      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadTiles();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      L.Icon.Default.mergeOptions({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
      });
    }
  }, []);

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

      const isMobile = window.innerWidth < 768;
      const adjustedZoom = isMobile
        ? Math.max(initialZoom - 1, 4)
        : initialZoom;

      const map = L.map(mapRef.current as HTMLElement, {
        preferCanvas: true,
        attributionControl: true,
        zoomControl: true,
        scrollWheelZoom,
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
      })
        .on('tileload', function (event) {
          const tile = event.tile;
          if (tile && tile instanceof HTMLImageElement) {
            tile.setAttribute('loading', 'lazy');
            tile.setAttribute('decoding', 'async');

            if ('fetchPriority' in tile) {
              tile.fetchPriority = 'low';
            }
          }
        })
        .addTo(map);

      map.invalidateSize();

      // Ajouter d'abord les marqueurs
      markers.forEach((marker) => {
        L.marker(marker.position, {
          icon: customIcon,
        }).addTo(map);
      });

      // Puis ajouter explicitement le cercle de mobilité pour chaque marqueur
      markers.forEach((marker) => {
        if (marker.circle) {
          console.log(
            'Ajout du cercle à la position:',
            marker.position,
            'avec rayon:',
            marker.circle.radius
          );
          L.circle(marker.position, {
            radius: marker.circle.radius,
            color: marker.circle.color,
            fillColor: marker.circle.fillColor || marker.circle.color,
            fillOpacity: marker.circle.fillOpacity || 0.2,
            weight: marker.circle.weight || 3,
            opacity: 0.8,
            interactive: false,
          }).addTo(map);
        }
      });

      setIsMapInitialized(true);

      // Garantir que la carte est bien redimensionnée
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 500);

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
        // Interface déjà déclarée, pas besoin de la redéclarer ici
        // Désactivation complète de l'ouverture automatique des popups
        // const addPopupToFirstMarker = (
        //   markers: Marker[],
        //   mapInstance: LeafletMapType,
        //   customIcon: L.Icon
        // ) => {
        //   markers.forEach((marker, index) => {
        //     if (marker.popup && index === 0) {
        //       const leafletMarker = L.marker(marker.position, {
        //         icon: customIcon,
        //       }).addTo(mapInstance);
        //       leafletMarker.openPopup();
        //     }
        //   });
        // };
        //
        // addPopupToFirstMarker(markers, mapInstanceRef.current!, customIcon);
      }

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
      className={cn(cnSizeFull, cnBorderRadiusMd, 'overflow-hidden')}
      style={{ position: 'relative', touchAction: 'manipulation' }}
    >
      {!isMapInitialized && (
        <div className={cn(cnSizeFull, cnFlexFullCenter, 'bg-gray-100')}>
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
};

export default memo(LeafletMap);
