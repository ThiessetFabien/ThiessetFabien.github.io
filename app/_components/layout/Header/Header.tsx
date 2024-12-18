'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';

/**
 * @file Header.tsx
 * @description This file exports a Header component that displays a navigation bar with a link to the home page and a dark mode toggle.
 */

/**
 * Header component.
 * @param {Object} props - The props for the component.
 * @param {string} [props.className] - Additional class names to apply to the header.
 * @returns {JSX.Element} The rendered Header component.
 * @example
 * <Header className="custom-class" />
 */
export const Header: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <header className={cn(className)}>
      <div className='align-center m-auto flex h-full items-center justify-between p-6'>
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
