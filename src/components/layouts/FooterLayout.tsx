'use client';

import React from 'react';

import { cn } from '@lib/utils';
import { CONTACT_INFO } from '@src/config/constants';
import { TEXT_CLASSES } from '@src/config/css-classes';
import type { FooterProps } from '@src/types/FooterProps';
import { formatCopyrightYears } from '@src/utils/dynamicYear.util';
import { formatExpertisesList } from '@src/utils/expertises.util';
import { capitalizeFirstLetterOfEachWord } from '@src/utils/formatText.util';
import { cnSmallText, cnTitle2, cnTitle2Size } from '@styles/font.style';

/**
 * Composant Footer qui affiche les informations de contact, expertises et le copyright
 * @param {FooterProps} props - Propriétés du composant
 * @returns {JSX.Element} Le composant Footer rendu
 */
export const FooterLayout = ({
  name,
  familyName,
  expertises,
  className,
  contactEmail = CONTACT_INFO.EMAIL,
}: FooterProps): JSX.Element => (
  <footer className={className}>
    <h2 className={cn('mx-auto text-center', cnTitle2, cnTitle2Size)}>
      {name && capitalizeFirstLetterOfEachWord(name)}{' '}
      {familyName?.toLocaleUpperCase()}
    </h2>
    {expertises && expertises.length > 0 && (
      <p className={cn('mx-auto text-center italic', cnSmallText)}>
        {formatExpertisesList(expertises)}
      </p>
    )}
    <p className={cn('mx-auto text-center', cnSmallText)}>
      Pour plus d&apos;informations, envoi moi un message sur{' '}
      <a
        href={`mailto:${contactEmail}`}
        target='_blank'
        rel='noreferrer'
        className={TEXT_CLASSES.INTERACTIVE_LINK}
        aria-label='Me contacter'
      >
        {contactEmail}
      </a>
      .
    </p>
    <p className={cn('mx-auto text-center', cnSmallText)}>
      &copy; {formatCopyrightYears(2024)}&nbsp;&bull;&nbsp;
      <b className='font-bold'>
        {name} {familyName}
      </b>
      &nbsp;&bull; &nbsp;Tous droits réservés
    </p>
  </footer>
);
