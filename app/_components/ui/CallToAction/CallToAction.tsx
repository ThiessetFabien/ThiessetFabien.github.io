'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Button } from '@/lib/components/ui/button';
import CardProps from '@/types/CardProps';

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
  const downloadAction = (downloadActive: boolean) => {
    return downloadActive ? { download: true } : { target: '_blank' };
  };

  const IconLoader = (icon: string) => {
    const [Icon, setIcon] = useState<React.ComponentType | null>(null);

    useEffect(() => {
      const loadIcon = async () => {
        const iconModule = await import(`lucide-react`);
        setIcon(() => iconModule[icon]);
      };
      loadIcon();
    }, [icon]);

    return Icon ? <Icon className='mr-2' /> : null;
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
            {IconLoader(icon1 ?? '')}
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
            {IconLoader(icon2 ?? '')}
            {(cta2 ?? '').toLocaleUpperCase()}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
