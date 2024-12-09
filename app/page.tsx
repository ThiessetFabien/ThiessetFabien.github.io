'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/lib/components/ui/card';
import CardData from '@api/cards.data.json';
import { CallToAction } from '@/ui/CallToAction/CallToAction';
import { TechnologiesCarousel } from '@/ui/Carousel/TechnologiesCarousel';
import { RecommandationsCarousel } from '@/ui/Carousel/RecommandationsCarousel';
import { Section } from '@/components/ui/Section/Section';
import { Map } from '@/ui/Map/Map';
import { CardImage } from '@/ui/Card/CardImage';
import { CardExperiences } from '@/ui/Card/CardExperiences';
import { CardProjects } from '@/ui/Card/CardProjects';

/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const HomePage: React.FC = () => {
  return (
    <main className='container mx-auto p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {CardData.map((cardProps, index: number) => (
          <Section key={index}>
            <Card>
              <CardHeader>
                {cardProps.imageSrc && !cardProps.map && (
                  <CardImage
                    imageSrc={cardProps.imageSrc}
                    imageAlt={cardProps.imageAlt || ''}
                    width={590}
                    height={100}
                    className='h-auto w-full'
                  />
                )}
                {!cardProps.imageSrc && cardProps.map && <Map />}
                {cardProps.title && (
                  <>
                    <CardTitle className='font-caption text-2xl leading-tight tracking-tight'>
                      {cardProps.title}
                    </CardTitle>
                    {cardProps.description && (
                      <CardDescription className='text-base font-light leading-relaxed'>
                        {cardProps.description}
                      </CardDescription>
                    )}
                  </>
                )}
              </CardHeader>
              {cardProps.experiences &&
                cardProps.experiences.length > 0 &&
                !cardProps.technologies && (
                  <CardContent>
                    <CardExperiences
                      className='max-w-prose text-base font-light leading-relaxed'
                      experiences={cardProps.experiences}
                    />
                  </CardContent>
                )}
              {cardProps.technologies && cardProps.technologies.length > 0 && (
                <CardContent>
                  <TechnologiesCarousel
                    className='w-full text-base font-light leading-relaxed'
                    technologies={cardProps.technologies}
                  />
                </CardContent>
              )}
              {cardProps.recommandations &&
                cardProps.recommandations.length > 0 && (
                  <CardContent>
                    <RecommandationsCarousel
                      className='w-full text-base font-light leading-relaxed'
                      recommandations={cardProps.recommandations}
                    />
                  </CardContent>
                )}
              {cardProps.projects && cardProps.projects.length > 0 && (
                <CardContent>
                  <CardProjects projects={cardProps.projects} />
                </CardContent>
              )}
              {cardProps.cta1 &&
                cardProps.href1 &&
                cardProps.cta2 &&
                cardProps.href2 && (
                  <CardFooter>
                    <CallToAction
                      cta1={cardProps.cta1}
                      icon1={cardProps.icon1}
                      href1={cardProps.href1}
                      downloadActive1={cardProps.downloadActive1}
                      cta2={cardProps.cta2}
                      icon2={cardProps.icon2}
                      href2={cardProps.href2}
                      downloadActive2={cardProps.downloadActive2}
                    />
                  </CardFooter>
                )}
            </Card>
          </Section>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
