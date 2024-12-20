import { cnParagraph } from '@/styles/fontStyles';
import CardProps from '@/types/CardProps';
import { IconLoader } from '@/hooks/IconLoader';
import { cn } from '@/lib/utils';
import { cnSmallSpaceY, cnGap } from '@/styles/boxModelStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnTitle2 } from '@/styles/fontStyles';
import { Badge } from '@/lib/components/ui/badge';
import { cnSmallText, cnLightTextMuted } from '@/styles/fontStyles';
import { CardContent } from '@/lib/components/ui/card';

export const NowCard: React.FC<CardProps> = ({ achievements, content }) => {
  return (
    <div className={cnSmallSpaceY}>
      <CardContent>
        <ul>
          {achievements &&
            achievements.map((achievement, index) => (
              <li key={index} className={cn(cnGap, 'flex')}>
                <div className='flex-shrink-0 text-primary'>
                  {IconLoader(achievement.icon || '')}
                </div>
                <div className={cnFlexCol}>
                  <h3 className={cnTitle2}>{achievement.title}</h3>
                  <Badge
                    variant='outline'
                    className={cn(
                      'border-0 p-0',
                      cnSmallText,
                      cnLightTextMuted
                    )}
                  >
                    {achievement.date}
                  </Badge>
                </div>
              </li>
            ))}
        </ul>
      </CardContent>
      <CardContent>
        <h3 className={cnTitle2}>And now ?</h3>
        <p className={cnParagraph}>{content}</p>
      </CardContent>
    </div>
  );
};
