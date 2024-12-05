'use client';
import React from 'react';
import { Button } from '@/lib/components/ui/button';
import CardProps from '@/types/CardProps';
import { dynamicDownload } from '@/utils/dynamicDownload';
import { IconLoader } from '@/hooks/IconLoader';

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
            size='lg'
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
            size='lg'
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
