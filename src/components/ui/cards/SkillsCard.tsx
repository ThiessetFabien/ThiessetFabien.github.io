import React, { memo } from 'react';

import { cnSpaceY } from '@/src/styles/boxModel.style';
import { cnFlexCol } from '@/src/styles/flex.style';
import { cnParagraph, cnTitle3 } from '@/src/styles/font.style';
import { useIsLg } from '@/src/styles/mediaQueries.style';
import {
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

import { SkillList } from '../lists/SkillList';

/**
 * Renders a card displaying job information and associated skills.
 * @param {Pick<CardProps, 'jobs' | 'className'>} props - The component props.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: React.FC<Pick<CardProps, 'jobs' | 'className'>> = memo(
  ({ jobs, className }: Pick<CardProps, 'jobs' | 'className'>): JSX.Element => {
    const isLg = useIsLg();
    return (
      <div className={className}>
        {jobs &&
          jobs.length > 0 &&
          jobs.map((job, i) => (
            <React.Fragment key={i}>
              {job.name && (
                <h3 className={cn(cnTitle3)}>
                  {capitalizeFirstLetterOfEachWord(
                    formatSpecialWords(job.name)
                  )}
                </h3>
              )}
              <p className={cnParagraph}>
                {capitalizeFirstLetterOfPhrase(
                  formatSpecialWords(job.description)
                )}
              </p>
              {isLg && job.skills ? (
                <div className={cn('flex items-start justify-between gap-4')}>
                  <ul className={cn('w-1/2', cnFlexCol, cnSpaceY)}>
                    {job.skills.slice(0, 4).map((skill, i) => (
                      <SkillList key={i} skill={skill} />
                    ))}
                  </ul>
                  <ul className={cn('w-1/2', cnFlexCol, cnSpaceY)}>
                    {job.skills.slice(4).map((skill, i) => (
                      <SkillList key={i} skill={skill} />
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className={cn('w-full', cnFlexCol, cnSpaceY)}>
                  {job.skills &&
                    job.skills.map((skill, i) => (
                      <SkillList key={i} skill={skill} />
                    ))}
                </ul>
              )}
            </React.Fragment>
          ))}
      </div>
    );
  }
);

SkillsCard.displayName = 'SkillsCard';

export default SkillsCard;
