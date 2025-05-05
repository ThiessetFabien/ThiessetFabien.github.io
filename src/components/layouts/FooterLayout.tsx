'use client';

import React from 'react';

import { cn } from '@lib/utils';
import type { CardProps } from '@src/types/CardProps';
import { year } from '@src/utils/dynamicYear.util';
import {
  capitalizeFirstLetterOfEachWord,
  formatSpecialWords,
} from '@src/utils/formatText.util';
import { cnSmallText, cnTitle2, cnTitle2Size } from '@styles/font.style';

/**
 * Footer component that displays the current year and additional information.
 * @param {Object} props - Component properties.
 * @param {string} [props.className] - Additional class names for the footer.
 * @returns {JSX.Element} The rendered Footer component.
 */

export const Footer: React.FC<{
  name: CardProps['name'];
  familyName: CardProps['familyName'];
  expertises: CardProps['expertises'];
  className: CardProps['className'];
}> = ({
  name,
  familyName,
  expertises,
  className,
}: {
  name?: string;
  familyName?: string;
  expertises?: string[] | string;
  className?: string;
}): JSX.Element => {
  return (
    <footer className={className}>
      <h2 className={cn('mx-auto text-center', cnTitle2, cnTitle2Size)}>
        {name && capitalizeFirstLetterOfEachWord(name)}{' '}
        {familyName?.toLocaleUpperCase()}
      </h2>
      {expertises && expertises.length > 0 && (
        <p className={cn('mx-auto text-center italic', cnSmallText)}>
          {Array.isArray(expertises)
            ? expertises.map((expertise: React.Key | undefined, i: number) => (
                <span key={expertise}>
                  {capitalizeFirstLetterOfEachWord(
                    formatSpecialWords(String(expertise))
                  )}
                  {i < expertises.length - 1 ? ' | ' : ''}
                </span>
              ))
            : capitalizeFirstLetterOfEachWord(formatSpecialWords(expertises))}
        </p>
      )}
      <p className={cn('mx-auto text-center', cnSmallText)}>
        Pour plus d&apos;informations, envoi moi un message sur{' '}
        <a
          href='mailto:fabienthiessetpro@gmail.com'
          target='_blank'
          rel='noreferrer'
          className='text-primary hover:text-secondary/80 hover:underline focus:text-secondary/80 focus:underline'
          aria-label='Contact me'
        >
          fabienthiessetpro@gmail.com
        </a>
        .
      </p>
      <p className={cn('mx-auto text-center', cnSmallText)}>
        &copy; 2024{year > 2024 ? ` - ${year}` : ''}&nbsp;&bull;&nbsp;
        <b className='font-bold'>Fabien Thiesset</b>&nbsp;&bull; &nbsp;Tous
        droits réservés
      </p>
    </footer>
  );
};
