import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Toggle } from '@lib/components/ui/toggle';
import { cn } from '@src/lib/utils';
import { cnBorderNone, cnBorderRadiusFull } from '@src/styles/border.style';
import { cnSizeIcon } from '@src/styles/size.style';
import { containerScale, iconRotate } from '@src/styles/variantsAnimation';

/**
 * A component that allows users to toggle between dark and light themes.
 * It uses the `next-themes` library to manage the theme state and ensures the component is only rendered on the client side.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element | null} The rendered component or null if not mounted.
 */
export function ToggleDarkMode({
  className,
}: {
  className?: string;
}): JSX.Element | null {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    setIsRotating(true);
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <motion.div
      initial='initial'
      whileHover='hover'
      whileTap='tap'
      variants={containerScale}
      className={className}
    >
      <Toggle
        variant='outline'
        size='sm'
        onClick={handleToggle}
        className={cn(
          'relative h-10 w-10 bg-accent px-0',
          cnBorderRadiusFull,
          cnBorderNone
        )}
        data-state={resolvedTheme === 'dark' ? 'on' : 'off'}
      >
        <AnimatePresence mode='wait'>
          {resolvedTheme === 'dark' ? (
            <motion.div
              key='sun'
              variants={iconRotate}
              initial='initial'
              animate={isRotating ? 'animate' : ['animate', 'rotate']}
              exit='exit'
            >
              <Sun className={cnSizeIcon} />
            </motion.div>
          ) : (
            <motion.div
              key='moon'
              variants={iconRotate}
              initial='initial'
              animate={isRotating ? ['animate', 'rotate'] : 'animate'}
              exit='exit'
            >
              <Moon className={cnSizeIcon} />
            </motion.div>
          )}
        </AnimatePresence>
        <span className='sr-only'>Toggle theme</span>
      </Toggle>
    </motion.div>
  );
}
