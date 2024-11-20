import Image from 'next/image';
import React from 'react';
import { CardProps } from '../../../types/CardProps';
import { CallToAction } from '../CallToAction/CallToAction';

export const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  cta1,
  cta2,
  href,
  content,
}) => {
  return (
    <div className='container mx-auto grid gap-grid-gutter px-10 py-16'>
      {imageSrc && (
        <div className='grid gap-4'>
          <Image
            src={imageSrc}
            alt={imageAlt || ''}
            width={100}
            height={100}
            className='h-auto w-full'
          />
        </div>
      )}
      {title && (
        <div className='flex h-[9.4rem] flex-col justify-end'>
          <div className='font-title text-4xl'>{title}</div>
        </div>
      )}
      {content && <div className='font-body text-2xl'>{content}</div>}
      {(cta1 || cta2) && (
        <CallToAction cta1={cta1 || ''} cta2={cta2 || ''} href={href || ''} />
      )}
    </div>
  );
};
