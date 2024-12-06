'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Button } from '@/lib/components/ui/button';
import CardProps from '@/types/CardProps';
import { dynamicDownload } from '@/utils/dynamicDownload';
import { IconLoader } from '@/hooks/IconLoader';

/**
 * @file CallToAction.tsx
 * @description This component renders call-to-action buttons with dynamic icons.
 */

/**
 * CallToAction component props.
 * @typedef {Object} CardProps
 * @property {string} cta1 - The text for the first call-to-action button.
 * @property {string} icon1 - The icon for the first call-to-action button.
 * @property {string} href1 - The href for the first call-to-action button.
 * @property {boolean} downloadActive1 - Whether the first call-to-action button should trigger a download.
 * @property {string} cta2 - The text for the second call-to-action button.
 * @property {string} icon2 - The icon for the second call-to-action button.
 * @property {string} href2 - The href for the second call-to-action button.
 * @property {boolean} downloadActive2 - Whether the second call-to-action button should trigger a download.
 */

/**
 * CallToAction component.
 * @param {CardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */

export const CallToAction: React.FC<CardProps> = ({
  cta1,
  icon1,
  href1,
  downloadActive1,
  cta2,
  icon2,
  href2,
  downloadActive2,
}) => {
  return (
    <div className='flex h-auto w-full items-center'>
      <div className='mr-4'>
        <a href={`/${href1}`} {...dynamicDownload(downloadActive1)}>
          <Button
            size='sm'
            variant='default'
            className='flex w-full items-center justify-evenly text-center'
          >
            {IconLoader(icon1 ?? '')}
            {(cta1 ?? '').toLocaleUpperCase()}
          </Button>
        </a>
      </div>
      <div>
        <a href={`/${href2}`} {...dynamicDownload(downloadActive2)}>
          <Button
            size='sm'
            variant='outline'
            className='flex w-full items-center justify-evenly text-center'
          >
            {IconLoader(icon2 ?? '')}
            {(cta2 ?? '').toLocaleUpperCase()}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
