'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { cn } from '@lib/utils';
import { useLoading } from '@src/contexts/LoadingContext';
import { cnFlexCol, cnFlexFullCenter } from '@src/styles/flex.style';
import { cnParagraph } from '@src/styles/font.style';

const loadingTexts = [
  'Chargement des composants...',
  'Initialisation des styles...',
  'Préparation du contenu...',
  'Configuration des animations...',
  'Presque prêt...',
];

interface LoadingScreenProps {
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ className }) => {
  const { isLoading } = useLoading();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentTextIndex(
          (prevIndex) => (prevIndex + 1) % loadingTexts.length
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-50 bg-background',
        cnFlexFullCenter,
        className
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={cn(cnFlexCol, cnFlexFullCenter, 'gap-4 text-center')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='relative h-16 w-16'>
          <motion.div
            className='absolute inset-0 h-full w-full rounded-full border-4 border-primary opacity-25'
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute inset-0 h-full w-full rounded-full border-t-4 border-primary'
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <motion.p
          key={currentTextIndex}
          className={cn(
            cnParagraph,
            'h-8 text-sm text-foreground/80 md:text-base'
          )}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {loadingTexts[currentTextIndex]}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
