/**
 * @file CardProjects.tsx
 * @description This file exports a component that renders a list of project cards.
 */
import React from 'react';

import { Accordion, AccordionItem } from '@/lib/components/ui/accordion';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { cnBorder } from '@/styles/borderStyles';
import type { CardProps } from '@/types/CardProps';
import type { ExperienceProps } from '@/types/ExperienceProps';
import type { ExperiencesProps } from '@/types/ExperiencesProps';
import type { OtherExperienceProps } from '@/types/OtherExperiencesProps';
import { ExperiencesAccordion } from 'components/ui/Accordions/ExperiencesAccordion';
import { ExperiencesList } from 'components/ui/Lists/ExperiencesList';

/**
 * CardProjects component.
 * @param {Object} props - The props for the component.
 * @param {Projects[]} props.projects - An array of project objects to be displayed.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered CardProjects component.
 * @example
 * <CardProjects projects={projects} className="custom-class" />
 */

export const ExperiencesCard: React.FC<{
  experiences: ExperiencesProps[];
  experience?: ExperienceProps[] | OtherExperienceProps['items'];
  content?: OtherExperienceProps['content'];
  className: CardProps['className'];
}> = ({ experiences, className }) => {
  return (
    <section className={className} aria-labelledby='experiences-heading'>
      <h2 id='experiences-heading' className='sr-only'>
        Experiences
      </h2>
      {experiences?.map((experience, index) => (
        <article key={index}>
          <ScrollArea
            type='always'
            className={cn(
              cnBorder,
              'w-full',
              'h-[10.25rem]',
              'xxs:h-[6.25rem]',
              'sm:h-[6.875rem]',
              'md:h-[7.875rem]',
              'bg-popover'
            )}
          >
            {experience?.developer.map((developer, developerIndex) => (
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
                content={
                  (
                    experience?.projectCoordinator as unknown as OtherExperienceProps
                  ).content
                }
                experience={
                  (
                    experience?.projectCoordinator as unknown as OtherExperienceProps
                  ).items
                }
                className=''
              />
            </AccordionItem>
            <AccordionItem value={`nurseAssistant-${index}`}>
              <ExperiencesAccordion
                content={
                  (
                    experience?.nurseAssistant as unknown as OtherExperienceProps
                  ).content
                }
                experience={
                  (
                    experience?.nurseAssistant as unknown as OtherExperienceProps
                  ).items
                }
                className=''
              />
            </AccordionItem>
          </Accordion>
        </article>
      ))}
    </section>
  );
};
