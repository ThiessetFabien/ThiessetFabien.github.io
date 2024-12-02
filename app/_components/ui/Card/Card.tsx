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
import { CardExperiencesSection } from '@/components/ui/Card/Sections/CardExperiencesSection';

export const CardComponent: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  cta1,
  href1,
  downloadActive1,
  cta2,
  href2,
  downloadActive2,
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
        {title && (
          <CardHeader>
            <CardTitle className='font-caption text-2xl leading-tight tracking-tight'>
              {title}
            </CardTitle>
            <CardDescription className='text-base font-light leading-relaxed'>
              {description}
            </CardDescription>
          </CardHeader>
        )}
        {technologies && technologies.length > 0 && (
          <CardContent className='max-w-prose text-base font-light leading-relaxed'>
            {content}
            <TechCarousel
              className='w-full text-base font-light leading-relaxed'
              technologies={technologies}
            />
          </CardContent>
        )}
        {experiences && experiences.length > 0 && !technologies && (
          <CardContent className='max-w-prose text-base font-light leading-relaxed'>
            {content}
            <CardExperiencesSection
              className='max-w-prose text-base font-light leading-relaxed'
              experiences={experiences}
            />
          </CardContent>
        )}
        {projects && projects.length > 0 && !technologies && !experiences && (
          <CardContent className='max-w-prose text-base font-light leading-relaxed'>
            {content}
            <CardProjectsSection
              className='max-w-prose text-base font-light leading-relaxed'
              projects={projects}
            />
          </CardContent>
        )}
        {cta1 && href1 && cta2 && href2 && (
          <CardFooter>
            <CallToAction
              className='flex flex-row'
              cta1={cta1 || ''}
              href1={href1 || ''}
              downloadActive1={downloadActive1}
              cta2={cta2 || ''}
              href2={href2 || ''}
              downloadActive2={downloadActive2}
            />
          </CardFooter>
        )}
      </Card>
    </Section>
  );
};
