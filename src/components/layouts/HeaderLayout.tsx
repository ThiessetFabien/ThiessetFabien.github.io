import { ToggleDarkMode } from '@/src/components/ui/toggles/DarkModeToggle';
import { cnPaddingX } from '@/src/styles/boxModel.style';
import { cnFlexBetweenX } from '@/src/styles/flex.style';
import { cnTitle2, cnTitle2Size } from '@/src/styles/font.style';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

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
export const Header: React.FC<{ className?: CardProps['className'] }> = ({
  className,
}) => {
  return (
    <header className={className} aria-label='Main header'>
      <nav
        className={cn('mx-auto max-w-7xl', cnPaddingX, cnFlexBetweenX)}
        aria-label='Main navigation'
      >
        <h2 className={cn(cnTitle2, cnTitle2Size, 'text-center')}>
          {'fab'.toUpperCase()}
          <span className='font-light'>{'uilds'.toUpperCase()}</span>
        </h2>
        <ToggleDarkMode aria-label='Toggle dark mode' />
      </nav>
    </header>
  );
};
