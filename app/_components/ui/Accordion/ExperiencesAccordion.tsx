import {
  AccordionTrigger,
  AccordionContent,
} from '@/lib/components/ui/accordion';
import { ExperiencesList } from '@/ui/List/ExperiencesList';
import { Experience } from '@/types/ExperienceProps';
import { cnParagraph } from '@/styles/fontStyles';
import { cn } from '@/lib/utils';

export const ExperiencesAccordion: React.FC<{
  experience: Experience[];
  content: string;
}> = ({ experience, content }) => {
  return (
    <>
      <AccordionTrigger className={cn(cnParagraph, 'min-w-full')}>
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
    </>
  );
};
