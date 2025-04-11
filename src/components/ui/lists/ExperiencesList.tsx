import React from 'react';

import { Dot } from '@/src/components/ui/dot/dot';
import { Badge } from '@/src/lib/components/ui/badge';
import { cn } from '@/src/lib/utils';
import { cnBorderRadiusFull } from '@/src/styles/border.style';
import {
  cnSpaceY,
  cnSmallSpaceY,
  cnSmallMarginX,
  cnPaddingX,
} from '@/src/styles/boxModel.style';
import {
  cnDescription,
  cnLightTextMuted,
  cnSmallText,
} from '@/src/styles/font.style';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
  capitalizeFirstLetterOfPhrase,
} from '@/src/utils/formatText.util';

export const ExperiencesList: React.FC<{
  subtitle: 'actuelle' | 'passée';
  experiences: Array<{
    job: string;
    date: string;
    company: string;
    location: string;
    goal?: string;
    role?: string;
    tasks?: string[];
    stack?: string[];
    skills?: string[];
  }>;
}> = ({ subtitle, experiences }) => {
  return (
    <div
      className={cn(
        'relative z-0 border-l border-primary',
        cnPaddingX,
        cnSpaceY
      )}
    >
      {experiences &&
        experiences.length > 0 &&
        experiences
          .filter((experience) =>
            subtitle === 'actuelle'
              ? experience.date.toLowerCase().includes("aujourd'hui")
              : !experience.date.toLowerCase().includes("aujourd'hui")
          )
          .map((experience, i) => (
            <div key={i} className={cn('relative', cnSmallSpaceY)}>
              <div
                className={cn(
                  'absolute -left-8 top-0 z-50 flex-shrink-0 md:-left-10',
                  cnBorderRadiusFull,
                  'h-4 w-4',
                  cnSmallMarginX,
                  'bg-ring'
                )}
              />
              <h3 className={cn('-translate-y-1 font-bold text-primary')}>
                {experience.job.toUpperCase()}
              </h3>
              <Badge
                variant='secondary'
                className={cn(cnDescription, '-translate-y-1 font-semibold')}
              >
                {capitalizeFirstLetterOfEachWord(experience.date)}
              </Badge>
              <p className={cn(cnLightTextMuted, '-translate-y-1 italic')}>
                {capitalizeFirstLetterOfEachWord(
                  formatSpecialWords(experience.company)
                )}{' '}
                {experience.location && (
                  <>
                    {' | '}
                    {capitalizeFirstLetterOfEachWord(
                      formatSpecialWords(experience.location)
                    )}
                  </>
                )}
              </p>
              {experience.goal && (
                <p className={cnDescription}>
                  {capitalizeFirstLetterOfPhrase(
                    formatSpecialWords(experience.goal)
                  )}
                </p>
              )}
              <ul className={cn(cnDescription, cnSmallSpaceY)}>
                {experience.tasks &&
                  experience.tasks.length > 0 &&
                  experience.tasks.map((task, i) => (
                    <li key={i} className='flex'>
                      <Dot />
                      {capitalizeFirstLetterOfPhrase(formatSpecialWords(task))}
                    </li>
                  ))}
                {experience.role && (
                  <li className={cn(cnSmallText, 'font-bold')}>
                    Rôle:{' '}
                    <span className={cn(cnLightTextMuted, 'italic')}>
                      {capitalizeFirstLetterOfPhrase(
                        formatSpecialWords(experience.role)
                      )}
                    </span>
                  </li>
                )}
                {experience.stack && experience.stack.length > 0 && (
                  <li className={cn(cnSmallText, 'font-bold')}>
                    Stack:{' '}
                    {experience.stack.map((item, i) => (
                      <span key={i} className={cn(cnLightTextMuted, 'italic')}>
                        {capitalizeFirstLetterOfEachWord(
                          formatSpecialWords(item)
                        )}
                        {i < (experience.stack ?? []).length - 1 ? ' · ' : '.'}
                      </span>
                    ))}
                  </li>
                )}
                {experience.skills && experience.skills.length > 0 && (
                  <li className={cn(cnSmallText, 'font-bold')}>
                    Compétences:{' '}
                    {experience.skills.map((item, i) => (
                      <span key={i} className={cn(cnLightTextMuted, 'italic')}>
                        {capitalizeFirstLetterOfPhrase(
                          formatSpecialWords(item)
                        )}
                        {i < (experience.skills ?? []).length - 1 ? ' · ' : '.'}
                      </span>
                    ))}
                  </li>
                )}
              </ul>
            </div>
          ))}
    </div>
  );
};
