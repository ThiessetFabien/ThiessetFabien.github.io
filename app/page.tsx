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
import { RecommandationsCarousel } from '@/ui/Carousel/RecommandationsCarousel';
import { Map } from '@/ui/Map/Map';
import { CardExperiences } from '@/components/ui/Card/ExperiencesCard';
import { CardProjects } from '@/components/ui/Card/ProjectsCard';
import { SkillsCard } from '@/ui/Card/SkillsCard';
import { cn } from '@/lib/utils';
import useCardGrid from '@/hooks/useCardGrid';
import { cnTitle1, cnDescription } from '@/styles/fontStyles';
import { cnBorder } from '@/styles/borderStyles';
import { cnHiddenXs } from '@/styles/hideItemStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import {
  cnPadding,
  cnMarginTop,
  cnSpaceY,
  cnGap,
} from '@/styles/boxModelStyles';
import type CardProps from './types/CardProps';

/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const HomePage: React.FC = (): JSX.Element => {
  const gridConfig = useCardGrid(CardData as CardProps[]);

  return (
    <main
      className={cn(
        cnGap,
        'container relative z-0',
        'mx-auto grid grid-cols-1',
        'lg:grid-cols-4'
      )}
    >
      {gridConfig.map((card, index: number) => (
        <Card key={index} className={cn('h-full w-full', cnGap, card.colSpan)}>
          <CardHeader className={cn(cnPadding, 'space-y-0')}>
            {card.imageSrc && !card.map && (
              <div className={cn(cnGap, 'grid grid-cols-3')}>
                <div className='col-span-1'>
                  <Image
                    src={`/images/${card.imageSrc}`}
                    alt={card.imageAlt || ''}
                    width={205}
                    height={316}
                    priority
                    className={cn(cnBorder, 'h-auto w-auto')}
                  />
                </div>
                <div className={cn(cnFlexCol, 'col-span-2 justify-center')}>
                  <CardTitle className={cnTitle1}>
                    <h2>{card.title}</h2>
                  </CardTitle>
                  <CardDescription className={cn(cnDescription, cnHiddenXs)}>
                    <p>{card.description}</p>
                  </CardDescription>
                  <CallToAction
                    className={cn(cnSpaceY, cnMarginTop, 'h-auto')}
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
            <CardContent className={cnPadding}>
              {card.experiences &&
                card.experiences.length > 0 &&
                !card.technologies && (
                  <CardExperiences experiences={card.experiences} />
                )}
              {card.top3Technologies &&
                card.technologies &&
                card.technologies.length > 0 && (
                  <SkillsCard
                    top3Technologies={card.top3Technologies}
                    technologies={card.technologies}
                  />
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
                  className={cn(cnGap, 'flex h-auto w-full')}
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
