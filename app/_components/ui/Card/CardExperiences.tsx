'use client';

import React from 'react';
import {
  MapPin,
  CalendarClock,
  ChevronsUpDown,
  ChevronsDownUp,
} from 'lucide-react';
import { CardTitle } from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/lib/components/ui/collapsible';
import { ExperiencesProps } from '@/types/ExperiencesProps';

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

export const CardExperiences: React.FC<ExperiencesProps> = ({
  experiences,
  className,
}) => {
  const isFinished = (date: string) => {
    return date.includes('present')
      ? 'font-semibold'
      : 'line-through text-muted-foreground';
  };

  const hideCompagny = (company: string) => {
    return company === '' ? 'hidden' : '';
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <ScrollArea className='mb-4 h-64 w-full rounded-md border p-4 md:p-6'>
        {experiences.map((experience, expIndex) => (
          <div key={expIndex}>
            {experience.developer.map((developer, devIndex) => (
              <div
                key={devIndex}
                className='flex items-center justify-between space-x-3'
              >
                <CardTitle
                  className={cn(
                    className,
                    'max-w-5xl font-caption text-base font-bold leading-tight tracking-tight md:text-lg',
                    isFinished(developer.date)
                  )}
                >
                  {developer.title}
                </CardTitle>
                <div className='flex flex-col'>
                  <Badge
                    variant='outline'
                    className={cn(
                      className,
                      'm-1 flex w-full items-center justify-end border-0 text-right text-xs font-bold',
                      hideCompagny(developer.company)
                    )}
                  >
                    {developer.company}
                    <MapPin
                      size={16}
                      className={cn('ml-1', hideCompagny(developer.company))}
                    />
                  </Badge>
                  <Badge
                    variant='outline'
                    className={cn(
                      className,
                      'm-1 flex w-full items-center justify-end border-0 text-right text-xs font-light'
                    )}
                  >
                    {developer.date}
                    <CalendarClock size={16} className='ml-1' />
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ))}
      </ScrollArea>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='mb-4 w-full space-y-2'
      >
        <div className='flex items-center justify-between space-x-4'>
          <p className='text-base font-light leading-relaxed text-muted-foreground'>
            I have over 6 years of professional experience in project
            coordination and Humanitude label.
          </p>
          <CollapsibleTrigger asChild>
            <Button variant='secondary' size='sm'>
              {isOpen ? (
                <ChevronsDownUp className='h-4 w-4' />
              ) : (
                <ChevronsUpDown className='h-4 w-4' />
              )}
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='space-y-2'>
          <div className='rounded-md border px-4 py-2 text-sm shadow-sm'>
            {experiences.map((experience, expIndex) => (
              <div key={expIndex}>
                {experience.projectCoordinator.map(
                  (projectCoordinator, projectCooIndex) => (
                    <div
                      key={projectCooIndex}
                      className='flex items-center justify-between space-x-3'
                    >
                      <CardTitle
                        className={cn(
                          className,
                          'max-w-5xl font-caption text-base font-bold leading-tight tracking-tight md:text-lg',
                          isFinished(projectCoordinator.date)
                        )}
                      >
                        {projectCoordinator.title}
                      </CardTitle>
                      <div className='flex flex-col'>
                        <Badge
                          variant='outline'
                          className={cn(
                            className,
                            'm-1 flex w-full items-center justify-end border-0 text-right text-xs font-bold',
                            hideCompagny(projectCoordinator.company)
                          )}
                        >
                          {projectCoordinator.company}
                          <MapPin
                            size={16}
                            className={cn(
                              'ml-1',
                              hideCompagny(projectCoordinator.company)
                            )}
                          />
                        </Badge>
                        <Badge
                          variant='outline'
                          className={cn(
                            className,
                            'm-1 flex w-full items-center justify-end border-0 text-right text-xs font-light'
                          )}
                        >
                          {projectCoordinator.date}
                          <CalendarClock size={16} className='ml-1' />
                        </Badge>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>{' '}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='w-full space-y-2'
      >
        <div className='flex items-center justify-between space-x-4'>
          <p className='text-base font-light leading-relaxed text-muted-foreground'>
            Additionally, I have more than 15 years in paramedical support for
            individuals with disabilities.
          </p>
        </div>
        <CollapsibleContent className='space-y-2'>
          <div className='rounded-md border px-4 py-2 text-sm shadow-sm'>
            {experiences.map((experience, expIndex) => (
              <div key={expIndex}>
                {experience.nurseAssistant.map(
                  (nurseAssistant, projectCooIndex) => (
                    <div
                      key={projectCooIndex}
                      className='flex items-center justify-between space-x-3'
                    >
                      <CardTitle
                        className={cn(
                          className,
                          'max-w-5xl font-caption text-base font-bold leading-tight tracking-tight md:text-lg',
                          isFinished(nurseAssistant.date)
                        )}
                      >
                        {nurseAssistant.title}
                      </CardTitle>
                      <div className='flex flex-col'>
                        <Badge
                          variant='outline'
                          className={cn(
                            className,
                            'm-1 flex w-full items-center justify-end border-0 text-right text-xs font-bold',
                            hideCompagny(nurseAssistant.company)
                          )}
                        >
                          {nurseAssistant.company}
                          <MapPin
                            size={16}
                            className={cn(
                              'ml-1',
                              hideCompagny(nurseAssistant.company)
                            )}
                          />
                        </Badge>
                        <Badge
                          variant='outline'
                          className={cn(
                            className,
                            'm-1 flex w-full items-center justify-end border-0 text-right text-xs font-light'
                          )}
                        >
                          {nurseAssistant.date}
                          <CalendarClock size={16} className='ml-1' />
                        </Badge>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>{' '}
    </>
  );
};

export default CardExperiences;
