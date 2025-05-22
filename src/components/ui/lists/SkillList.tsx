import React from 'react';
import { cn } from '@src/lib/utils';
import { cnSmallMarginRight } from '@styles/boxModel.style';
import { cnParagraph } from '@styles/font.style';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@src/utils/formatText.util';

import { IconLoader } from '@src/components/ui/icons/IconLoader';

/**
 * Renders a list item representing a skill with a styled indicator and formatted text.
 *
 * @param {Object} props - Component props.
 * @param {string} props.skill - The skill to display.
 * @returns {JSX.Element} The rendered list item.
 */
export const SkillList: React.FC<{
  skill: string;
}> = ({ skill }: { skill: string }): JSX.Element => (
  <li className='flex'>
    <IconLoader
      className={cn(cnSmallMarginRight, 'text-primary')}
      icon='Check'
    />
    <span className={cn(cnParagraph)}>
      {capitalizeFirstLetterOfPhrase(formatSpecialWords(skill))}
    </span>
  </li>
);
