'use client';

import Link from 'next/link';
import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';

/**
 * @file Header.tsx
 * @description This file exports a Header component that displays a navigation bar with a link to the home page and a dark mode toggle.
 */

/**
 * Header component.
 * @returns {JSX.Element} The rendered Header component.
 * @example
 * <Header />
 */

export const Header = () => {
  return (
    <header className='bg-background'>
      <div className='align-center m-auto flex h-full max-w-3xl items-center justify-between p-8'>
        <Link
          href='/'
          className='pointer-events-auto text-center font-caption text-2xl font-bold leading-tight tracking-tight'
        >
          FT
        </Link>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
