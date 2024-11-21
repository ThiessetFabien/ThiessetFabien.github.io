import Image from 'next/image';
import React from 'react';
import { CardProps } from '../../../types/CardProps';
import { CallToAction } from '../CallToAction/CallToAction';
import TechCarousel from '../Carousel/TechCarousel';
import { Map } from '../Map/Map';

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
  <article>
    <div className='font-body text-2xl'>{content}</div>
  </article>
);

export const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  cta1,
  cta2,
  href,
  content,
  technologies,
}) => {
  const contentIsMapComponent = content === 'Map';

  return (
    <section className='container mx-auto grid gap-grid-gutter px-10 py-16'>
      {imageSrc && !contentIsMapComponent && (
        <ImageSection imageSrc={imageSrc} imageAlt={imageAlt || ''} />
      )}
      {contentIsMapComponent && (
        <div className='grid gap-4'>
          <Map />
        </div>
      )}
      {title && <TitleSection title={title} />}
      {content && !contentIsMapComponent && (
        <ContentSection content={content} />
      )}
      {technologies && technologies.length > 0 && (
        <TechCarousel technologies={technologies} />
      )}
      {(cta1 || cta2) && (
        <CallToAction cta1={cta1 || ''} cta2={cta2 || ''} href={href || ''} />
      )}
    </section>
  );
};
