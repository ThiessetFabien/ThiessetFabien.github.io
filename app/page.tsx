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
import Image from 'next/image.js';
import CardData from '@api/cards.data.json';
import { CallToAction } from '@/ui/CallToAction/CallToAction';
import { TechnologiesCarousel } from '@/ui/Carousel/TechnologiesCarousel';
import { RecommandationsCarousel } from '@/ui/Carousel/RecommandationsCarousel';
import { Map } from '@/ui/Map/Map';
import { CardExperiences } from '@/ui/Card/CardExperiences';
import { CardProjects } from '@/ui/Card/CardProjects';
import { SkillsCard } from '@/ui/Card/SkillsCard';
import CardProps from '@/types/CardProps';

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
    <main className='container relative z-0 mx-auto'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
        {CardData.map((CardProps, index: number) => (
          <Card key={index} className='h-full w-full'>
            {/* space-y-0 is a utility class from card component */}
            <CardHeader className='space-y-0'>
              {CardProps.imageSrc && !CardProps.map && (
                <div className='flex md:flex-col'>
                  <Image
                    src={`/images${CardProps.imageSrc}`}
                    alt={CardProps.imageAlt || ''}
                    width={590}
                    height={100}
                    priority
                    className='h-auto w-full max-w-[205px] rounded-xl md:mb-4 md:max-w-full'
                  />
                  <div className='ml-4 flex flex-col justify-center md:ml-0'>
                    <CardTitle className='font-caption text-lg leading-tight tracking-tight md:text-xl lg:text-2xl'>
                      <h2>{CardProps.title}</h2>
                    </CardTitle>
                    <CardDescription className='w-full min-w-full max-w-prose text-base font-light leading-relaxed'>
                      <p>{CardProps.description}</p>
                    </CardDescription>
                    <CallToAction
                      className='mt-4 h-auto space-y-4 md:mt-6 md:space-x-4'
                      cta1={CardProps.cta1}
                      icon1={CardProps.icon1}
                      href1={CardProps.href1}
                      downloadActive1={CardProps.downloadActive1}
                    />
                  </div>
                </div>
              )}
              {!CardProps.imageSrc && CardProps.map && <Map />}
              <CardTitle className='font-caption text-lg leading-tight tracking-tight md:text-xl lg:text-2xl'>
                {!CardProps.imageSrc && CardProps.title}
              </CardTitle>
              {!CardProps.imageSrc && CardProps.description && (
                <CardDescription className='w-full min-w-full max-w-prose text-base font-light leading-relaxed'>
                  {CardProps.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className='max-w-prose text-base font-light leading-relaxed'>
              {CardProps.experiences &&
                CardProps.experiences.length > 0 &&
                !CardProps.technologies && (
                  <CardExperiences experiences={CardProps.experiences} />
                )}
              {CardProps.technologies && CardProps.technologies.length > 0 && (
                <>
                  <SkillsCard top3Technologies={CardProps.top3Technologies} />
                  <TechnologiesCarousel technologies={CardProps.technologies} />
                </>
              )}
              {CardProps.recommandations &&
                CardProps.recommandations.length > 0 && (
                  <RecommandationsCarousel
                    recommandations={CardProps.recommandations}
                  />
                )}
              {CardProps.projects && CardProps.projects.length > 0 && (
                <CardProjects projects={CardProps.projects} />
              )}
            </CardContent>
            {((CardProps.cta1 && CardProps.href1) ||
              (CardProps.cta2 && CardProps.href2)) &&
              !CardProps.imageSrc && (
                <CardFooter>
                  <CallToAction
                    className='flex h-auto w-full gap-4 md:gap-6'
                    cta1={CardProps.cta1}
                    icon1={CardProps.icon1}
                    href1={CardProps.href1}
                    downloadActive1={CardProps.downloadActive1}
                    cta2={CardProps.cta2}
                    icon2={CardProps.icon2}
                    href2={CardProps.href2}
                    downloadActive2={CardProps.downloadActive2}
                  />
                </CardFooter>
              )}
          </Card>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
