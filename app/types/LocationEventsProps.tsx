/**
 * @file LocationEventsProps.tsx
 * @description This file contains the type definition for the props used in the LocationEvents component.
 */

/**
 * LocationEventsProps type.
 * @typedef {Object} LocationEventsProps
 * @property {[number, number]} position - The position to fly to on the map.
 * @property {React.RefObject<HTMLDivElement>} [ref] - Optional ref for the component.
 */

export interface LocationEventsMapProps {
  position: [number, number];
  ref?: React.RefObject<HTMLDivElement>;
}
