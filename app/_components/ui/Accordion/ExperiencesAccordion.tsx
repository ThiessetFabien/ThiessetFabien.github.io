import {
  AccordionTrigger,
  AccordionContent,
} from '@/lib/components/ui/accordion';
import { ExperiencesList } from '@/ui/List/ExperiencesList';
import { Experience } from '@/types/ExperienceProps.jsx';

export const ExperiencesAccordion: React.FC<{
  experience: Experience[];
  content: string;
}> = ({ experience, content }) => {
  return (
    <>
      <AccordionTrigger>{content}</AccordionTrigger>
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
