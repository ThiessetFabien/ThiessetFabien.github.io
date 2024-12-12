'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';
import { cnFlexBetweenX } from '@/styles/flexStyles';
import { cnTitle1 } from '@/styles/fontStyles';

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
    <header className={cn(cnFlexBetweenX, 'h-full', className)}>
      <Link
        href='/'
        className={cn(cnTitle1, 'pointer-events-auto text-center')}
      >
        FT
      </Link>
      <ToggleDarkMode />
    </header>
  );
};
