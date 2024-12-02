'use client';

import React from 'react';
import CardData from '@api/cards.data.json';
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

const HomePage: React.FC = () => {
  return (
    <main>
      {CardData.map((cardProps, index: number) => (
        <Section key={index}>
          <Card className='border-0'>
            {cardProps.imageSrc && !cardProps.map && (
              <CardContent>
                <ImageSection
                  className='h-auto w-full'
                  imageSrc={cardProps.imageSrc}
                  imageAlt={cardProps.imageAlt || ''}
                />
              </CardContent>
            )}
            {!cardProps.imageSrc && cardProps.map && (
              <CardContent>
                <Map />
              </CardContent>
            )}
            {cardProps.title && (
              <CardHeader>
                <CardTitle className='font-caption text-2xl leading-tight tracking-tight'>
                  {cardProps.title}
                </CardTitle>
                <CardDescription className='text-base font-light leading-relaxed'>
                  {cardProps.description}
                </CardDescription>
              </CardHeader>
            )}
            {cardProps.experiences &&
              cardProps.experiences.length > 0 &&
              !cardProps.technologies && (
                <CardContent>
                  <CardExperiencesSection
                    className='max-w-prose text-base font-light leading-relaxed'
                    experiences={cardProps.experiences}
                  />
                </CardContent>
              )}
            {cardProps.technologies && cardProps.technologies.length > 0 && (
              <CardContent>
                <TechCarousel
                  className='w-full text-base font-light leading-relaxed'
                  technologies={cardProps.technologies}
                />
              </CardContent>
            )}
            {cardProps.cta1 &&
              cardProps.href1 &&
              cardProps.cta2 &&
              cardProps.href2 && (
                <CardFooter>
                  <CallToAction
                    className='flex flex-row'
                    cta1={cardProps.cta1 || ''}
                    href1={cardProps.href1 || ''}
                    downloadActive1={cardProps.downloadActive1}
                    cta2={cardProps.cta2 || ''}
                    href2={cardProps.href2 || ''}
                    downloadActive2={cardProps.downloadActive2}
                  />
                </CardFooter>
              )}
          </Card>
        </Section>
      ))}
    </main>
  );
};

export default HomePage;
