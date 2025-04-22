import React from 'react';

import { Dot } from '@src/components/ui/dot/dot';
import { Badge } from '@src/lib/components/ui/badge';
import { cn } from '@src/lib/utils';
import { cnBorderRadiusFull } from '@src/styles/border.style';
import {
  cnSpaceY,
  cnSmallSpaceY,
  cnSmallMarginX,
  cnPaddingX,
} from '@src/styles/boxModel.style';
import {
  cnDescription,
  cnLightTextMuted,
  cnSmallText,
} from '@src/styles/font.style';
import { ExperiencesProps } from '@src/types/ExperiencesProps';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
  capitalizeFirstLetterOfPhrase,
} from '@src/utils/formatText.util';

/**
 * A React functional component that renders a list of experiences, categorized
 * by their subtitle ('actuelle' or 'passée'). Each experience displays detailed
 * information such as job title, date, company, location, and optional details
 * like goal, role, tasks, stack, and skills.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {'actuelle' | 'passée'} props.subtitle - The category of experiences to display.
 *   - 'actuelle': Filters experiences that include "aujourd'hui" in their date.
 *   - 'passée': Filters experiences that do not include "aujourd'hui" in their date.
 * @param {Array<Object>} props.experiences - An array of experience objects.
 * @param {string} props.experiences[].job - The job title of the experience.
 * @param {string} props.experiences[].date - The date or duration of the experience.
 * @param {string} props.experiences[].company - The company name of the experience.
 * @param {string} props.experiences[].location - The location of the experience.
 * @param {string} [props.experiences[].goal] - The goal or purpose of the experience (optional).
 * @param {string} [props.experiences[].role] - The role played in the experience (optional).
 * @param {Array<string>} [props.experiences[].tasks] - A list of tasks performed during the experience (optional).
 * @param {Array<string>} [props.experiences[].stack] - A list of technologies or tools used during the experience (optional).
 * @param {Array<string>} [props.experiences[].skills] - A list of skills acquired or demonstrated during the experience (optional).
 *
 * @returns {JSX.Element} A JSX element that renders the filtered and formatted list of experiences.
 */
export const ExperiencesList: React.FC<{
  subtitle: 'actuelle' | 'passée';
  experiences: ExperiencesProps[];
}> = ({
  subtitle,
  experiences,
}: {
  subtitle: 'actuelle' | 'passée';
  experiences: ExperiencesProps[];
}): JSX.Element => {
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
