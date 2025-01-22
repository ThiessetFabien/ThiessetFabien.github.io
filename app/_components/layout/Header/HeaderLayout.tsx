import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ToggleDarkMode } from '@/ui/ToggleDarkMode/ToggleDarkMode';
import { cnFlexBetweenX } from '@/styles/flexStyles';
import { cnTitle2, cnTitle2Size } from '@/styles/fontStyles';
import { cnPaddingX } from '@/styles/boxModelStyles';
import { ActionButton } from '@/components/ui/CallToAction/ActionButton';

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
export const Header: React.FC<{ className: string }> = ({ className }) => {
  return (
    <header className={className}>
      <div className={cn('mx-auto max-w-7xl', cnPaddingX, cnFlexBetweenX)}>
        <h2 className={cn(cnTitle2, cnTitle2Size, 'text-center')}>
          {'fab'.toUpperCase()}
          <span className='font-light'>{'uilds'.toUpperCase()}</span>
        </h2>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
