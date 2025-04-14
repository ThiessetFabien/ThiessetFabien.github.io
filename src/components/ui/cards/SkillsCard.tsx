import React, { memo } from 'react';

import { Card, CardContent, CardHeader } from '@/src/lib/components/ui/card';
import { cnSpaceY } from '@/src/styles/boxModel.style';
import {
  cnFlexBetweenY,
  cnFlexCol,
  cnFlexFullCenter,
} from '@/src/styles/flex.style';
import { cnParagraph, cnTitle3 } from '@/src/styles/font.style';
import { cnSizeFull } from '@/src/styles/size.style';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from '@/src/utils/formatText.util';
import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';

import { HighlightedText } from '../../../utils/HighlightedText';
import { SkillList } from '../lists/SkillList';

/**
 * Renders a card displaying job information and associated skills.
 * @param {Pick<CardProps, 'jobs' | 'className'>} props - The component props.
 * @returns {JSX.Element} The rendered SkillsCard component.
 */
export const SkillsCard: React.FC<Pick<CardProps, 'jobs' | 'className'>> = memo(
  ({ jobs, className }: Pick<CardProps, 'jobs' | 'className'>): JSX.Element => {
    const highlightWords = [
      'développeur full-stack orienté front-end',
      'next.js',
      'express.js',
      'typescript',
      'coordinnateur de projet',
      'qualité du prendre soin',
      'bien-être',
      'scrum master',
    ];

    return (
      <div
        className={cn(
          className,
          cnFlexFullCenter,
          cnFlexCol,
          cnSizeFull,
          cnSpaceY,
          'xl:flex-row xl:space-y-0'
        )}
      >
        {jobs &&
          jobs.length > 0 &&
          jobs.map((job, i) => (
            <Card
              key={i}
              className={cn(
                'w-full flex-1 xl:w-1/2',
                i === 0 ? 'h-[80%] bg-foreground/80 text-background' : 'h-auto'
              )}
            >
              <CardHeader>
                {job.name && (
                  <h3 className={cn(cnTitle3)}>
                    {capitalizeFirstLetterOfEachWord(
                      formatSpecialWords(job.name)
                    )}
                  </h3>
                )}
                <p
                  className={cn(
                    cnParagraph,
                    'lg:max-w-auto max-w-max hyphens-auto break-words text-justify'
                  )}
                >
                  <HighlightedText
                    text={job.description}
                    highlightWords={highlightWords}
                  />
                </p>
              </CardHeader>
              <CardContent>
                {job.skills && (
                  <div className={cnFlexBetweenY}>
                    <ul
                      className={cn(
                        cnFlexCol,
                        cnSpaceY,
                        'w-full hyphens-auto break-words'
                      )}
                    >
                      {job.skills.map((skill, i) => (
                        <SkillList key={i} skill={skill} />
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }
);

SkillsCard.displayName = 'SkillsCard';

export default SkillsCard;
