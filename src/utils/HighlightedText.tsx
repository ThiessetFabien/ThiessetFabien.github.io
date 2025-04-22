import React from 'react';

import { cn } from '@src/lib/utils';
import {
  capitalizeFirstLetterOfPhrase,
  formatSpecialWords,
} from '@utils/formatText.util';

interface HighlightedTextProps {
  text: string;
  highlightWords?: string[];
  className?: string;
}

/**
 * A React component that highlights specific words within a given text.
 * @param {HighlightedTextProps} props - The props for the component.
 * @param {string} props.text - The text to display and highlight.
 * @param {string[]} [props.highlightWords] - The words to highlight in the text.
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element | null} The rendered component or null if no text is provided.
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightWords = [],
  className = '',
}) => {
  if (!text) return null;

  const formattedText = capitalizeFirstLetterOfPhrase(formatSpecialWords(text));

  if (highlightWords.length === 0) {
    return <span className={className}>{formattedText}</span>;
  }

  const escapedHighlightWords = highlightWords.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  const pattern = new RegExp(`(${escapedHighlightWords.join('|')})`, 'gi');

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(formattedText)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: formattedText.substring(lastIndex, match.index),
        highlight: false,
      });
    }

    parts.push({
      text: match[0],
      highlight: true,
    });

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < formattedText.length) {
    parts.push({
      text: formattedText.substring(lastIndex),
      highlight: false,
    });
  }

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.highlight ? (
          <span
            key={`highlight-${index}`}
            className={cn(className, 'font-bold text-secondary')}
          >
            {part.text}
          </span>
        ) : (
          <span key={`text-${index}`}>{part.text}</span>
        )
      )}
    </span>
  );
};
