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
import { hideItem, cnHidden } from '@/styles/hideItemStyles';
import { cnBorder } from '@/styles/borderStyles';
import { lineThroughItem } from '@/styles/lineThroughStyles';
import { cnDescription, cnParagraph, cnTitle2 } from '@/styles/fontStyles';
import { cnFlex, cnFlexCol } from '@/styles/flexStyles';
import {
  cnMarginPadding,
  cnSpaceY,
  cnSmallSpaceY,
} from '@/styles/boxModelStyles';
import { sizeIcon } from '@/styles/sizeStyles';
import { cnBadgeRight } from '@/styles/badgeStyles';
import CardProps from '@/types/CardProps';

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

export const CardExperiences: React.FC<CardProps> = ({
  experiences,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cnSpaceY}>
      <ScrollArea
        className={cn(
          'w-full',
          cnBorder,
          'md:[18rem] h-56 sm:h-64',
          cnMarginPadding
        )}
      >
        {experiences &&
          experiences.map((experience, expIndex) => (
            <div key={expIndex}>
              {experience.developer.map((developer, devIndex) => (
                <div key={devIndex} className={cn(cnFlex, cnSmallSpaceY)}>
                  <CardTitle
                    className={cn(
                      className,
                      cnTitle2,
                      lineThroughItem(developer.date)
                    )}
                  >
                    {developer.title}
                  </CardTitle>
                  <div className={cn(cnFlexCol, cnSmallSpaceY)}>
                    <Badge
                      variant='outline'
                      className={cn(
                        className,
                        cnParagraph,
                        cnBadgeRight,
                        'text-xs font-bold',
                        hideItem(developer.company)
                      )}
                    >
                      {developer.company}
                      <MapPin
                        className={cn(
                          'ml-1',
                          cnHidden,
                          sizeIcon,
                          hideItem(developer.company)
                        )}
                      />
                    </Badge>
                    <Badge
                      variant='outline'
                      className={cn(
                        className,
                        cnParagraph,
                        cnBadgeRight,
                        'text-xs'
                      )}
                    >
                      {developer.date}
                      <CalendarClock
                        className={cn('ml-1', sizeIcon, cnHidden)}
                      />
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
        className={cn('w-full', 'space-y-2')}
      >
        <div className={cn(cnFlex)}>
          {' '}
          <p className={cn(cnDescription, 'text-muted-foreground')}>
            I have over 6 years of professional experience in project
            coordination and Humanitude label.
          </p>
          <CollapsibleTrigger asChild>
            <Button variant='secondary' size='sm'>
              {isOpen ? (
                <ChevronsDownUp className={sizeIcon} />
              ) : (
                <ChevronsUpDown className={sizeIcon} />
              )}
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='space-y-2'>
          <div className={cn(cnBorder, 'px-4 py-2 text-sm')}>
            {experiences &&
              experiences.map((experience, expIndex) => (
                <div key={expIndex}>
                  {experience.projectCoordinator.map(
                    (projectCoordinator, projectCooIndex) => (
                      <div
                        key={projectCooIndex}
                        className={cn(cnFlex, 'space-x-3')}
                      >
                        <CardTitle
                          className={cn(
                            className,
                            cnTitle2,
                            lineThroughItem(projectCoordinator.date)
                          )}
                        >
                          {projectCoordinator.title}
                        </CardTitle>
                        <div className={cnFlexCol}>
                          <Badge
                            variant='outline'
                            className={cn(
                              className,
                              cnParagraph,
                              cnBadgeRight,
                              'text-xs font-bold',
                              hideItem(projectCoordinator.company)
                            )}
                          >
                            {projectCoordinator.company}
                            <MapPin
                              className={cn(
                                'ml-1',
                                cnHidden,
                                sizeIcon,
                                hideItem(projectCoordinator.company)
                              )}
                            />
                          </Badge>
                          <Badge
                            variant='outline'
                            className={cn(
                              className,
                              cnParagraph,
                              cnBadgeRight,
                              'text-xs'
                            )}
                          >
                            {projectCoordinator.date}
                            <CalendarClock
                              className={cn('ml-1', sizeIcon, cnHidden)}
                            />
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
        className={cn('w-full', 'space-y-2')}
      >
        <div className={cn(cnFlex, 'space-x-4')}>
          <p className={cn(cnDescription, 'text-muted-foreground')}>
            Additionally, I have more than 15 years in paramedical support for
            individuals with disabilities.
          </p>
        </div>
        <CollapsibleContent className='space-y-2'>
          <div className={cn(cnBorder, 'px-4 py-2 text-sm shadow-sm')}>
            {experiences &&
              experiences.map((experience, expIndex) => (
                <div key={expIndex}>
                  {experience.nurseAssistant.map(
                    (nurseAssistant, projectCooIndex) => (
                      <div
                        key={projectCooIndex}
                        className={cn(cnFlex, 'space-x-3')}
                      >
                        <CardTitle
                          className={cn(
                            className,
                            cnTitle2,
                            lineThroughItem(nurseAssistant.date)
                          )}
                        >
                          {nurseAssistant.title}
                        </CardTitle>
                        <div className='flex flex-col'>
                          <Badge
                            variant='outline'
                            className={cn(
                              className,
                              cnParagraph,
                              cnBadgeRight,
                              'text-xs font-bold',
                              hideItem(nurseAssistant.company)
                            )}
                          >
                            {nurseAssistant.company}
                            <MapPin
                              className={cn(
                                'ml-1',
                                cnHidden,
                                sizeIcon,
                                hideItem(nurseAssistant.company)
                              )}
                            />
                          </Badge>
                          <Badge
                            variant='outline'
                            className={cn(
                              className,
                              cnParagraph,
                              cnBadgeRight,
                              'text-xs'
                            )}
                          >
                            {nurseAssistant.date}
                            <CalendarClock
                              className={cn('ml-1', sizeIcon, cnHidden)}
                            />
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
    </div>
  );
};

export default CardExperiences;
