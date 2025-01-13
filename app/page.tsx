/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/lib/components/ui/card';
import fetchData from '@api/data.json';
import { FooterCard } from '@/components/ui/Card/LayoutCard/FooterCard';
import { TestimonialsCarousel } from '@/components/ui/Carousel/TestimonialsCarousel';
import { ExperiencesCard } from '@/components/ui/Card/ExperiencesCard';
import { ProjectsCard } from '@/components/ui/Card/ProjectsCard';
import { SkillsCard } from '@/ui/Card/SkillsCard';
import PresentationCard from '@/ui/Card/PresentationCard';
import { HeaderCard } from '@/ui/Card/LayoutCard/HeaderCard';
import { cn } from '@/lib/utils';
import useCardGrid from '@/hooks/useCardGrid';
import {
  cnMarginX,
  cnPaddingBottom,
  cnPaddingX,
  cnSpaceY,
} from '@/styles/boxModelStyles';
import { MailCard } from '@/ui/Card/MailCard';
import { OtherSkillsCard } from '@/ui/Card/OtherSkillsCard';
import { AchievementsCard } from '@/ui/Card/AchievementsCard';
import { cnParagraph } from '@/styles/fontStyles';
import { useIsClient } from './hooks/useIsClient';
import dynamic from 'next/dynamic';
import type { CardProps } from './types/CardProps';
import { cnFlexCol, cnFlexFullCenter } from './styles/flexStyles';
import {
  cnGap,
  cnPadding,
  cnSmallGap,
  cnSmallSpaceY,
} from './styles/boxModelStyles';

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const LazyMap = dynamic(() => import('@/ui/Card/MapCard'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const HomePage: React.FC = (): JSX.Element => {
  const gridConfig = useCardGrid(fetchData as CardProps[]);
  const isClient = useIsClient();

  return (
    <>
      {gridConfig.map((card, index: number) => (
        <Card
          key={index}
          id={`card-${index}`}
          className={cn('h-full w-full', cnFlexCol, card.colSpan)}
        >
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
              cta2={card.cta2}
              icon2={card.icon2}
              href2={card.href2}
              downloadActive2={card.downloadActive2}
              cta3={card.cta3}
              icon3={card.icon3}
              href3={card.href3}
              downloadActive3={card.downloadActive3}
              cta4={card.cta4}
              icon4={card.icon4}
              href4={card.href4}
              downloadActive4={card.downloadActive4}
              cta5={card.cta5}
              icon5={card.icon5}
              href5={card.href5}
              downloadActive5={card.downloadActive5}
              className={cn(cnGap, cnPadding, 'w-full space-y-0')}
            />
          )}
          {!card.imageSrc && (
            <>
              <HeaderCard
                title={card.title}
                description={card.description}
                index={index}
                className={cnPadding}
              />
              <CardContent
                className={cn(
                  !card.testimonials ? cnPaddingX : 'px-0',
                  'container min-w-full flex-1 overflow-hidden'
                )}
              >
                {card.experiences &&
                  card.experiences.length > 0 &&
                  !card.technologies && (
                    <ExperiencesCard
                      experiences={card.experiences}
                      className=''
                    />
                  )}
                {card.topTechnologies && (
                  <SkillsCard
                    topTechnologies={card.topTechnologies}
                    className={cn(
                      'flex min-w-full flex-row flex-wrap',
                      'container overflow-hidden',
                      cnSmallGap
                    )}
                  />
                )}
                {card.technologies && card.technologies.length > 0 && (
                  <OtherSkillsCard
                    technologies={card.technologies}
                    className={cn(
                      cnFlexFullCenter,
                      'flex-shrink-0',
                      'h-auto min-w-fit',
                      'xs:min-h-auto min-h-12',
                      'xs:min-w-auto min-w-12'
                    )}
                  />
                )}
                {card.testimonials && card.testimonials.length > 0 && (
                  <TestimonialsCarousel
                    testimonials={card.testimonials}
                    className={cn(cnSmallSpaceY, cnPaddingX, 'h-100% w-full')}
                  />
                )}
                {card.projects && card.projects.length > 0 && (
                  <ProjectsCard
                    projects={card.projects}
                    className={cn(
                      cnGap,
                      'h-full',
                      'grid sm:auto-rows-auto sm:grid-cols-2 lg:grid-cols-3'
                    )}
                  />
                )}
                {card.achievements && card.achievements.length > 0 && (
                  <AchievementsCard
                    achievements={card.achievements}
                    className={cnSmallSpaceY}
                  />
                )}
                {card.mailto && (
                  <MailCard
                    mailto={card.mailto}
                    cta1={card.cta1}
                    icon1={card.icon1}
                    href1={card.href1}
                    downloadActive1={card.downloadActive1}
                    cta2={card.cta2}
                    icon2={card.icon2}
                    href2={card.href2}
                    downloadActive2={card.downloadActive2}
                    cta3={card.cta3}
                    icon3={card.icon3}
                    href3={card.href3}
                    downloadActive3={card.downloadActive3}
                    className={cnSpaceY}
                  />
                )}
                {isClient && card.map && <LazyMap />}
                {!card.experiences &&
                  !card.topTechnologies &&
                  !card.technologies &&
                  !card.testimonials &&
                  !card.projects &&
                  !card.achievements &&
                  !card.mailto && <p className={cnParagraph}>{card.content}</p>}
              </CardContent>
            </>
          )}
          {!card.imageSrc &&
            !card.mailto &&
            ((card.cta1 && card.href1) || (card.cta2 && card.href2)) && (
              <CardFooter className={cn(cnPaddingX, cnPaddingBottom)}>
                <FooterCard
                  className={'flex h-full w-full'}
                  cta1={card.cta1}
                  icon1={card.icon1}
                  href1={card.href1}
                  downloadActive1={card.downloadActive1}
                  cta2={card.cta2}
                  icon2={card.icon2}
                  href2={card.href2}
                  downloadActive2={card.downloadActive2}
                  cta3={card.cta3}
                  icon3={card.icon3}
                  href3={card.href3}
                  downloadActive3={card.downloadActive3}
                />
              </CardFooter>
            )}
        </Card>
      ))}
    </>
  );
};

export default HomePage;
