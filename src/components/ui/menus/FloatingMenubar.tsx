'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState, useRef } from 'react';

import { Menubar, MenubarMenu } from '@/src/lib/components/ui/menubar';
import { cn } from '@/src/lib/utils';
import {
  cnBorder,
  cnBorderNone,
  cnBorderRadiusFull,
} from '@/src/styles/border.style';
import {
  cnGap,
  cnPadding,
  cnPaddingBottom,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import {
  cnFlexCenterX,
  cnFlexCenterY,
  cnFlexCol,
} from '@/src/styles/flex.style';
import { cnSmallText } from '@/src/styles/font.style';
import { cnSizeIcon } from '@/src/styles/size.style';
import { scrollToTop } from '@hooks/ScrollToTop.hook';
import { useIsLg } from '@src/styles/mediaQueries.style';
import { MenuItemProps } from '@src/types/MenuItemProps';
import { IconLoader } from '@ui/icons/IconLoader';
import { MobileMenu } from '@ui/sheet/MobileMenu';

/**
 * A floating menu bar component that provides navigation and action buttons.
 * Responsive design with different layouts for mobile and desktop.
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
  const lastScrollYRef = useRef(0);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleHover = useCallback((id: string | null) => {
    setHoveredItem(id);
  }, []);

  const handleScroll = useCallback(() => {
    if (!isMounted) return;

    const currentScrollY = window.scrollY;
    const shouldBeVisible = currentScrollY > 200;

    if (shouldBeVisible !== scrollTopVisible) {
      setScrollTopVisible(shouldBeVisible);
    }

    lastScrollYRef.current = currentScrollY;
  }, [isMounted, scrollTopVisible]);

  useEffect(() => {
    if (!isMounted) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    setScrollTopVisible(window.scrollY > 200);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, handleScroll]);

  if (!isMounted) return null;

  const menuItemsMobile = items.filter(
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

  const menuItemsTabletteAndDesktop = items.filter(
    (item) => item.id !== 'scrollTop'
  );

  const positionClasses = !IsLg
    ? cn(
        'fixed w-full left-0 right-0 bottom-0 z-50 px-6',
        cnPaddingBottom,
        cnFlexCenterX
      )
    : 'fixed h-content left-8 top-1/2 -translate-y-1/2 z-50';

  const menubarClasses = !IsLg
    ? cn(
        cnPadding,
        cnGap,
        cnBorderRadiusFull,
        cnBorder,
        'flex justify-around backdrop-blur-md bg-background/80'
      )
    : cn(
        cnFlexCol,
        cnSmallSpaceY,
        cnBorderNone,
        cnBorderRadiusFull,
        'bg-transparent',
        'h-content'
      );

  return (
    <AnimatePresence>
      <div
        className={cn(positionClasses, className)}
        role='navigation'
        aria-label='Navigation flottante'
      >
        {!IsLg ? (
          <Menubar className={menubarClasses}>
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
          <Menubar className={menubarClasses}>
            {menuItemsTabletteAndDesktop.map((item) => (
              <MenubarMenu key={item.id}>
                <div
                  className='relative flex w-full items-baseline'
                  onMouseEnter={() => handleHover(item.id)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <a
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    onClick={item.onClick}
                    className={cn(
                      cnFlexCenterY,
                      cnBorderRadiusFull,
                      cnBorder,
                      'relative aspect-square h-8 w-8 flex-nowrap bg-background/80 p-0 backdrop-blur-md transition-all',
                      hoveredItem === item.id &&
                        'w-auto bg-transparent hover:bg-accent/80 hover:text-accent-foreground'
                    )}
                    aria-label={item.label}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center',
                        hoveredItem === item.id ? 'h-full w-8' : 'h-full w-full'
                      )}
                    >
                      <IconLoader
                        icon={item.icon}
                        className={cnSizeIcon}
                        aria-hidden='true'
                      />
                    </div>

                    {hoveredItem === item.id && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          opacity: { delay: 0.15, duration: 0.15 },
                        }}
                        className={cn(
                          'overflow-hidden whitespace-nowrap pr-1',
                          cnSmallText
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </a>
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
