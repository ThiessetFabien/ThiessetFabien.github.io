import Image from 'next/image';
import React from 'react';
import CardProps from '@/types/CardProps';
import { CallToAction } from '@/ui/CallToAction/CallToAction';
import { TechCarousel } from '@/ui/Carousel/TechCarousel';
import { Map } from '@/ui/Map/Map';
import { Section } from '@/components/Section/Section';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/lib/components/ui/card';

const ImageSection = ({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string;
  imageAlt: string;
}) => (
  <CardContent>
    <Image
      src={imageSrc}
      alt={imageAlt || ''}
      width={100}
      height={100}
      className='h-auto w-full'
      priority
    />
  </CardContent>
);

const TitleSection = ({ title }: { title: string }) => (
  <CardHeader>
    <CardTitle className='font-caption text-2xl leading-tight tracking-tight'>
      {title}
    </CardTitle>
  </CardHeader>
);

const ContentSection = ({ content }: { content: React.ReactNode }) => (
  <CardContent>
    <div className='font-body max-w-prose text-base font-light leading-relaxed'>
      {content}
    </div>
  </CardContent>
);

export const CardComponent: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  cta1,
  cta2,
  href1,
  href2,
  content,
  technologies,
}) => {
  return (
    <Section>
      <Card>
        {imageSrc && content !== 'Map' && (
          <ImageSection imageSrc={imageSrc} imageAlt={imageAlt || ''} />
        )}
        {content === 'Map' && (
          <CardContent>
            <Map />
          </CardContent>
        )}
        {title && <TitleSection title={title} />}
        {content !== 'Map' && <ContentSection content={content} />}
        {technologies && technologies.length > 0 && (
          <CardContent>
            <TechCarousel technologies={technologies} />
          </CardContent>
        )}
        {(cta1 || cta2) && (
          <CardFooter>
            <CallToAction
              title={title || ''}
              cta1={cta1 || ''}
              cta2={cta2 || ''}
              href1={href1 || ''}
              href2={href2 || ''}
            />
          </CardFooter>
        )}
      </Card>
    </Section>
  );
};
