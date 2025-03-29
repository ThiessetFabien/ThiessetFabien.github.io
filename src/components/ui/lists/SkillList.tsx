import { cn } from '@/src/lib/utils';
import { cnSmallMarginX } from '@/src/styles/boxModel.style';
import { cnParagraph } from '@/src/styles/font.style';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@/src/utils/formatText.util';

/**
 * A React functional component that renders a list item (`<li>`) representing a skill.
 * The skill is displayed as a formatted and capitalized string, preceded by a styled indicator.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.skill - The skill to be displayed in the list item.
 * @returns {JSX.Element} A list item containing the formatted skill name and a visual indicator.
 */

export const SkillList: React.FC<{
  skill: string;
}> = ({ skill }) => {
  return (
    <>
      <li className='flex'>
        <div
          className={cn(
            cnSmallMarginX,
            'h-2 min-w-2 translate-y-1 rounded-full bg-ring'
          )}
        />
        <span className={cn(cnParagraph)}>
          {capitalizeFirstLetterOfPhrase(formatSpecialWords(skill))}
        </span>
      </li>
    </>
  );
};
