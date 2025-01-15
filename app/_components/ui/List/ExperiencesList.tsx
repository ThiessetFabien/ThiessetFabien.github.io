import { cnSpaceY } from '@/styles/boxModelStyles';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  cnParagraph,
  cnTitle3,
} from '@/styles/fontStyles';
import { hideItem } from '@/styles/hideItemStyles';
import { lineThroughItem } from '@/styles/lineThroughStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnMarginRight } from '@/styles/boxModelStyles';
import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';
import { Badge } from '@/lib/components/ui/badge';
import { useIsMd } from '@/hooks/useMediaQuery';

import type { ExperienceProps } from '@/types/ExperienceProps';

export const ExperiencesList: React.FC<{
  title: ExperienceProps['title'];
  company: ExperienceProps['company'];
  date: ExperienceProps['date'];
}> = ({ title, company, date }) => {
  const isMd = useIsMd();
  return (
    <>
      <ul className={cn(cnSpaceY, lineThroughItem(date || ''), 'w-full')}>
        <li className={'flex'}>
          <Dot
            className={cn(cnMarginRight, 'shrink-0', 'text-primary')}
            size={28}
          />
          <div className={cn(cnFlexCol, 'md:flex-row')}>
            <h3 className={cn(cnTitle3)}>
              {title && capitalizeFirstLetterOfEachWord(title)}
              <span className={cn('text-primary', hideItem(company || ''))}>
                &nbsp;@ {company && capitalizeFirstLetterOfEachWord(company)}
              </span>
            </h3>
            <Badge
              variant='outline'
              className={cn('border-0 p-0', cnParagraph)}
            >
              {isMd
                ? `\u00A0${date && capitalizeFirstLetterOfEachWord(date)}`
                : date && capitalizeFirstLetterOfEachWord(date)}
            </Badge>
          </div>
        </li>
      </ul>
    </>
  );
};
