import type { CardProps } from '@/types/CardProps';
import { IconLoader } from '@/hooks/IconLoader';
import { cn } from '@/lib/utils';
import { cnSmallGap } from '@/styles/boxModelStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  cnParagraph,
} from '@/styles/fontStyles';
import { Badge } from '@/lib/components/ui/badge';
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
            <div className='flex-shrink-0 text-primary'>
              {IconLoader(achievement.icon || '')}
            </div>
            <div className={cnFlexCol}>
              <h3 className={cn(cnParagraph, 'min-w-full')}>
                {capitalizeFirstLetterOfEachWord(achievement.title)}
              </h3>
              <Badge
                variant='outline'
                className={cn(
                  'border-0 p-0',
                  'min-w-full',
                  cnParagraph,
                  cnLightTextMuted
                )}
              >
                {capitalizeFirstLetterOfPhrase(achievement.date)}
              </Badge>
            </div>
          </li>
        ))}
    </ul>
  );
};
