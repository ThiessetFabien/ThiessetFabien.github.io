import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
  cnLightTextMuted,
  cnParagraph,
  cnTitle3,
} from '@/styles/fontStyles';
import { lineThroughItem } from '@/styles/lineThroughStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnMarginRight } from '@/styles/boxModelStyles';
import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';

import type { ExperienceProps } from '@/types/ExperienceProps';

export const ExperiencesList: React.FC<{
  title: ExperienceProps['title'];
  company: ExperienceProps['company'];
  date: ExperienceProps['date'];
}> = ({ title, company, date }) => {
  return (
    <ul className={'w-full'}>
      <li className={'flex'}>
        <Dot
          className={cn(cnMarginRight, 'shrink-0', 'text-primary')}
          size={28}
        />
        <div className={cn(cnFlexCol)}>
          <h3
            className={cn(
              cnTitle3,
              'xs:flex xs:flex-row',
              lineThroughItem(date || '')
            )}
          >
            {title && capitalizeFirstLetterOfEachWord(title)}
            <span className={cn('block xs:flex', 'text-primary')}>
              &nbsp;@{' '}
              {company &&
                capitalizeFirstLetterOfEachWord(formatSpecialWords(company))}
            </span>
          </h3>
          <p className={cn(cnParagraph, cnLightTextMuted)}>
            {date && capitalizeFirstLetterOfEachWord(date)}
          </p>
        </div>
      </li>
    </ul>
  );
};
