import type { CardProps } from '@/types/CardProps';
import { IconLoader } from '@/hooks/IconLoader';
import { cn } from '@/lib/utils';
import { cnSmallSpaceY, cnSpaceY, cnGap } from '@/styles/boxModelStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnParagraph } from '@/styles/fontStyles';
import { Badge } from '@/lib/components/ui/badge';
import { cnLightTextMuted } from '@/styles/fontStyles';

export const AchievementsCard: React.FC<{
  achievements: CardProps['achievements'];
}> = ({ achievements }) => {
  return (
    <div className={cnSmallSpaceY}>
      <ul className={cnSmallSpaceY}>
        {achievements &&
          achievements.map((achievement, index) => (
            <li key={index} className={cn(cnGap, 'flex')}>
              <div className='flex-shrink-0 text-primary'>
                {IconLoader(achievement.icon || '')}
              </div>
              <div className={cnFlexCol}>
                <h3 className={cnParagraph}>{achievement.title}</h3>
                <Badge
                  variant='outline'
                  className={cn('border-0 p-0', cnParagraph, cnLightTextMuted)}
                >
                  {achievement.date}
                </Badge>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
