'use client';

import React from 'react';
import { CardTitle } from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { hideItem } from '@/styles/hideItemStyles';
import { cnBorder } from '@/styles/borderStyles';
import { lineThroughItem } from '@/styles/lineThroughStyles';
import { cnTitle2, cnSmallText, cnLightTextMuted } from '@/styles/fontStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import {
  cnPadding,
  cnSpaceY,
  cnSmallSpaceY,
  cnMarginRight,
} from '@/styles/boxModelStyles';
import { Dot } from 'lucide-react';
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/lib/components/ui/accordion';
import type CardProps from '@/types/CardProps';
import type { Experience } from '@/types/ExperienceProps';

/**
 * @file CardProjects.tsx
 * @description This file exports a component that renders a list of project cards.
 */

/**
 * CardProjects component.
 * @param {Object} props - The props for the component.
 * @param {Projects[]} props.projects - An array of project objects to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered CardProjects component.
 * @example
 * <CardProjects projects={projects} className="custom-class" />
 */

export const CardExperiences: React.FC<CardProps> = ({ experiences }) => {
  const ExperiencesRender: React.FC<Experience> = ({
    title,
    company,
    date,
  }) => {
    return (
      <div className={cnSmallSpaceY}>
        <CardTitle className={cn(cnTitle2, lineThroughItem(date))}>
          <div className={'flex'}>
            <Dot
              className={cn(cnMarginRight, 'shrink-0', 'text-primary')}
              size={28}
            />
            <div className={cnFlexCol}>
              <h3>
                {title}
                <span className={cn('text-primary', hideItem(company))}>
                  &nbsp;@ {company}
                </span>
              </h3>
              <Badge
                variant='outline'
                className={cn('border-0 p-0', cnSmallText, cnLightTextMuted)}
              >
                {date}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </div>
    );
  };

  return (
    <div className={cnSpaceY}>
      <ScrollArea
        className={cn(
          'w-full',
          cnBorder,
          'sm:h-42 h-48 xxs:h-40 xs:h-40 md:h-48',
          cnPadding
        )}
      >
        {experiences &&
          experiences.map((experience, expIndex) => (
            <div key={expIndex}>
              {experience.developer.map((developer, devIndex) => (
                <ExperiencesRender
                  key={devIndex}
                  title={developer.title}
                  company={developer.company}
                  date={developer.date}
                />
              ))}
            </div>
          ))}
      </ScrollArea>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            During 6 years, i coordinated the establishment projects and the
            first label of well-being in metropolitan France for a medicalized
            home.
          </AccordionTrigger>
          <AccordionContent>
            {experiences &&
              experiences.map((experience, expIndex) => (
                <div key={expIndex}>
                  {experience.projectCoordinator.map(
                    (projectCoordinator, cooIndex) => (
                      <ExperiencesRender
                        key={cooIndex}
                        title={projectCoordinator.title}
                        company={projectCoordinator.company}
                        date={projectCoordinator.date}
                      />
                    )
                  )}
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            For 15 years, I have been committed to supporting people with
            disabilities.{' '}
          </AccordionTrigger>
          <AccordionContent>
            {experiences &&
              experiences.map((experience, expIndex) => (
                <div key={expIndex}>
                  {experience.nurseAssistant.map((nurseAssistant, cooIndex) => (
                    <ExperiencesRender
                      key={cooIndex}
                      title={nurseAssistant.title}
                      company={nurseAssistant.company}
                      date={nurseAssistant.date}
                    />
                  ))}
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CardExperiences;
