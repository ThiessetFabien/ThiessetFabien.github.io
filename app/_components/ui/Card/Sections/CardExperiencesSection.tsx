import { MapPin, CalendarClock } from 'lucide-react';
import { Experiences } from '@/types/Experiences';
import { CardTitle } from '@/lib/components/ui/card';
import { Skeleton } from '@/lib/components/ui/skeleton';
import { JSX } from 'react';

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
    <div>
      {experiences.map((experience, index) => (
        <div key={index} className='space-2 flex flex-col'>
          <CardTitle
            className={`${className} max-w-3xl font-caption text-xl leading-tight tracking-tight ${isFinished(experience)}`}
          >
            {experience.title}
          </CardTitle>
          <div className='flex flex-row'>
            <Skeleton
              className={`${className} m-1 flex items-center text-center text-xs font-bold ${isFinished(experience)} ${noCompagny(experience)}`}
            >
              <MapPin className={`mr-1 ${noCompagny(experience)}`} />
              {experience.company}
            </Skeleton>
            <Skeleton
              className={`${className} m-1 flex items-center text-center text-xs font-bold ${isFinished(experience)}`}
            >
              <CalendarClock className={`mr-1`} />
              {experience.date}
            </Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
};
