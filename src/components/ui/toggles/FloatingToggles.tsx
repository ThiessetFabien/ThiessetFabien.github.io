'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { scrollToTop } from '@hooks/ScrollToTop.hook';
import { ToggleDarkMode } from '@src/components/ui/toggles/DarkModeToggle';
import { ScrollTopToggle } from '@src/components/ui/toggles/ScrollTopToggle';
import { cn } from '@src/lib/utils';
import { cnBorderRadiusFull } from '@src/styles/border.style';
import {
  cnBottomRightPosition,
  cnPaddingX,
  cnTopRightPosition,
} from '@src/styles/boxModel.style';
import { useIsLg } from '@src/styles/mediaQueries.style';
import { containerScale } from '@src/styles/variantsAnimation';

/**
 * FloatingToggles component renders floating buttons for toggling dark mode and scrolling to the top.
 * It includes animations and visibility logic based on scroll position.
 *
 * @returns {JSX.Element | null} The rendered component or null if not mounted.
 */
export const FloatingToggles = (): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [darkModeOpacity, setDarkModeOpacity] = useState(1);
  const [scrollTopOpacity, setScrollTopOpacity] = useState(0);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const isLg = useIsLg();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      setLastScrollY(currentScrollY);

      if (direction === 'up') {
        setDarkModeOpacity(
          Math.min(1, 0.5 + 0.5 * (1 - Math.min(currentScrollY / 300, 1)))
        );
      } else {
        setDarkModeOpacity(
          Math.max(0.5, 1 - 0.5 * Math.min(currentScrollY / 300, 1))
        );
      }

      const scrollThreshold = 200;

      if (currentScrollY > scrollThreshold) {
        setScrollTopVisible(true);

        if (direction === 'down') {
          setScrollTopOpacity(
            Math.min(1, (currentScrollY - scrollThreshold) / 200)
          );
        } else {
          setScrollTopOpacity(
            Math.max(0.5, Math.min(1, (currentScrollY - scrollThreshold) / 200))
          );
        }
      } else {
        setScrollTopOpacity(0);
        setTimeout(() => {
          if (window.scrollY <= scrollThreshold) {
            setScrollTopVisible(false);
          }
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, lastScrollY]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='pointer-events-none fixed inset-0 z-50'>
      <div className={cn('mx-auto h-full', cnPaddingX)}>
        <AnimatePresence>
          <motion.div
            className={cn('pointer-events-auto absolute', cnTopRightPosition)}
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: darkModeOpacity,
              y: 0,
              transition: {
                opacity: { duration: 0.5, ease: 'easeInOut' },
              },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ToggleDarkMode className={cnBorderRadiusFull} />
          </motion.div>
        </AnimatePresence>

        {isLg && scrollTopVisible && (
          <AnimatePresence>
            <motion.div
              className={cn(
                'pointer-events-auto absolute',
                cnBottomRightPosition
              )}
              variants={containerScale}
              whileHover='hover'
              whileTap='tap'
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: scrollTopOpacity,
                y: 0,
                transition: {
                  opacity: { duration: 0.5, ease: 'easeInOut' },
                  y: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
                },
              }}
              exit={{
                opacity: 0,
                y: 20,
                transition: { duration: 0.3 },
              }}
            >
              <ScrollTopToggle
                type='button'
                variant='outline'
                size='sm'
                onClick={scrollToTop}
                icon='ChevronsUp'
                aria-label='Scroll to top'
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
