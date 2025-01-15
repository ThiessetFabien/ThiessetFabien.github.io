import { cnSpaceY } from '@/styles/boxModelStyles';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  cnBoldTextMuted,
  cnParagraph,
  cnTitle3,
} from '@/styles/fontStyles';
import { hideItem } from '@/styles/hideItemStyles';
import { lineThroughItem } from '@/styles/lineThroughStyles';
import { cnFlexCenterY, cnFlexCol } from '@/styles/flexStyles';
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
    <ul className={'w-full'}>
      <li className={'flex'}>
        <Dot
          className={cn(cnMarginRight, 'shrink-0', 'text-primary')}
          size={28}
        />
        <div className={cnFlexCol}>
          <h3 className={cn(cnTitle3, lineThroughItem(date || ''))}>
            {title && capitalizeFirstLetterOfEachWord(title)}
            <span className={cn('inline-block', 'text-primary')}>
              &nbsp;@ {company && capitalizeFirstLetterOfEachWord(company)}
            </span>
          </h3>
          <p className={cn(cnParagraph)}>{date}</p>
        </div>
      </li>
    </ul>
  );
};
