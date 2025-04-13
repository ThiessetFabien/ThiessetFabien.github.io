/**
 * Type pour les marqueurs sur la carte
 */
export interface MapMarker {
  position: [number, number];
  popup?: string;
  circle?: {
    radius: number;
    color: string;
    fillColor?: string;
    fillOpacity?: number;
    weight?: number;
  };
}

/**
 * Interface representing the properties for a Leaflet map component.
 */
export interface LeafletMapProps {
  /**
   * The geographical center of the map, specified as a tuple of latitude and longitude.
   * @example [48.8566, 2.3522] // Coordinates for Paris, France
   */
  center?: [number, number];

  /**
   * The initial zoom level of the map.
   * @example 13
   */
  zoom?: number;

  /**
   * An array of marker objects to be displayed on the map.
   * Each marker includes a position and an optional popup text.
   * @example
   * [
   *   { position: [48.8566, 2.3522], popup: "Paris" },
   *   { position: [51.5074, -0.1278], popup: "London" }
   * ]
   */
  markers?: MapMarker[];

  /**
   * Whether the map should allow zooming with the mouse scroll wheel.
   * @default false
   */
  scrollWheelZoom?: boolean;

  /**
   * Whether the map should use a smooth animation when flying to a new location.
   * @default false
   */
  flyToAnimation?: boolean;
}
