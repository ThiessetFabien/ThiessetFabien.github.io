import { motion } from 'framer-motion';

/**
 * A React functional component that renders a blinking cursor using Framer Motion.
 *
 * The cursor is represented as a vertical bar (`|`) and uses motion animations
 * to create a blinking effect by toggling its opacity between 0 and 1.
 *
 * @component
 * @returns {JSX.Element} The animated cursor component.
 *
 * @remarks
 * - The `motion.span` element is styled with a bold font and a primary text color.
 * - The animation repeats infinitely with a reverse pattern and a duration of 0.5 seconds.
 *
 * @requires framer-motion
 *
 * @example
 * ```tsx
 * import { Cursor } from './Cursor';
 *
 * const App = () => (
 *   <div>
 *     <Cursor />
 *   </div>
 * );
 * ```
 */
export const Cursor = (): JSX.Element => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 0.5,
    }}
    className='whitespace-nowrap font-bold text-primary'
  >
    {' '}
    |
  </motion.span>
);
