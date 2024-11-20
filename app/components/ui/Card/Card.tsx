import Image from 'next/image';
import React from 'react';
import { CardProps } from '../../../types/CardProps';
import { isMapComponent } from '../../../utils/isMapComponent';
import { CallToAction } from '../CallToAction/CallToAction';

const ImageSection = ({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string;
  imageAlt: string;
}) => (
  <div className='grid gap-4'>
    <Image
      src={imageSrc}
      alt={imageAlt || ''}
      width={100}
      height={100}
      className='h-auto w-full'
    />
  </div>
);

const TitleSection = ({ title }: { title: string }) => (
  <div className='flex h-[9.4rem] flex-col justify-end'>
    <div className='font-title text-4xl'>{title}</div>
  </div>
);

const ContentSection = ({ content }: { content: React.ReactNode }) => (
  <div>
    <div className='font-body text-2xl'>{content}</div>
  </div>
);

export const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  cta1,
  cta2,
  href,
  content,
}) => {
  const contentIsMapComponent = isMapComponent(content);

  return (
    <div className='container mx-auto grid gap-grid-gutter px-10 py-16'>
      {imageSrc && !contentIsMapComponent && (
        <ImageSection imageSrc={imageSrc} imageAlt={imageAlt || ''} />
      )}
      {contentIsMapComponent && <div className='grid gap-4'>{content}</div>}
      {title && <TitleSection title={title} />}
      {content && !contentIsMapComponent && (
        <ContentSection content={content} />
      )}
      {(cta1 || cta2) && (
        <CallToAction cta1={cta1 || ''} cta2={cta2 || ''} href={href || ''} />
      )}
    </div>
  );
};
