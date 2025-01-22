/**
 * @file page.tsx
 * @description This file renders the home page with various sections including cards, maps, and carousels.
 */

'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/lib/components/ui/card';
import fetchData from '@api/data.json';
import { FooterCard } from '@/components/ui/Card/LayoutCard/FooterCard';
import { ExperiencesCard } from '@/components/ui/Card/ExperiencesCard';
import { ProjectsCard } from '@/components/ui/Card/ProjectsCard';
import { PresentationCard } from '@/ui/Card/PresentationCard';
import { HeaderCard } from '@/ui/Card/LayoutCard/HeaderCard';
import { cn } from '@/lib/utils';
import useCardGrid from '@/hooks/useCardGrid';
import {
  cnPaddingBottom,
  cnPaddingX,
  cnSmallGap,
  cnSpaceY,
} from '@/styles/boxModelStyles';
import { MailCard } from '@/components/ui/Card/MailCard';
import { AchievementsCard } from '@/ui/Card/AchievementsCard';
import { cnParagraph } from '@/styles/fontStyles';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/hooks/FormatText';
import { useIsClient } from './hooks/useIsClient';
import dynamic from 'next/dynamic';
import type { CardProps } from './types/CardProps';
import { cnFlexCol } from './styles/flexStyles';
import { cnGap, cnPadding, cnSmallSpaceY } from './styles/boxModelStyles';

/**
 * HomePage component.
 * @returns {JSX.Element} The rendered component.
 */

const LazyMap = dynamic(() => import('@/ui/Card/MapCard'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const LazySkillsCard = dynamic(() => import('@/ui/Card/SkillsCard'), {
  ssr: false,
});

const LazyTestimonialsCard = dynamic(
  () => import('@/ui/Carousel/TestimonialsCarousel'),
  {
    ssr: false,
  }
);

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
              content={card.content}
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
          {!card.imageSrc ? (
            <>
              <HeaderCard
                title={card.title}
                description={card.description}
                index={index}
                className={cnPadding}
              />
              <CardContent
                className={
                  !card.testimonials
                    ? cnPaddingX
                    : 'container min-w-full flex-1 overflow-hidden p-0'
                }
              >
                {card.experiences &&
                  card.experiences?.length > 0 &&
                  !card.technologies && (
                    <ExperiencesCard
                      experiences={card.experiences}
                      className=''
                    />
                  )}
                {isClient &&
                  card.topTechnologies &&
                  card.technologies &&
                  card.technologies.length > 0 && (
                    <LazySkillsCard
                      topTechnologies={card.topTechnologies}
                      technologies={card.technologies}
                      content={card.content}
                      className={cn(
                        'flex w-full min-w-full flex-row flex-wrap',
                        'container overflow-hidden',
                        cnSmallGap
                      )}
                    />
                  )}
                {isClient &&
                  card.testimonials &&
                  card.testimonials.length > 0 && (
                    <LazyTestimonialsCard testimonials={card.testimonials} />
                  )}
                {card.projects && card.projects.length > 0 && (
                  <ProjectsCard
                    projects={card.projects}
                    className={cn(
                      cnGap,
                      'h-full',
                      'grid xs:auto-rows-auto xs:grid-cols-2 lg:grid-cols-4'
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
                  !card.mailto && (
                    <p className={cnParagraph}>
                      {typeof card.content === 'string' &&
                        capitalizeFirstLetterOfPhrase(
                          formatSpecialWords(card.content)
                        )}
                    </p>
                  )}
              </CardContent>
            </>
          ) : (
            <CardContent className='hidden' />
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
