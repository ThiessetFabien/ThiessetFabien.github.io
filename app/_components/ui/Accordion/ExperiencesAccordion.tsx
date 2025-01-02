import {
  AccordionTrigger,
  AccordionContent,
} from '@/lib/components/ui/accordion';
import { ExperiencesList } from '@/ui/List/ExperiencesList';
import type { CardProps } from '@/types/CardProps';
import type { ExperienceProps } from '@/types/ExperienceProps';
import type { OtherExperienceProps } from '@/types/OtherExperienceProps';
import { cnParagraph } from '@/styles/fontStyles';
import { cn } from '@/lib/utils';
import { cnSpaceX } from '@/styles/boxModelStyles';

export const ExperiencesAccordion: React.FC<{
  experiences: ExperienceProps[];
  content?: OtherExperienceProps['content'];
  className?: CardProps['className'];
}> = ({ experiences, content, className }) => {
  return (
    <div className={className}>
      <AccordionTrigger className={cn(cnParagraph, cnSpaceX, 'min-w-full')}>
        {content}
      </AccordionTrigger>
      <AccordionContent>
        {experiences &&
          experiences.map((item, index: number) => (
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
