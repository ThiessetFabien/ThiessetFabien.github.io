/**
 * MobileMenu component that provides a sliding navigation drawer for mobile devices.
 * The component uses the Sheet component from the UI library to create a drawer that slides in from the left.
 *
 * Features:
 * - Manages its own open/close state
 * - Automatically closes when a navigation link is clicked
 * - Includes motion animations on hover and tap
 * - Accessible with proper ARIA attributes
 *
 * @param {Object} props - The component props
 * @param {MenuItemProps[]} props.items - Array of menu items to display in the navigation
 * @returns {JSX.Element} A mobile navigation menu component
 */
import { motion } from 'framer-motion';
import { useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@src/lib/components/ui/sheet';
import { cn } from '@src/lib/utils';
import { cnBorderRadiusMd } from '@src/styles/border.style';
import { cnPaddingTop, cnSpaceX, cnSpaceY } from '@src/styles/boxModel.style';
import { cnFlexCenterY, cnFlexCol } from '@src/styles/flex.style';
import { cnSmallText, cnTitle3 } from '@src/styles/font.style';
import type { MenuItemProps } from '@src/types/MenuItemProps';

import { IconLoader } from '@src/components/ui/icons/IconLoader';

export const MobileMenu = ({ items }: { items: MenuItemProps[] }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          cnFlexCenterY,
          cnBorderRadiusMd,
          'transition-colors duration-200'
        )}
        aria-label='Ouvrir le menu de navigation'
      >
        <IconLoader icon='Menu' />
      </SheetTrigger>
      <SheetContent side='left' className='w-[90%]'>
        <SheetTitle className={cnTitle3}>Navigation</SheetTitle>
        <div className='sr-only'>
          <SheetDescription>
            Menu de navigation permettant d&apos;accéder aux différentes
            sections du site
          </SheetDescription>
        </div>
        <style jsx global>{`
          ${open
            ? 'body { overflow: hidden; } .leaflet-container { pointer-events: none; }'
            : ''}
        `}</style>
        <nav
          aria-label='Navigation principale'
          className={cn(cnFlexCol, cnSpaceY, cnPaddingTop)}
        >
          {items.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
            >
              <a
                href={item.href}
                target={item.target}
                rel={item.rel}
                onClick={handleLinkClick}
                className={cn(
                  cnFlexCenterY,
                  cnSpaceX,
                  cnBorderRadiusMd,
                  cnSmallText,
                  'group p-2 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground'
                )}
                aria-label={item.label}
              >
                <IconLoader icon={item.icon} />
                <span>{item.label}</span>
              </a>
            </motion.div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
