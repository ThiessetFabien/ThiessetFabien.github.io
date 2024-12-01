import { MapPin, CalendarClock } from 'lucide-react';
import { Experiences } from '@/types/Experiences';
import { CardTitle } from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

export const ExperiencesSection = ({
  experiences,
  className,
}: {
  experiences: Experiences[];
  className?: string;
}) => {
  const isFinished = (experience: Experiences) => {
    return experience.date.includes('present')
      ? ''
      : 'line-through text-secondary';
  };
  const noCompagny = (experience: Experiences) => {
    return experience.company === '' ? 'hidden' : '';
  };

  return (
    <ScrollArea className='h-[16.5rem] w-full rounded-md border p-4'>
      {experiences.map((experience, index) => (
        <div
          key={index}
          className='flex items-center justify-between space-x-3'
        >
          <CardTitle
            className={`${className} max-w-3xl font-caption text-xl leading-tight tracking-tight ${isFinished(experience)}`}
          >
            {experience.title}
          </CardTitle>
          <div className='flex w-1/3 flex-col'>
            <Badge
              variant='outline'
              className={`${className} m-1 flex w-full items-center justify-end border-0 text-right text-sm font-bold ${noCompagny(experience)}`}
            >
              {experience.company}
              <MapPin size={20} className={`ml-1 ${noCompagny(experience)}`} />
            </Badge>
            <Badge
              variant='outline'
              className={`${className} m-1 flex w-full items-center justify-end border-0 text-right text-xs font-light`}
            >
              {experience.date}
              <CalendarClock size={16} className={`ml-1`} />
            </Badge>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
