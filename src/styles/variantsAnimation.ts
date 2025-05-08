/**
 * Animation variants for icon rotation and scaling effects.
 * @description
 * This object defines various motion states for animated icons:
 * - `initial`: Starting state (hidden, no rotation)
 * - `animate`: Visible state (appears with scale animation)
 * - `exit`: Disappearing state (rotates 90° while scaling down)
 * - `rotate`: Special animation for 360° rotation
 *
 * Each state includes transition properties to control timing and easing.
 *
 * @example
 * ```tsx
 * import { motion } from 'framer-motion';
 * import { iconRotate } from './variantsAnimation';
 *
 * const AnimatedIcon = () => (
 *   <motion.div
 *     variants={iconRotate}
 *     initial="initial"
 *     animate="animate"
 *     exit="exit"
 *     whileHover="rotate"
 *   >
 *     <IconComponent />
 *   </motion.div>
 * );
 * ```
 */
export const containerScale = {
  initial: { opacity: 0.8 },
  hover: {
    scale: 1.05,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  animate: {
    transition: {
      duration: 0.2,
      times: [0, 0.6, 1],
      ease: ['easeInOut', 'easeOut'],
    },
  },
  tap: { scale: 0.8, transition: { duration: 0.1 } },
};

export const iconBounce = {
  initial: { y: -1 },
  hover: {
    y: [0, -5, 0, -3, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
};

/**
 * Animation variants for media (images and videos) in project cards.
 * @description
 * This object defines animation states for media content:
 * - `initial`: Starting state (slightly scaled down with reduced opacity)
 * - `animate`: Visible state (smooth fade in with slight scale up)
 * - `exit`: Disappearing state (fade out)
 * - `hover`: Hover effect (subtle scale and brightness increase)
 *
 * @example
 * ```tsx
 * import { motion } from 'framer-motion';
 * import { mediaFade } from './variantsAnimation';
 *
 * const AnimatedMedia = () => (
 *   <motion.div
 *     variants={mediaFade}
 *     initial="initial"
 *     animate="animate"
 *     exit="exit"
 *     whileHover="hover"
 *   >
 *     <Image src="/image.jpg" alt="Project" />
 *   </motion.div>
 * );
 * ```
 */
export const mediaFade = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  hover: {
    scale: 1.03,
    filter: 'brightness(1.05)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export const iconRotate = {
  initial: {
    rotate: 0,
    scale: 0,
  },
  animate: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  exit: {
    rotate: 90,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  rotate: {
    rotate: 360,
    transition: { duration: 0.5 },
  },
};

export const textShow = {
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: 'auto' },
  exit: { opacity: 0, width: 0 },
};
