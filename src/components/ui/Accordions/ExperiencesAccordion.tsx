import type { ExperienceProps } from '@/src/types/ExperienceProps';
import type { OtherExperienceProps } from '@/src/types/OtherExperiencesProps';
import {
  AccordionContent,
  AccordionTrigger,
} from '@lib/components/ui/accordion';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@lib/components/ui/hover-card';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import { cnBorder } from '@styles/borderStyles';
import { cnSpaceX } from '@styles/boxModelStyles';
import { cnParagraph, cnSmallText } from '@styles/fontStyles';
import { ExperiencesList } from '@ui/Lists/ExperiencesList';
import { capitalizeFirstLetterOfPhrase } from '@utils/FormatText';

export const ExperiencesAccordion: React.FC<{
  experience: ExperienceProps[];
  content?: OtherExperienceProps['content'];
  className: CardProps['className'];
}> = ({ experience, content, className }) => {
  return (
    <div className={className}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <AccordionTrigger
            className={cn(cnParagraph, cnSpaceX, 'min-w-full')}
            aria-expanded='false'
            aria-controls='accordion-content'
            id='accordion-trigger'
          >
            {content && capitalizeFirstLetterOfPhrase(content)}
          </AccordionTrigger>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className={cnSmallText}>
            Click to view this experience in more detail.
          </p>
        </HoverCardContent>
        <AccordionContent
          id='accordion-content'
          aria-labelledby='accordion-trigger'
          className={cn(cnBorder, 'bg-popover')}
        >
          {experience &&
            experience.map((item, index: number) => (
              <ExperiencesList
                key={index}
                title={item.title}
                company={item.company}
                date={item.date}
              />
            ))}
        </AccordionContent>
      </HoverCard>
    </div>
  );
};
