'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/lib/components/ui/toggle';
import { cn } from '@/lib/utils';

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
    <Toggle
      variant='outline'
      size='sm'
      onClick={handleToggle}
      className='relative'
      data-state={resolvedTheme === 'dark' ? 'on' : 'off'}
    >
      {resolvedTheme === 'dark' ? (
        <Moon
          className={cn(
            'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          )}
        />
      ) : (
        <Sun
          className={cn(
            'absolute rotate-90 scale-100 transition-all dark:rotate-0 dark:scale-0'
          )}
        />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Toggle>
  );
}
