import React from 'react';
import Link from 'next/link';
import { Button } from '@/lib/components/ui/button';

import { Section } from '@/components/Section/Section';
import CardProps from '@/types/CardProps';
import { cn } from '@/lib/utils';

export const CallToAction: React.FC<CardProps> = ({
  cta1,
  cta2,
  href1,
  href2,
  className,
}) => {
  return (
    <Section
      className={cn(
        'flex h-auto w-full items-center justify-evenly',
        className
      )}
    >
      <div>
        <Link href={`${href1}`}>
          <Button
            size='lg'
            variant={'default'}
            className='flex w-full items-center justify-evenly text-center'
          >
            {(cta1 ?? '').toLocaleUpperCase()}
          </Button>
        </Link>
      </div>
      <div>
        <Link href={`${href2}`}>
          <Button
            size='lg'
            variant={'outline'}
            className='flex w-full items-center justify-center text-center'
          >
            {(cta2 ?? '').toLocaleUpperCase()}
          </Button>
        </Link>
      </div>
    </Section>
  );
};
