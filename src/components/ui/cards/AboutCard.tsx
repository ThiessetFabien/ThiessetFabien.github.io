import React from 'react';

import { cn } from '@lib/utils';
import { cnBorder } from '@src/styles/border.style';
import { cnPaddingX, cnSmallSpaceY } from '@src/styles/boxModel.style';
import { cnFlexCol } from '@src/styles/flex.style';
import {
  cnDescription,
  cnLightTextMuted,
  cnParagraph,
  cnTitle2,
  cnTitle2Size,
  cnTitle3,
} from '@src/styles/font.style';
import type { AboutProps } from '@src/types/AboutProps';

/**
 * AboutCard component displays information about the user's profession and skills
 * @param about The about data to display
 * @returns A JSX element with the about information
 */
export const AboutCard: React.FC<{ about: AboutProps }> = ({ about }) => {
  return (
    <section className={cn('container mx-auto lg:my-8', cnPaddingX)}>
      <article
        className={cn(
          cnBorder,
          'rounded-lg border-muted bg-card px-6 py-8 shadow-sm'
        )}
      >
        <h2
          className={cn(
            cnTitle2,
            cnTitle2Size,
            'mb-6 text-center sm:text-left'
          )}
        >
          {about.title}
        </h2>

        <div className={cn('grid gap-8 md:grid-cols-2')}>
          {about.jobs.map((job, index) => (
            <div
              key={index}
              className={cn(
                cnFlexCol,
                cnSmallSpaceY,
                'relative rounded-lg border border-muted/50 bg-card/50 p-6 shadow-sm'
              )}
            >
              <h3 className={cn(cnTitle3, 'font-bold text-primary')}>
                {job.name}
              </h3>
              <p className={cn(cnDescription, 'mb-4 text-pretty')}>
                {job.description}
              </p>
              {job.skills && job.skills.length > 0 && (
                <div className={cn(cnFlexCol, 'mt-auto')}>
                  <h4
                    className={cn(
                      cnParagraph,
                      'mb-2 font-semibold text-secondary-foreground'
                    )}
                  >
                    Compétences clés :
                  </h4>
                  <ul className={cn('list-disc space-y-1 pl-5')}>
                    {job.skills.map((skill, i) => (
                      <li key={i} className={cn(cnLightTextMuted, 'text-sm')}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default AboutCard;
