import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@lib/utils';
import { cnFlexCol, cnFlexFullCenter } from '@src/styles/flex.style';
import { cnParagraph } from '@src/styles/font.style';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

/**
 * Composant d'animation de chargement avec les initiales "FT"
 *
 * @param {Object} props - Propriétés du composant
 * @param {string} [props.size='medium'] - Taille du loader: 'small', 'medium', ou 'large'
 * @param {boolean} [props.showText=false] - Afficher ou non le texte "Chargement..."
 * @returns {JSX.Element} Le composant Loader
 */
export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  showText = false,
}) => {
  const containerSize: Record<string, string> = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const fontSize: Record<string, string> = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl',
  };

  const circleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 5,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.5,
        repeat: 0,
        repeatType: 'reverse' as const,
      },
    }),
  };

  return (
    <div className={cn(cnFlexCol, cnFlexFullCenter, 'gap-4')}>
      <motion.div
        className={cn(
          cnFlexFullCenter,
          containerSize[size],
          'relative rounded-full border-2 border-primary/30'
        )}
        initial='hidden'
        animate='visible'
        variants={circleVariants}
      >
        <div
          className={cn(
            cnFlexFullCenter,
            'absolute inset-0 font-heading font-bold',
            fontSize[size]
          )}
        >
          <motion.span
            custom={0}
            variants={letterVariants}
            initial='hidden'
            animate='visible'
            className='text-primary'
          >
            F
          </motion.span>
          <motion.span
            custom={1}
            variants={letterVariants}
            initial='hidden'
            animate='visible'
            className='text-accent'
          >
            T
          </motion.span>
        </div>

        <motion.div
          className='absolute h-2 w-2 rounded-full bg-primary'
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-1px',
            marginLeft: '-1px',
            width: '100%',
            height: '100%',
          }}
        >
          <div className='h-2 w-2 rounded-full bg-primary' />
        </motion.div>
      </motion.div>

      {showText && (
        <motion.p
          className={cn(cnParagraph, 'text-muted-foreground')}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          Chargement...
        </motion.p>
      )}
    </div>
  );
};
