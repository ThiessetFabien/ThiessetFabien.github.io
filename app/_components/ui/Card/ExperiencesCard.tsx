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
import {
  cnDescription,
  cnTitle2,
  cnSmallText,
  cnLightTextMuted,
  cnBoldTextMuted,
} from '@/styles/fontStyles';
import { cnFlexBetweenX, cnFlexCenterY, cnFlexCol } from '@/styles/flexStyles';
import {
  cnPadding,
  cnSpaceY,
  cnSmallSpaceY,
  cnSpaceX,
} from '@/styles/boxModelStyles';
import { sizeIcon } from '@/styles/sizeStyles';
import { cnBadgeRight } from '@/styles/badgeStyles';
import type CardProps from '@/types/CardProps';
import { Dot } from 'lucide-react';

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
          'h-56 xxs:h-[12.3rem] xs:h-40 sm:h-52 md:h-60',
          cnPadding
        )}
      >
        {experiences &&
          experiences.map((experience, expIndex) => (
            <div key={expIndex}>
              {experience.developer.map((developer, devIndex) => (
                <div
                  key={devIndex}
                  className={cn(cnFlexBetweenX, cnSmallSpaceY)}
                >
                  <CardTitle
                    className={cn(
                      className,
                      cnFlexCenterY,
                      cnTitle2,
                      lineThroughItem(developer.date)
                    )}
                  >
                    <Dot className='text-primary' size={28} />

                    {developer.title}
                  </CardTitle>
                  <div className={cn(cnFlexCol, cnSmallSpaceY)}>
                    <Badge
                      variant='outline'
                      className={cn(
                        className,
                        cnBadgeRight,
                        cnSmallText,
                        cnBoldTextMuted,
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
                        cnBadgeRight,
                        cnSmallText,
                        cnLightTextMuted
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
        className={cn('w-full', cnSpaceY)}
      >
        <div className={cn(cnFlexBetweenX, cnSpaceX, 'items-start')}>
          {' '}
          <p className={cn(cnDescription, cnLightTextMuted)}>
            I have over 6 years of professional experience in project
            coordination and Humanitude label.
          </p>
          <CollapsibleTrigger asChild>
            {isOpen ? (
              <Button variant='default' size='sm'>
                <ChevronsDownUp className={sizeIcon} />
                <span className='sr-only'>Toggle</span>
              </Button>
            ) : (
              <Button variant='secondary' size='sm'>
                <ChevronsUpDown className={sizeIcon} />
                <span className='sr-only'>Toggle</span>
              </Button>
            )}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent
          className={cn(cnSpaceY, cnBorder, cnSmallText, cnPadding)}
        >
          {experiences &&
            experiences.map((experience, expIndex) => (
              <div key={expIndex}>
                {experience.projectCoordinator.map(
                  (projectCoordinator, projectCooIndex) => (
                    <div
                      key={projectCooIndex}
                      className={cn(cnFlexBetweenX, cnSmallSpaceY)}
                    >
                      <CardTitle
                        className={cn(
                          className,
                          cnFlexCenterY,
                          cnTitle2,
                          lineThroughItem(projectCoordinator.date)
                        )}
                      >
                        <Dot className='text-primary' size={28} />

                        {projectCoordinator.title}
                      </CardTitle>
                      <div className={cnFlexCol}>
                        <Badge
                          variant='outline'
                          className={cn(
                            className,
                            cnSmallText,
                            cnBadgeRight,
                            cnBoldTextMuted,
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
                            cnSmallText,
                            cnBadgeRight,
                            cnLightTextMuted
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
        </CollapsibleContent>
      </Collapsible>{' '}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cnSpaceY}>
        <div className={cn(cnFlexBetweenX, cnSpaceX)}>
          <p className={cn(cnDescription, cnLightTextMuted)}>
            Additionally, I have more than 15 years in paramedical support for
            individuals with disabilities.
          </p>
        </div>
        <CollapsibleContent className={cnSpaceY}>
          <div className={cn(cnBorder, cnSmallText, cnPadding)}>
            {experiences &&
              experiences.map((experience, expIndex) => (
                <div key={expIndex}>
                  {experience.nurseAssistant.map(
                    (nurseAssistant, nurseAssistantIndex) => (
                      <div
                        key={nurseAssistantIndex}
                        className={cn(cnFlexBetweenX, cnSmallSpaceY)}
                      >
                        <CardTitle
                          className={cn(
                            className,
                            cnFlexCenterY,
                            cnTitle2,
                            lineThroughItem(nurseAssistant.date)
                          )}
                        >
                          <Dot className='text-primary' size={28} />
                          {nurseAssistant.title}
                        </CardTitle>
                        <div className={cnFlexCol}>
                          <Badge
                            variant='outline'
                            className={cn(
                              className,
                              cnSmallText,
                              cnBadgeRight,
                              cnBoldTextMuted,
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
                              cnSmallText,
                              cnBadgeRight,
                              cnLightTextMuted
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
