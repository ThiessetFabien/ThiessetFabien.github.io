'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import dynamicYear from '@/utils/dynamicYear';

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

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={cn(className)}>
      <p className='p-6 text-sm font-light'>
        &copy; {dynamicYear} Fabien Thiesset - All rights reserved.
        <br />
        Fonts made from
        <a href='http://www.onlinewebfonts.com'>Web Fonts</a> is licensed by CC
        BY 4.0
      </p>
    </footer>
  );
};
