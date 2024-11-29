import { Experiences } from '@/types/Experiences';
import { CardTitle } from '@/lib/components/ui/card';
import { Skeleton } from '@/lib/components/ui/skeleton';

export const ExperiencesSection = ({
  experiences,
  className,
}: {
  experiences: Experiences[];
  className?: string;
}) => (
  <div>
    {experiences.map((experience, index) => (
      <div key={index} className='space-2 flex items-center'>
        <CardTitle
          className={`${className} w-2/3 max-w-3xl font-caption text-xl leading-tight tracking-tight`}
        >
          {experience.title}
        </CardTitle>
        <div className='flex w-1/3 flex-col'>
          <Skeleton
            className={`${className} m-2 text-center text-sm font-bold`}
          >
            {experience.company}
          </Skeleton>
          <Skeleton
            className={`${className} m-2 text-center text-sm font-light`}
          >
            {experience.date}
          </Skeleton>
        </div>
      </div>
    ))}
  </div>
);
