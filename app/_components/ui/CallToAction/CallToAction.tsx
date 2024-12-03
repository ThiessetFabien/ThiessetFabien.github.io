'use client';
import React from 'react';
import { Button } from '@/lib/components/ui/button';

import { Section } from '@/components/Section/Section';
import CardProps from '@/types/CardProps';
import { cn } from '@/lib/utils';

export const CallToAction: React.FC<CardProps> = ({
  cta1,
  href1,
  downloadActive1,
  cta2,
  href2,
  downloadActive2,
  className,
}) => {
  const downloadAction = (downloadActive: boolean) => {
    return downloadActive ? { download: true } : { target: '_blank' };
  };

  return (
    <div className='flex h-auto w-full items-center'>
      <div className='mr-4'>
        <a href={`/${href1}`} {...downloadAction(downloadActive1)}>
          <Button
            size='lg'
            variant='default'
            className='flex w-full items-center justify-evenly text-center'
          >
            {(cta1 ?? '').toLocaleUpperCase()}
          </Button>
        </a>
      </div>
      <div>
        <a href={`/${href2}`} {...downloadAction(downloadActive2)}>
          <Button
            size='lg'
            variant='outline'
            className='flex w-full items-center justify-evenly text-center'
          >
            {(cta2 ?? '').toLocaleUpperCase()}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
