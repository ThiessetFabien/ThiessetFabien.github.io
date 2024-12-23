import {
  AccordionTrigger,
  AccordionContent,
} from '@/lib/components/ui/accordion';
import { ExperiencesList } from '@/ui/List/ExperiencesList';
import { Experience } from '@/types/ExperienceProps';
import { cnParagraph } from '@/styles/fontStyles';
import { cn } from '@/lib/utils';
import { cnSpaceX } from '@/styles/boxModelStyles';

export const ExperiencesAccordion: React.FC<{
  experience: Experience[];
  content: string;
  className?: string;
}> = ({ experience, content, className }) => {
  return (
    <div className={className}>
      <AccordionTrigger className={cn(cnParagraph, cnSpaceX, 'min-w-full')}>
        {content}
      </AccordionTrigger>
      <AccordionContent>
        {experience.map((item: Experience, index: number) => (
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
