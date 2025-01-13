import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';
import { cnFlexBetweenX } from '@/styles/flexStyles';
import { cnTitle2, cnTitle2Size } from '@/styles/fontStyles';
import { cnPaddingX } from '@/styles/boxModelStyles';

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
  const titleUppercased = 'fab.craft'.toUpperCase();

  return (
    <header className={className}>
      <div className={cn('mx-auto max-w-7xl', cnPaddingX, cnFlexBetweenX)}>
        <Link
          href='/'
          className={cn(
            cnTitle2,
            cnTitle2Size,
            'pointer-events-auto text-center',
            'hover:underline'
          )}
        >
          <h1>{titleUppercased}</h1>
        </Link>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
