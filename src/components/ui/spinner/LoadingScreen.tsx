'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { useLoading } from '@src/contexts/LoadingContext';
import { NoSSR } from '@src/hooks/useIsClient.hook';

interface LoadingScreenProps {
  children: React.ReactNode;
}

/**
 * A loading screen component that displays an animated logo with initials.
 *
 * This component renders a fullscreen loading animation when the application
 * is in a loading state. The animation consists of a logo with "FT" initials
 * that appears with a fade-in effect. When loading is complete, the component
 * will render its children instead.
 *
 * The component uses client-side only rendering via NoSSR to prevent hydration issues.
 *
 * @component
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - Content to display when not in loading state
 * @returns {JSX.Element} The rendered component
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ children }) => {
  const { isLoading } = useLoading();

  if (!isLoading) return children;

  return (
    <NoSSR fallback={null}>
      <motion.div
        className='fixed inset-0 z-50 flex items-center justify-center bg-background'
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className='flex items-center justify-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='relative'>
            <div className='logo-anim text-4xl md:text-6xl' />
            <motion.div
              className='absolute inset-0 flex items-center justify-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className='text-xl font-bold text-primary md:text-3xl'>
                FT
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </NoSSR>
  );
};
