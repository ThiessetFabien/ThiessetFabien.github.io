'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/lib/components/ui/toggle';
import { cn } from '@/lib/utils';
import { sizeIcon } from '@/styles/sizeStyles';

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
      <Moon
        className={cn(
          sizeIcon,
          'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
        )}
      />
      <Sun
        className={cn(
          sizeIcon,
          'absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
        )}
      />
      <span className='sr-only'>Toggle theme</span>
    </Toggle>
  );
}
