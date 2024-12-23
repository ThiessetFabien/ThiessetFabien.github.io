import { cnSpaceY } from '@/styles/boxModelStyles';
import {
  cnParagraph,
  cnTitle2,
  cnTitle2Size,
  cnTitle3,
} from '@/styles/fontStyles';
import { hideItem } from '@/styles/hideItemStyles';
import { lineThroughItem } from '@/styles/lineThroughStyles';
import { cnFlexCol } from '@/styles/flexStyles';
import { cnMarginRight } from '@/styles/boxModelStyles';
import { cnSmallText, cnLightTextMuted } from '@/styles/fontStyles';
import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';
import { Badge } from '@/lib/components/ui/badge';
import { useIsMd } from '@/hooks/useMediaQuery';

import type { Experience } from '@/types/ExperienceProps';

export const ExperiencesList: React.FC<Experience> = ({
  title,
  company,
  date,
}) => {
  const isMd = useIsMd();
  return (
    <>
      <ul className={cn(cnSpaceY, lineThroughItem(date), 'w-full')}>
        <li className={'flex'}>
          <Dot
            className={cn(cnMarginRight, 'shrink-0', 'text-primary')}
            size={28}
          />
          <div className={cn(cnFlexCol, 'md:flex-row')}>
            <h3 className={cn(cnTitle3)}>
              {title}
              <span className={cn('text-primary', hideItem(company))}>
                &nbsp;@ {company}
              </span>
            </h3>
            <Badge
              variant='outline'
              className={cn('border-0 p-0', cnParagraph)}
            >
              {isMd ? `\u00A0${date}` : date}
            </Badge>
          </div>
        </li>
      </ul>
    </>
  );
};
