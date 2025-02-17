import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cnSmallText } from '@/src/styles/font.style';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@lib/components/ui/hover-card';
import { Toggle } from '@lib/components/ui/toggle';

import { cn } from '@lib/utils';

/**
 * @file ToggleDarkMode.tsx
 * @description This file exports a component that toggles between dark and light modes using the next-themes library.
 */

/**
 * ToggleDarkMode component.
 * @returns {JSX.Element} The rendered component.
 * @example
 * <ToggleDarkMode />
 */

export function ToggleDarkMode() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.8 }}
        >
          <Toggle
            variant='outline'
            size='sm'
            onClick={handleToggle}
            className='relative rounded-full'
            data-state={resolvedTheme === 'dark' ? 'on' : 'off'}
          >
            {resolvedTheme === 'dark' ? (
              <Sun
                className={cn(
                  resolvedTheme === 'dark'
                    ? 'rotate-0 scale-100 transition-all duration-200'
                    : 'rotate-90 scale-0 transition-all duration-200'
                )}
              />
            ) : (
              <Moon
                className={cn(
                  resolvedTheme === 'dark'
                    ? '-rotate-90 scale-0 transition-all duration-200'
                    : 'rotate-0 scale-100 transition-all duration-200'
                )}
              />
            )}
            <span className='sr-only'>Toggle theme</span>
          </Toggle>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className={cn(cnSmallText, 'w-auto')}>
          {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
