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
import { RecommandationsCarousel } from '@/ui/Carousel/RecommandationsCarousel';
import { Map } from '@/components/ui/Card/MapCard';
import { CardExperiences } from '@/components/ui/Card/ExperiencesCard';
import { CardProjects } from '@/components/ui/Card/ProjectsCard';
import { SkillsCard } from '@/ui/Card/SkillsCard';
import PresentationCard from '@/ui/Card/PresentationCard';
import { cn } from '@/lib/utils';
import useCardGrid from '@/hooks/useCardGrid';
import { cnTitle1, cnDescription } from '@/styles/fontStyles';
import { cnPadding, cnGap } from '@/styles/boxModelStyles';
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
        'lg:auto-rows-auto lg:grid-cols-8'
      )}
    >
      {gridConfig.map((card, index: number) => (
        <Card key={index} className={cn('h-full w-full', cnGap, card.colSpan)}>
          <CardHeader className={cn(cnPadding, 'space-y-0')}>
            {card.imageSrc && !card.map && (
              <PresentationCard
                title={card.title}
                description={card.description}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                cta1={card.cta1}
                icon1={card.icon1}
                href1={card.href1}
                downloadActive1={card.downloadActive1}
              />
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
              <CardFooter className={cnPadding}>
                <CallToAction
                  className={cn(cnGap, 'flex h-full w-full')}
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
