'use client';

import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from '@/src/lib/components/ui/menubar';
import { cn } from '@/src/lib/utils';
import { cnBorderRadiusMd } from '@/src/styles/border.style';
import {
  cnGap,
  cnPaddingBottom,
  cnPaddingX,
  cnSmallMarginLeft,
  cnSmallPadding,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import {
  cnFlexCenterX,
  cnFlexCenterY,
  cnFlexCol,
} from '@/src/styles/flex.style';
import { cnHiddenLgInline } from '@/src/styles/hideItem.style';
import { cnSizeIcon } from '@/src/styles/size.style';
import { scrollToTop } from '@hooks/ScrollToTop.hook';
import { useIsLg } from '@src/styles/mediaQueries.style';
import { MenuItemProps } from '@src/types/MenuItemProps';
import { IconLoader } from '@ui/icons/IconLoader';
import { MobileMenu } from '@ui/sheet/MobileMenu';

/**
 * A floating menu bar component that provides navigation and action buttons.
 * Responsive design with different layouts for mobile and desktop.
 *
 * @param {FloatingMenubarProps} props - The component props
 * @returns {JSX.Element | null} The rendered component or null if not mounted
 */
export const FloatingMenubar = ({
  items,
  className,
}: {
  items: MenuItemProps[];
  className?: string;
}): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const IsLg = useIsLg();

  // Reference for scroll tracking
  const lastScrollYRef = useRef(0);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Hover handler function
  const handleHover = useCallback((id: string | null) => {
    setHoveredItem(id);
  }, []);

  // Handle scroll-to-top button visibility
  const handleScroll = useCallback(() => {
    if (!isMounted) return;

    const currentScrollY = window.scrollY;
    // Only update state if condition has changed
    const shouldBeVisible = currentScrollY > 200;

    if (shouldBeVisible !== scrollTopVisible) {
      setScrollTopVisible(shouldBeVisible);
    }

    lastScrollYRef.current = currentScrollY;
  }, [isMounted, scrollTopVisible]);

  useEffect(() => {
    if (!isMounted) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initially check scroll position without calling handler
    const initialScrollY = window.scrollY;
    setScrollTopVisible(initialScrollY > 200);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, handleScroll]);

  if (!isMounted) {
    return null;
  }

  // Dynamically add scrollTop button to existing items
  const menuItemsMobile: MenuItemProps[] = items.filter(
    (item) =>
      ![
        'services',
        'about',
        'portfolio',
        'experience',
        'resume',
        'motivation',
      ].includes(item.id)
  );

  const menuItemsTabletteAndDesktop: MenuItemProps[] = items.filter(
    (item) => item.id !== 'scrollTop'
  );

  const positionClasses = IsLg
    ? 'fixed h-content left-8 top-1/2 -translate-y-1/2 z-50'
    : cn(
        'fixed w-full left-0 right-0 bottom-0 z-50 px-6',
        cnPaddingBottom,
        cnFlexCenterX
      );

  const menubarClasses = IsLg
    ? cn(
        cnFlexCol,
        cnSmallSpaceY,
        cnPaddingX,
        'backdrop-blur-md bg-background/90 rounded-lg border shadow-lg h-content'
      )
    : cn(
        cnSmallPadding,
        cnGap,
        'flex justify-around backdrop-blur-md border bg-background/90'
      );

  return (
    <AnimatePresence>
      <div
        className={cn(positionClasses, className)}
        role='navigation'
        aria-label='Navigation flottante'
      >
        {!IsLg ? (
          <Menubar className={cn(menubarClasses)}>
            <MobileMenu items={items} />
            {menuItemsMobile.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className={cnFlexCenterY}
                aria-label={item.label}
              >
                <IconLoader
                  icon={item.icon}
                  className={cnSizeIcon}
                  aria-hidden='true'
                />
              </a>
            ))}
            {scrollTopVisible && (
              <button
                onClick={scrollToTop}
                className={cnFlexCenterY}
                aria-label='Revenir en haut de la page'
              >
                <IconLoader
                  icon='ChevronsUp'
                  className={cnSizeIcon}
                  aria-hidden='true'
                />
              </button>
            )}
          </Menubar>
        ) : (
          <Menubar className={cn(menubarClasses)}>
            {menuItemsTabletteAndDesktop.map((item) => (
              <MenubarMenu key={item.id}>
                <div
                  className='relative flex'
                  onMouseEnter={() => handleHover(item.id)}
                  onMouseLeave={() => handleHover(null)}
                >
                  {item.href ? (
                    <MenubarTrigger asChild onClick={item.onClick}>
                      <motion.a
                        href={item.href}
                        target={item.target}
                        rel={item.rel}
                        className={cn(
                          cnSmallPadding,
                          cnFlexCenterY,
                          cnBorderRadiusMd,
                          'transition-all',
                          'hover:bg-accent/80 hover:text-accent-foreground hover:backdrop-blur-none'
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={item.label}
                      >
                        <IconLoader
                          icon={item.icon}
                          className={cnSizeIcon}
                          aria-hidden='true'
                        />
                        <AnimatePresence mode='wait'>
                          {(hoveredItem === item.id || !IsLg) && (
                            <span className={cn(cnHiddenLgInline)}>
                              {item.id === 'scrollTop' ? (
                                <span
                                  className={cn(
                                    cnSmallMarginLeft,
                                    'whitespace-nowrap'
                                  )}
                                >
                                  {item.label}
                                </span>
                              ) : (
                                <motion.span
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: 'auto', opacity: 1 }}
                                  exit={{ width: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className={cn(
                                    cnSmallMarginLeft,
                                    'overflow-hidden whitespace-nowrap'
                                  )}
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </span>
                          )}
                        </AnimatePresence>
                      </motion.a>
                    </MenubarTrigger>
                  ) : (
                    <MenubarTrigger
                      className={cn(
                        cnSmallPadding,
                        cnFlexCenterY,
                        cnBorderRadiusMd,
                        'transition-all',
                        'hover:bg-accent/80 hover:text-accent-foreground hover:backdrop-blur-none'
                      )}
                      onClick={item.onClick}
                      aria-label={item.label}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={cnFlexCenterY}
                      >
                        <IconLoader
                          icon={item.icon}
                          className={cnSizeIcon}
                          aria-hidden='true'
                        />
                        {(hoveredItem === item.id || !IsLg) && (
                          <AnimatePresence>
                            <motion.span
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: 'auto', opacity: 1 }}
                              exit={{ width: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={cn(
                                cnSmallMarginLeft,
                                'overflow-hidden whitespace-nowrap'
                              )}
                            >
                              <span className={cn(cnHiddenLgInline)}>
                                {item.label}
                              </span>
                            </motion.span>
                          </AnimatePresence>
                        )}
                      </motion.div>
                    </MenubarTrigger>
                  )}
                </div>
              </MenubarMenu>
            ))}
          </Menubar>
        )}
      </div>
    </AnimatePresence>
  );
};

export default FloatingMenubar;
