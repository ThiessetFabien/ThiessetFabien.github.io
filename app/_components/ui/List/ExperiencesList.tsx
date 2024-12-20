import { cnSmallSpaceY } from '@/styles/boxModelStyles';
import { cnTitle2 } from '@/styles/fontStyles';
import { hideItem } from '@/styles/hideItemStyles';
import { lineThroughItem } from '@/styles/lineThroughStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnMarginRight } from '@/styles/boxModelStyles';
import { cnSmallText, cnLightTextMuted } from '@/styles/fontStyles';
import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';
import { Badge } from '@/lib/components/ui/badge';

import type { Experience } from '@/types/ExperienceProps';

export const ExperiencesList: React.FC<Experience> = ({
  title,
  company,
  date,
}) => {
  return (
    <>
      <ul className={cn(cnSmallSpaceY, lineThroughItem(date), 'w-full')}>
        <li className={'flex'}>
          <Dot
            className={cn(cnMarginRight, 'shrink-0', 'text-primary')}
            size={28}
          />
          <div className={cnFlexCol}>
            <h3 className={cnTitle2}>
              {title}
              <span className={cn('text-primary', hideItem(company))}>
                &nbsp;@ {company}
              </span>
            </h3>
            <Badge
              variant='outline'
              className={cn('border-0 p-0', cnSmallText, cnLightTextMuted)}
            >
              {date}
            </Badge>
          </div>
        </li>
      </ul>
    </>
  );
};
