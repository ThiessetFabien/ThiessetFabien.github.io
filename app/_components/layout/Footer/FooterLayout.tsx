'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import dynamicYear from '@/utils/dynamicYear';
import { cnSmallText } from '@/styles/fontStyles';
import CardProps from '@/types/CardProps.jsx';

/**
 * @file Footer.tsx
 * @description This file exports a Footer component that displays the current year and some additional information.
 */

/**
 * Footer component.
 * @param {Object} props - The props for the component.
 * @param {string} [props.className] - Additional class names to apply to the footer.
 * @returns {JSX.Element} The rendered Footer component.
 * @example
 * <Footer />
 */

export const Footer: React.FC<CardProps> = ({ className }) => {
  return (
    <footer className={cn(className)}>
      <p className={cn(cnSmallText, 'font-light text-muted-foreground')}>
        &copy; {dynamicYear} Fabien Thiesset - All rights reserved.
        <br />
        Fonts made from
        <a
          href='http://www.onlinewebfonts.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Web Fonts
        </a>{' '}
        is licensed by CC BY 4.0
      </p>
    </footer>
  );
};
