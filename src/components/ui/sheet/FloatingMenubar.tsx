'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState, useRef } from 'react';

import { scrollToTop } from '@hooks/ScrollToTop.hook';
import { useActiveSection } from '@hooks/useActiveSection.hook';
import { MobileMenu } from '@src/components/ui/sheet/MobileMenu';
import {
  menuItemsMobile,
  menuItemsTabletteAndDesktop,
} from '@src/config/menuItems.config';
import { NoSSR } from '@src/hooks/useIsClient.hook';
import { Menubar, MenubarMenu } from '@src/lib/components/ui/menubar';
import { cn } from '@src/lib/utils';
import {
  cnBorder,
  cnBorderNone,
  cnBorderRadiusFull,
} from '@src/styles/border.style';
import {
  cnGap,
  cnLeftCenterPosition,
  cnPaddingBottom,
  cnPaddingX,
  cnSmallPadding,
  cnSmallSpaceY,
} from '@src/styles/boxModel.style';
import {
  cnFlexCenterX,
  cnFlexCenterY,
  cnFlexCol,
  cnFlexFullCenter,
} from '@src/styles/flex.style';
import { cnSmallText } from '@src/styles/font.style';
import { useIsLg } from '@src/styles/mediaQueries.style';
import { containerScale, textShow } from '@src/styles/variantsAnimation';
import type { MenuItemProps } from '@src/types/MenuItemProps';
import { IconLoader } from '@src/components/ui/icons/IconLoader';

interface FloatingMenubarProps {
  items: MenuItemProps[];
}

/**
 * FloatingMenubar component provides a responsive navigation menu.
 * It adapts to different screen sizes and includes hover effects, active state detection, and scroll-to-top functionality.
 *
 * @param {FloatingMenubarProps} props - Component props.
 * @returns {JSX.Element | null} The rendered FloatingMenubar component.
 */
export const FloatingMenubar: React.FC<FloatingMenubarProps> = ({
  items,
}: FloatingMenubarProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const IsLg = useIsLg();
  const lastScrollYRef = useRef(0);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const { activeSection } = useActiveSection();

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

  const handleItemClick = (item: MenuItemProps) => {
    // Exécuter la fonction onClick si elle existe
    if (item.onClick) {
      item.onClick();
    }

    // Gérer les sous-menus - les ouvrir ou les fermer
    if (item.items && item.items.length > 0) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
    } else {
      setActiveSubmenu(null);
    }
  };

  /**
   * Détermine si un élément de menu est actif en fonction de l'URL actuelle
   * @param item - L'élément de menu à vérifier
   * @returns true si l'élément correspond à la section active
   */
  const isItemActive = (item: MenuItemProps): boolean => {
    if (item.href?.includes('#')) {
      const sectionId = item.href.replace('#', '');
      return sectionId === activeSection;
    }
    return false;
  };

  const menuMobile = menuItemsMobile(items);

  const menuTabletteAndDesktop = menuItemsTabletteAndDesktop(items);

  const cnPosition = !IsLg
    ? cn(
        'fixed w-full left-0 right-0 bottom-0 z-50',
        cnPaddingX,
        cnPaddingBottom,
        cnFlexCenterX
      )
    : cn(cnLeftCenterPosition, 'fixed h-content z-50 left-5');

  const cnMenubar = !IsLg
    ? cn(
        cnSmallPadding,
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
        className={cnPosition}
        role='navigation'
        aria-label='Floating navigation'
      >
        {!IsLg ? (
          <Menubar className={cnMenubar}>
            <NoSSR>
              <MobileMenu items={items} />
            </NoSSR>
            {menuMobile.map((item) => (
              <NoSSR key={item.id}>
                <a
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className={cn(
                    cnFlexCenterY,
                    'transition-colors duration-200',
                    isItemActive(item) && 'text-primary'
                  )}
                  aria-label={item.label}
                  aria-current={isItemActive(item) ? 'page' : undefined}
                >
                  <IconLoader icon={item.icon} />
                </a>
              </NoSSR>
            ))}
            {scrollTopVisible && (
              <NoSSR>
                <button
                  onClick={scrollToTop}
                  type='button'
                  className={cn(
                    cnFlexCenterY,
                    'transition-colors duration-200'
                  )}
                  aria-label='Scroll to top'
                >
                  <IconLoader icon='ChevronsUp' />
                </button>
              </NoSSR>
            )}
          </Menubar>
        ) : (
          <Menubar className={cnMenubar}>
            {menuTabletteAndDesktop.map((item) => (
              <MenubarMenu key={item.id}>
                <NoSSR>
                  <motion.div
                    variants={containerScale}
                    initial='initial'
                    whileHover='hover'
                    whileTap='tap'
                    className='relative flex w-full items-center justify-start'
                    onMouseEnter={() => handleHover(item.id)}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <a
                      href={item.href}
                      target={item.target}
                      rel={item.rel}
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        cnFlexCenterY,
                        cnBorderRadiusFull,
                        cnBorder,
                        'relative aspect-square h-10 w-10 flex-nowrap bg-background/80 backdrop-blur-md transition-all',
                        isItemActive(item) &&
                          'bg-accent text-accent-foreground',
                        hoveredItem === item.id &&
                          'bg-transparent hover:bg-accent/80 hover:text-accent-foreground',
                        hoveredItem === item.id && 'w-auto max-w-[250px]'
                      )}
                      aria-label={item.label}
                      aria-current={isItemActive(item) ? 'page' : undefined}
                    >
                      <div
                        className={cn(
                          cnFlexFullCenter,
                          hoveredItem === item.id
                            ? 'h-full w-10 min-w-10'
                            : 'h-full w-full'
                        )}
                      >
                        <IconLoader icon={item.icon} />
                      </div>

                      {hoveredItem === item.id && (
                        <motion.span
                          variants={textShow}
                          initial='initial'
                          animate='animate'
                          exit='exit'
                          transition={{
                            duration: 0.3,
                            opacity: { delay: 0.15, duration: 0.15 },
                          }}
                          className={cn(
                            'overflow-hidden whitespace-nowrap px-3 pr-4',
                            cnSmallText
                          )}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </a>
                  </motion.div>
                </NoSSR>
              </MenubarMenu>
            ))}
          </Menubar>
        )}
      </div>
    </AnimatePresence>
  );
};

export default FloatingMenubar;
