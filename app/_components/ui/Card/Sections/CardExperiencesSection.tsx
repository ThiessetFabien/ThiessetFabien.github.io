import { MapPin, CalendarClock, ChevronsUpDown } from 'lucide-react';
import { Experiences } from '@/types/Experiences';
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
import React from 'react';

interface CardExperiencesSectionProps {
  experiences: Experiences[];
  className?: string;
}

export const CardExperiencesSection: React.FC<CardExperiencesSectionProps> = ({
  experiences,
  className,
}) => {
  const isFinished = (date: string) => {
    return date.includes('present')
      ? 'font-bold'
      : 'line-through text-muted-foreground';
  };

  const hideCompagny = (company: string) => {
    return company === '' ? 'hidden' : '';
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <ScrollArea className='mb-4 h-[17.8rem] w-full rounded-md border p-4'>
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
                    'max-w-3xl font-caption text-xl leading-tight tracking-tight',
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
                      'm-1 flex w-full items-center justify-end border-0 text-right text-sm font-bold',
                      hideCompagny(developer.company)
                    )}
                  >
                    {developer.company}
                    <MapPin
                      size={20}
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
                    <CalendarClock size={20} className='ml-1' />
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
              <ChevronsUpDown className='h-4 w-4' />
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
                          'max-w-3xl font-caption text-xl leading-tight tracking-tight',
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
                            'm-1 flex w-full items-center justify-end border-0 text-right text-sm font-bold',
                            hideCompagny(projectCoordinator.company)
                          )}
                        >
                          {projectCoordinator.company}
                          <MapPin
                            size={20}
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
                          <CalendarClock size={20} className='ml-1' />
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
                          'max-w-3xl font-caption text-xl leading-tight tracking-tight',
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
                            'm-1 flex w-full items-center justify-end border-0 text-right text-sm font-bold',
                            hideCompagny(nurseAssistant.company)
                          )}
                        >
                          {nurseAssistant.company}
                          <MapPin
                            size={20}
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
                          <CalendarClock size={20} className='ml-1' />
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

export default CardExperiencesSection;
