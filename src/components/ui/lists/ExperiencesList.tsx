import { cnMarginX } from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
import {
  cnLightTextMuted,
  cnSmallText,
  cnTitle3,
} from '@/src/styles/font.style';
import type { ExperienceProps } from '@/src/types/ExperienceProps';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { cn } from '@lib/utils';

export const ExperiencesList: React.FC<{
  title: ExperienceProps['title'];
  company: ExperienceProps['company'];
  date: ExperienceProps['date'];
}> = ({ title, company, date }) => {
  return (
    <ul className={'w-full'}>
      <li className='flex'>
        <div
          className={cn(
            cnMarginX,
            'h-2 w-2 translate-y-2 rounded-full bg-ring'
          )}
        />
        <div className={cn(cnFlexCol, 'sm:flex-row')}>
          <p className={cn(cnTitle3, cnFlexCol, 'items-baseline sm:flex-row')}>
            <span>{title && capitalizeFirstLetterOfEachWord(title)}</span>
            <span className='hidden w-auto sm:flex'>&nbsp;</span>
            <span className={cn('inline-block text-secondary')}>
              @
              {company &&
                capitalizeFirstLetterOfEachWord(formatSpecialWords(company))}
            </span>
            <span className='hidden w-auto sm:flex'>&nbsp;</span>
            <span className={cn(cnSmallText, cnLightTextMuted)}>
              {date && capitalizeFirstLetterOfEachWord(date)}
            </span>
          </p>
        </div>
      </li>
    </ul>
  );
};
