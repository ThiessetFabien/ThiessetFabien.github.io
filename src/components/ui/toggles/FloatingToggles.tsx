'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import { ToggleDarkMode } from '@/src/components/ui/toggles/DarkModeToggle';
import { cn } from '@/src/lib/utils';
import { cnPaddingX, cnTopRightPosition } from '@/src/styles/boxModel.style';

/**
 * A React component that renders floating toggle button for dark mode functionality
 * with Framer Motion animations.
 *
 * @returns {JSX.Element | null} The rendered component or null if not mounted.
 */
export const FloatingToggles = (): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  const [darkModeOpacity, setDarkModeOpacity] = useState(1);

  // Use refs to track values without triggering re-renders
  const lastScrollYRef = useRef(0);
  const darkModeOpacityRef = useRef(1);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to update dark mode opacity based on scroll
  const updateDarkModeOpacity = useCallback(
    (currentScrollY: number, direction: string) => {
      const newDarkModeOpacity =
        direction === 'up'
          ? Math.min(1, 0.5 + 0.5 * (1 - Math.min(currentScrollY / 300, 1)))
          : Math.max(0.5, 1 - 0.5 * Math.min(currentScrollY / 300, 1));

      if (Math.abs(newDarkModeOpacity - darkModeOpacityRef.current) > 0.01) {
        darkModeOpacityRef.current = newDarkModeOpacity;
        // Schedule state update to avoid excessive synchronous updates
        requestAnimationFrame(() => {
          if (!isUpdatingRef.current) {
            isUpdatingRef.current = true;
            setDarkModeOpacity(newDarkModeOpacity);
            setTimeout(() => {
              isUpdatingRef.current = false;
            }, 0);
          }
        });
      }
    },
    []
  );

  // Main scroll handler
  const handleScroll = useCallback(() => {
    if (!isMounted) return;

    // Limit update frequency
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollYRef.current) <= 10) {
      return;
    }

    const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
    lastScrollYRef.current = currentScrollY;

    // Update elements independently
    updateDarkModeOpacity(currentScrollY, direction);
  }, [isMounted, updateDarkModeOpacity]);

  useEffect(() => {
    if (!isMounted) return;

    // Initial setup without going through handleScroll
    const initialScrollY = window.scrollY;

    // Update refs and initial states
    lastScrollYRef.current = initialScrollY;

    // Set initial dark mode button opacity
    const initialDarkModeOpacity = Math.max(
      0.5,
      1 - 0.5 * Math.min(initialScrollY / 300, 1)
    );
    darkModeOpacityRef.current = initialDarkModeOpacity;
    setDarkModeOpacity(initialDarkModeOpacity);

    // Use throttle to limit calls to handleScroll
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [isMounted, handleScroll]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='pointer-events-none fixed inset-0 z-50'>
      <div className={cn('mx-auto h-full', cnPaddingX)}>
        <AnimatePresence>
          <motion.div
            className={cn(
              'pointer-events-auto absolute rounded-lg border bg-background/90 shadow-lg backdrop-blur-md',
              cnTopRightPosition
            )}
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
            role='complementary'
            aria-label='Contrôle du thème'
          >
            <ToggleDarkMode className='rounded-full' />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
