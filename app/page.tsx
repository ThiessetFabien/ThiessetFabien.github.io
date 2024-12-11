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
import Image from 'next/image';
import CardData from '@api/cards.data.json';
import { CallToAction } from '@/ui/CallToAction/CallToAction';
import { TechnologiesCarousel } from '@/ui/Carousel/TechnologiesCarousel';
import { RecommandationsCarousel } from '@/ui/Carousel/RecommandationsCarousel';
import { Map } from '@/ui/Map/Map';
import { CardExperiences } from '@/ui/Card/CardExperiences';
import { CardProjects } from '@/ui/Card/CardProjects';
import { SkillsCard } from '@/ui/Card/SkillsCard';
import { cn } from '@/lib/utils';
import useCardGrid from '@/hooks/useCardGrid';
import { cnTitle1, cnDescription } from '@/styles/fontStyles';

/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const HomePage: React.FC = () => {
  const gridConfig = useCardGrid(CardData);

  return (
    <main
      className={cn(
        'container relative z-0',
        'mx-auto grid grid-cols-1 gap-4',
        'md:gap-6',
        'lg:grid-cols-4'
      )}
    >
      {gridConfig.map((card, index: number) => (
        <Card key={index} className={cn('h-full w-full', card.colSpan)}>
          <CardHeader className='space-y-0'>
            {card.imageSrc && !card.map && (
              <div className='flex'>
                <Image
                  src={`/images/${card.imageSrc}`}
                  alt={card.imageAlt || ''}
                  width={205}
                  height={316}
                  priority
                  className='max-w-1/3 rounded-xl'
                />
                <div
                  className={cn('ml-4 flex flex-col justify-center', 'md:ml-6')}
                >
                  <CardTitle className={cnTitle1}>
                    <h2>{card.title}</h2>
                  </CardTitle>
                  <CardDescription className={cnDescription}>
                    <p>{card.description}</p>
                  </CardDescription>
                  <CallToAction
                    className='mt-4 h-auto space-y-4 md:mt-6 md:space-x-4'
                    cta1={card.cta1}
                    icon1={card.icon1}
                    href1={card.href1}
                    downloadActive1={card.downloadActive1}
                  />
                </div>
              </div>
            )}
            {!card.imageSrc && card.map && <Map />}
            <CardTitle className={cnTitle1}>
              {!card.imageSrc && card.title}
            </CardTitle>
            {!card.imageSrc && card.description && (
              <CardDescription className={cnDescription}>
                {card.description}
              </CardDescription>
            )}
          </CardHeader>
          {!card.imageSrc && !card.map && (
            <CardContent>
              {card.experiences &&
                card.experiences.length > 0 &&
                !card.technologies && (
                  <CardExperiences experiences={card.experiences} />
                )}
              {card.technologies && card.technologies.length > 0 && (
                <>
                  <SkillsCard top3Technologies={card.top3Technologies} />
                  <TechnologiesCarousel
                    className='min-w-20'
                    technologies={card.technologies}
                  />
                </>
              )}
              {card.recommandations && card.recommandations.length > 0 && (
                <RecommandationsCarousel
                  recommandations={card.recommandations}
                />
              )}
              {card.projects && card.projects.length > 0 && (
                <CardProjects projects={card.projects} />
              )}
            </CardContent>
          )}
          {((card.cta1 && card.href1) || (card.cta2 && card.href2)) &&
            !card.imageSrc && (
              <CardFooter>
                <CallToAction
                  className='flex h-auto w-full gap-4 md:gap-6'
                  cta1={card.cta1}
                  icon1={card.icon1}
                  href1={card.href1}
                  downloadActive1={card.downloadActive1}
                  cta2={card.cta2}
                  icon2={card.icon2}
                  href2={card.href2}
                  downloadActive2={card.downloadActive2}
                />
              </CardFooter>
            )}
        </Card>
      ))}
    </main>
  );
};

export default HomePage;
