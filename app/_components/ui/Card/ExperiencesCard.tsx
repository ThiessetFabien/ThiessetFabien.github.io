/**
 * @file CardProjects.tsx
 * @description This file exports a component that renders a list of project cards.
 */
import React from 'react';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { cnBorder } from '@/styles/borderStyles';
import { cnPaddingY } from '@/styles/boxModelStyles';
import { Accordion, AccordionItem } from '@/lib/components/ui/accordion';
import { ExperiencesAccordion } from '@/ui/Accordion/ExperiencesAccordion';
import { ExperiencesList } from '@/ui/List/ExperiencesList';
import type { CardProps } from '@/types/CardProps';
import type { Experiences } from '@/types/ExperiencesProps';
import type { OtherExperience } from '@/types/OtherExperienceProps';

/**
 * CardProjects component.
 * @param {Object} props - The props for the component.
 * @param {Projects[]} props.projects - An array of project objects to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered CardProjects component.
 * @example
 * <CardProjects projects={projects} className="custom-class" />
 */

export const CardExperiences: React.FC<
  CardProps & Experiences & OtherExperience
> = ({ experiences }) => {
  return (
    <>
      {experiences &&
        experiences.map((experience, index) => (
          <div key={index}>
            <ScrollArea
              className={cn(
                'w-full',
                cnBorder,
                'h-56',
                'xxs:h-[12.5rem]',
                'xs:h-40',
                'sm:h-42',
                'md:h-48',
                'lg:h-32',
                cnPaddingY
              )}
            >
              {experience.developer.map((developer, developerIndex) => (
                <ExperiencesList
                  key={developerIndex}
                  title={developer.title}
                  company={developer.company}
                  date={developer.date}
                />
              ))}
            </ScrollArea>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value={`projectCoordinator-${index}`}>
                <ExperiencesAccordion
                  className='border border-background'
                  content={experience.projectCoordinator.content}
                  experiences={experience.projectCoordinator.items}
                />
              </AccordionItem>
              <AccordionItem value={`nurseAssistant-${index}`}>
                <ExperiencesAccordion
                  content={experience.nurseAssistant?.content}
                  experiences={experience.nurseAssistant.items}
                />
              </AccordionItem>
            </Accordion>
          </div>
        ))}
    </>
  );
};

export default CardExperiences;
