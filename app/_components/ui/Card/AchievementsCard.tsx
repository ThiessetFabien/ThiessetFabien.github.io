import type { CardProps } from '@/types/CardProps';
import { IconLoader } from '@/hooks/IconLoader';
import { cn } from '@/lib/utils';
import { cnSmallGap } from '@/styles/boxModelStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnParagraph, cnSmallText } from '@/styles/fontStyles';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from '@/hooks/FormatText';
import { cnLightTextMuted } from '@/styles/fontStyles';

export const AchievementsCard: React.FC<{
  achievements: CardProps['achievements'];
  className: CardProps['className'];
}> = ({ achievements, className }) => {
  return (
    <ul className={className}>
      {achievements &&
        achievements.map((achievement, index) => (
          <li key={index} className={cn(cnSmallGap, 'flex')}>
            <div
              className={cn(
                'flex-shrink-0',
                index < 2 ? 'text-primary' : 'text-secondary'
              )}
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
                  {capitalizeFirstLetterOfEachWord(achievement.date)}
                </span>
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
};
