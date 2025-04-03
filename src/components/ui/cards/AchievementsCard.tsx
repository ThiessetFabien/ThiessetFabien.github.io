import { cnSmallGap } from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
import {
  cnLightTextMuted,
  cnParagraph,
  cnSmallText,
} from '@/src/styles/font.style';
import { cnSizeIcon } from '@/src/styles/size.style';
import { IconName } from '@/src/types/IconNameProps';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import { IconLoader } from '@ui/icons/IconLoader';

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
              className={cn(index < 2 ? 'text-primary' : 'text-secondary')}
              aria-hidden='true'
            >
              <IconLoader
                icon={achievement.icon as IconName}
                className={cnSizeIcon}
              />
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
