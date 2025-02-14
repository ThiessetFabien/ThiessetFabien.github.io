import { cn } from '@lib/utils';
import { IconLoader } from '@services/IconLoader';
import type { CardProps } from '@src/types/CardProps';
import { cnSmallGap } from '@styles/boxModelStyles';
import { cnFlexCol } from '@styles/flexStyles';
import { cnLightTextMuted, cnParagraph, cnSmallText } from '@styles/fontStyles';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from '@utils/FormatText';

export const AchievementsCard: React.FC<{
  achievements: CardProps['achievements'];
  className: CardProps['className'];
}> = ({ achievements, className }) => {
  return (
    <section aria-labelledby='achievements-heading'>
      <h2 id='achievements-heading' className='sr-only'>
        Achievements
      </h2>
      <ul className={className}>
        {achievements?.map((achievement, index) => (
          <li key={index} className={cn(cnSmallGap, 'flex')}>
            <div
              className={cn(
                'flex-shrink-0',
                index < 2 ? 'text-primary' : 'text-secondary'
              )}
              aria-hidden='true'
            >
              {IconLoader(achievement.icon || '')}
            </div>
            <div className={cnFlexCol}>
              <p className={cn(cnParagraph, 'min-w-full')}>
                {capitalizeFirstLetterOfEachWord(
                  formatSpecialWords(achievement.title)
                )}
                <span className={cn(cnSmallText, cnLightTextMuted)}>
                  &nbsp;&bull;&nbsp;
                  <time dateTime={achievement.date}>
                    {capitalizeFirstLetterOfEachWord(achievement.date)}
                  </time>
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
