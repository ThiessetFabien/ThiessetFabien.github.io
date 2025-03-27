'use client';

import React from 'react';

import { year } from '@/src/utils/dynamicYear.util';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import { cnSmallText, cnTitle2, cnTitle2Size } from '@styles/font.style';

/**
 * Footer component that displays the current year and additional information.
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Additional class names for the footer.
 * @returns {JSX.Element} The rendered Footer component.
 */

export const Footer: React.FC<{ className: CardProps['className'] }> = ({
  className,
}) => {
  return (
    <footer className={className}>
      <h2 className={cn('mx-auto text-center', cnTitle2, cnTitle2Size)}>
        Fabien Thiesset
      </h2>
      <p className={cn('mx-auto text-center italic', cnSmallText)}>
        Expert React & Data API | Developer Fullstack | Project Coordinator
      </p>
      <p className={cn('mx-auto text-center', cnSmallText)}>
        For more information, send me a message to&nbsp;
        <a
          href='mailto:fabienthiessetpro@gmail.com'
          target='_blank'
          rel='noreferrer'
          className='text-primary hover:text-secondary/80 hover:underline focus:text-secondary/80 focus:underline'
          aria-label='Contact me'
        >
          fabienthiessetpro@gmail.com
        </a>
        .
      </p>
      <p className={cn('mx-auto text-center', cnSmallText)}>
        &copy;&nbsp;2024 - {year}&nbsp;&bull;&nbsp;
        <b className='font-bold'>Fabien Thiesset</b>&nbsp;&bull; &nbsp;All
        rights reserved
      </p>
    </footer>
  );
};
