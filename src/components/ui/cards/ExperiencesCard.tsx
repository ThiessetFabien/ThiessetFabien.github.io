/**
 * @file CardProjects.tsx
 * @description This file exports a component that renders a list of project cards.
 */

import React from 'react';

import { ExperiencesList } from '@/src/components/ui/lists/ExperiencesList';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/lib/components/ui/tabs';
import { cn } from '@/src/lib/utils';
import { capitalizeFirstLetterOfPhrase } from '@/src/lib/utils/formatText.util';
import { cnBorder } from '@/src/styles/border.style';
import {
  cnSmallPaddingBottom,
  cnSmallPaddingX,
  cnSmallSpaceY,
} from '@/src/styles/boxModel.style';
import { cnParagraph } from '@/src/styles/font.style';
import type { ExperienceProps } from '@/src/types/ExperienceProps';
import type { ExperiencesProps } from '@/src/types/ExperiencesProps';
import type { OtherExperienceProps } from '@/src/types/OtherExperiencesProps';
import type { CardProps } from '@src/types/CardProps';

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
          <Tabs
            defaultValue='developer'
            className={cn(cnBorder, 'w-full', 'bg-popover')}
          >
            <TabsList className='w-full'>
              <TabsTrigger value='developer'>Software Developer</TabsTrigger>
              <TabsTrigger
                value='other-experiences'
                className={'flex w-full justify-start'}
              >
                Other Experiences
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value='developer'
              id='tab-developer'
              aria-labelledby='tab-developer'
              className={cn(
                cnSmallSpaceY,
                cnSmallPaddingX,
                cnSmallPaddingBottom
              )}
            >
              {experience?.developerDescription && (
                <p className={cn(cnParagraph, cnSmallPaddingX)}>
                  {capitalizeFirstLetterOfPhrase(
                    experience.developerDescription
                  )}
                </p>
              )}
              {experience?.developer.map((developer, developerIndex) => (
                <ExperiencesList
                  key={developerIndex}
                  title={developer.title}
                  company={developer.company}
                  date={developer.date}
                />
              ))}
            </TabsContent>
            <TabsContent
              value='other-experiences'
              id='tab-other-experiences'
              aria-labelledby='tab-other-experiences'
              className={cn(
                cnSmallSpaceY,
                cnSmallPaddingX,
                cnSmallPaddingBottom
              )}
            >
              {experience?.projectCoordinatorDescription && (
                <p className={cn(cnParagraph, cnSmallPaddingX)}>
                  {capitalizeFirstLetterOfPhrase(
                    experience?.projectCoordinatorDescription
                  )}
                </p>
              )}
              {experience?.projectCoordinator.map(
                (projectCoordinator, projectCoordinatorIndex) => (
                  <ExperiencesList
                    key={projectCoordinatorIndex}
                    title={projectCoordinator.title}
                    company={projectCoordinator.company}
                    date={projectCoordinator.date}
                  />
                )
              )}
              {experience?.nurseAssistantDescription && (
                <p className={cn(cnParagraph, cnSmallPaddingX)}>
                  {capitalizeFirstLetterOfPhrase(
                    experience?.nurseAssistantDescription
                  )}
                </p>
              )}
              {experience?.nurseAssistant.map(
                (nurseAssistant, nurseAssistantIndex) => (
                  <ExperiencesList
                    key={nurseAssistantIndex}
                    title={nurseAssistant.title}
                    company={nurseAssistant.company}
                    date={nurseAssistant.date}
                  />
                )
              )}
            </TabsContent>
          </Tabs>
        </article>
      ))}
    </section>
  );
};
