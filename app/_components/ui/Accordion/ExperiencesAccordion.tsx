import {
  AccordionTrigger,
  AccordionContent,
} from '@/lib/components/ui/accordion';
import { ExperiencesList } from '@/ui/List/ExperiencesList';
import type { CardProps } from '@/types/CardProps';
import type { Experience } from '@/types/ExperienceProps';
import type { Experiences } from '@/types/ExperiencesProps';
import type { OtherExperience } from '@/types/OtherExperienceProps';
import { cnParagraph } from '@/styles/fontStyles';
import { cn } from '@/lib/utils';
import { cnSpaceX } from '@/styles/boxModelStyles';

export const ExperiencesAccordion: React.FC<
  CardProps & Experiences & OtherExperience
> = ({ experiences, content, className }) => {
  return (
    <div className={className}>
      <AccordionTrigger className={cn(cnParagraph, cnSpaceX, 'min-w-full')}>
        {content}
      </AccordionTrigger>
      <AccordionContent>
        {experiences &&
          experiences.map((item: Experience, index: number) => (
            <ExperiencesList
              key={index}
              title={item.title}
              company={item.company}
              date={item.date}
            />
          ))}
      </AccordionContent>
    </div>
  );
};
