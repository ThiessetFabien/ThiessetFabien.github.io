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
  CardDescription,
} from '@/lib/components/ui/card';
import { ImageSection } from '@/components/ui/Card/Sections/CardImageSection';
import { ContentSection } from '@/components/ui/Card/Sections/CardContentSection';
import { ExperiencesSection } from '@/components/ui/Card/Sections/CardExperiencesSection';

export const CardComponent: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  cta1,
  cta2,
  href1,
  href2,
  map,
  experiences,
  content,
  technologies,
}) => {
  return (
    <Section>
      <Card>
        {imageSrc && !map && (
          <CardContent>
            <ImageSection
              className='h-auto w-full'
              imageSrc={imageSrc}
              imageAlt={imageAlt || ''}
            />
          </CardContent>
        )}
        {!imageSrc && map && (
          <CardContent>
            <Map />
          </CardContent>
        )}
        {title && description && (
          <CardHeader>
            <CardTitle className='font-caption text-2xl leading-tight tracking-tight'>
              {title}
            </CardTitle>
            <CardDescription className='text-base font-light leading-relaxed'>
              {description}
            </CardDescription>
          </CardHeader>
        )}
        {experiences && !technologies && (
          <CardContent>
            <ContentSection
              className='max-w-prose text-base font-light leading-relaxed'
              content={content}
            />

            <ExperiencesSection
              className='max-w-prose text-base font-light leading-relaxed'
              experiences={experiences}
            />
          </CardContent>
        )}
        {technologies && technologies.length > 0 && (
          <CardContent>
            <ContentSection
              className='max-w-prose text-base font-light leading-relaxed'
              content={content}
            />
            <TechCarousel
              className='w-full text-base font-light leading-relaxed'
              technologies={technologies}
            />
          </CardContent>
        )}
        {cta1 && cta2 && href1 && href2 && (
          <CardFooter>
            <CallToAction
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
