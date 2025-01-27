import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from '@/hooks/FormatText';
import { cn } from '@/lib/utils';
import { cnMarginX } from '@/styles/boxModelStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnLightTextMuted, cnSmallText, cnTitle3 } from '@/styles/fontStyles';
import type { ExperienceProps } from '@/types/ExperienceProps';

export const ExperiencesList: React.FC<{
  title: ExperienceProps['title'];
  company: ExperienceProps['company'];
  date: ExperienceProps['date'];
}> = ({ title, company, date }) => {
  return (
    <ul className={'w-full'}>
      <li className={'flex'}>
        <div
          className={cn(
            cnMarginX,
            'h-2 w-2 translate-y-2 rounded-full bg-ring'
          )}
          // className={cn(cnMarginRight, 'shrink-0', 'text-primary')}
        ></div>
        <div className={cn(cnFlexCol)}>
          <h3 className={cn(cnTitle3, 'xs:flex xs:flex-row')}>
            {title && capitalizeFirstLetterOfEachWord(title)}
            <span className={cn('block xs:flex', 'text-secondary')}>
              &nbsp;@{' '}
              {company &&
                capitalizeFirstLetterOfEachWord(formatSpecialWords(company))}
            </span>
          </h3>
          <p className={cn(cnSmallText, cnLightTextMuted)}>
            {date && capitalizeFirstLetterOfEachWord(date)}
          </p>
        </div>
      </li>
    </ul>
  );
};
