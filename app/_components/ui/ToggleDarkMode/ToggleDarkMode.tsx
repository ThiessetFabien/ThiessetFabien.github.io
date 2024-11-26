'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

export function ToggleDarkMode() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Toggle
      variant='outline'
      size='default'
      onClick={handleToggle}
      className='relative'
      data-state={theme === 'dark' ? 'on' : 'off'}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    </Toggle>
  );
}
