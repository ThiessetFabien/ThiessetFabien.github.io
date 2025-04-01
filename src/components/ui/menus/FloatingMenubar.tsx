'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  ClipboardList,
  GalleryHorizontal,
  Home,
  PenTool,
  User,
} from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from '@/src/lib/components/ui/menubar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/src/lib/components/ui/sheet';
import { cn } from '@/src/lib/utils';
import {
  cnGap,
  cnPaddingBottom,
  cnPaddingX,
  cnSmallPadding,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import { cnFlexCenterY, cnFlexCol } from '@/src/styles/flex.style';
import { scrollToTop } from '@hooks/ScrollToTop.hook';
import { useIsMobile, useIsTablet } from '@src/hooks/useMediaQuery.hook';
import { IconLoader } from '@ui/icons/IconLoader';

/**
 * Interface for menu item properties
 */
interface MenuItemType {
  id: string;
  icon: string;
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  disabled?: boolean;
  items?: {
    id: string;
    label: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
  }[];
}

/**
 * Props for the FloatingMenubar component
 */
interface FloatingMenubarProps {
  items: MenuItemType[];
  className?: string;
}

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
}: FloatingMenubarProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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
  const menuItemsWithScrollTop: (
    | MenuItemType
    | {
        id: string;
        icon: string;
        onClick: () => void;
        label: string;
        href: string;
        target?: string;
        rel?: string;
      }
  )[] = [
    ...items,
    ...(scrollTopVisible
      ? [
          {
            id: 'scrollTop',
            icon: 'ChevronsUp',
            label: 'Scroll to Top',
            onClick: scrollToTop,
            href: '',
          },
        ]
      : []),
  ];

  const positionClasses = isMobile
    ? cn('fixed left-0 right-0 bottom-0 z-50 px-6', cnPaddingBottom)
    : 'fixed left-4 top-1/2 z-50';

  const menubarClasses = isMobile
    ? cn(
        cnSmallPadding,
        cnGap,
        'flex justify-around backdrop-blur-md border bg-background/90'
      )
    : cn(
        cnFlexCol,
        cnSmallSpaceY,
        cnPaddingX,
        'backdrop-blur-md bg-background/90 rounded-lg border shadow-lg'
      );

  // Mobile menu component
  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger
        className={cn(cnFlexCenterY, 'rounded-md transition-all')}
        aria-label='Ouvrir le menu de navigation'
      >
        <IconLoader
          icon='Menu'
          className='h-4 w-4 flex-shrink-0'
          aria-hidden='true'
        />
      </SheetTrigger>
      <SheetContent side='left'>
        <nav
          aria-label='Navigation principale'
          className='flex flex-col space-y-4 pt-8'
        >
          <Link href='/' className='flex items-center gap-2'>
            <Home className='h-4 w-4' aria-hidden='true' />
            <span>Accueil</span>
          </Link>
          <Link href='/about' className='flex items-center gap-2'>
            <User className='h-4 w-4' aria-hidden='true' />
            <span>À propos</span>
          </Link>
          <Link href='/portfolio' className='flex items-center gap-2'>
            <GalleryHorizontal className='h-4 w-4' aria-hidden='true' />
            <span>Portfolio</span>
          </Link>
          <Link href='/experiences' className='flex items-center gap-2'>
            <BriefcaseBusiness className='h-4 w-4' aria-hidden='true' />
            <span>Expériences</span>
          </Link>
          <Link href='/cv' className='flex items-center gap-2'>
            <ClipboardList className='h-4 w-4' aria-hidden='true' />
            <span>CV</span>
          </Link>
          <Link href='/motivation' className='flex items-center gap-2'>
            <PenTool className='h-4 w-4' aria-hidden='true' />
            <span>Motivation</span>
          </Link>
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href || '#'}
              target={item.target}
              rel={item.rel}
              className='flex items-center gap-2'
              aria-label={item.label}
            >
              <IconLoader
                icon={item.icon}
                className='h-4 w-4'
                aria-hidden='true'
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <AnimatePresence>
      <div
        className={cn(positionClasses, 'flex w-full justify-center', className)}
        role='navigation'
        aria-label='Navigation flottante'
      >
        {isMobile ? (
          <Menubar className={cn(menubarClasses, cnGap)}>
            <MobileMenu />
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href || '#'}
                target={item.target}
                rel={item.rel}
                className='flex items-center gap-2'
                aria-label={item.label}
              >
                <IconLoader
                  icon={item.icon}
                  className='h-4 w-4'
                  aria-hidden='true'
                />
              </Link>
            ))}
            {scrollTopVisible && (
              <button
                onClick={scrollToTop}
                className='flex items-center'
                aria-label='Revenir en haut de la page'
              >
                <IconLoader
                  icon='ChevronsUp'
                  className='h-4 w-4'
                  aria-hidden='true'
                />
              </button>
            )}
          </Menubar>
        ) : (
          <Menubar className={cn(menubarClasses)}>
            {menuItemsWithScrollTop.map((item) => (
              <MenubarMenu key={item.id}>
                <div
                  className='relative flex items-center'
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
                          'rounded-md transition-all',
                          'hover:bg-accent/80 hover:text-accent-foreground hover:backdrop-blur-none',
                          item.id === 'scrollTop' && 'hover:animate-pulse'
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={
                          item.id !== 'scrollTop'
                            ? undefined
                            : { scale: 1, opacity: 1 }
                        }
                        aria-label={item.label}
                      >
                        <IconLoader
                          icon={item.icon}
                          className='h-4 w-4 flex-shrink-0'
                          aria-hidden='true'
                        />
                        <AnimatePresence mode='wait'>
                          {(hoveredItem === item.id || isTablet) && (
                            <span className='hidden lg:inline'>
                              {item.id === 'scrollTop' ? (
                                <span className='ml-2 whitespace-nowrap'>
                                  {item.label}
                                </span>
                              ) : (
                                <motion.span
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: 'auto', opacity: 1 }}
                                  exit={{ width: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className='ml-2 overflow-hidden whitespace-nowrap'
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
                        'rounded-md transition-all',
                        'hover:bg-accent/80 hover:text-accent-foreground hover:backdrop-blur-none'
                      )}
                      onClick={item.onClick}
                      aria-label={item.label}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='flex items-center'
                      >
                        <IconLoader
                          icon={item.icon}
                          className='h-4 w-4 flex-shrink-0'
                          aria-hidden='true'
                        />
                        <AnimatePresence>
                          {(hoveredItem === item.id || isTablet) && (
                            <span className='hidden lg:inline'>
                              <motion.span
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 'auto', opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className='ml-2 overflow-hidden whitespace-nowrap'
                              >
                                {item.label}
                              </motion.span>
                            </span>
                          )}
                        </AnimatePresence>
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
