import Image from 'next/image';
import React from 'react';
import { CallToAction } from '../CallToAction/CallToAction';

interface CardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  cta1: string;
  cta2: string;
  href: string;
  content: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  imageSrc,
  imageAlt,
  cta1,
  cta2,
  href,
  content,
}) => {
  return (
    <div className='grid gap-grid-gutter px-10 py-16'>
      <div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={100}
          height={100}
          className='h-auto w-full'
        ></Image>
      </div>
      <div className='flex h-[9.4rem] flex-col justify-end'>
        <div className='font-title text-4xl'>{title}</div>
      </div>
      <div className='font-body text-2xl'>{content}</div>
      <CallToAction cta1={cta1} cta2={cta2} href={href} />
    </div>
  );
};
