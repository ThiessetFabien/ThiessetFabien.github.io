/**
 * @file LocationEventsProps.tsx
 * @description This file contains the type definition for the props used in the LocationEvents component.
 */

/**
 * LocationEvents interface.
 * @typedef {Object} LocationEvents
 * @property {[number, number]} position - The position to fly to on the map.
 * @property {React.RefObject<HTMLDivElement>} [ref] - Optional ref for the component.
 * @example
 * const props: LocationEvents = { position: [50.381645, 3.053234] };
 */
export interface LocationEvents {
  position: [number, number];
  ref?: React.RefObject<HTMLDivElement>;
}
