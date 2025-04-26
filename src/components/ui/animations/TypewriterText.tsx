import React, { useEffect, useState, useRef } from 'react';

import { cn } from '@lib/utils';
import type { TypewriterTextProps } from '@src/types/TypewriterTextProps';

/**
 * TypewriterText Component
 *
 * A React component that creates a typewriter text effect, sequentially typing and deleting
 * a series of provided texts.
 *
 * @param {string[]} texts - Array of text strings to be displayed with typewriter effect
 * @param {number} [typingSpeed=100] - Speed in milliseconds for typing each character
 * @param {number} [deletingSpeed=50] - Speed in milliseconds for deleting each character
 * @param {number} [delayBetweenTexts=1000] - Delay in milliseconds after typing before starting deletion
 * @param {string} [className] - Optional CSS class names to apply to the component
 * @param {() => void} [onComplete] - Optional callback function executed when all texts have been displayed (only when loop is false)
 * @param {boolean} [loop=true] - Whether to loop through the texts continuously
 *
 * @returns {JSX.Element} A span element containing the currently displayed text
 *
 * @example
 * <TypewriterText
 *   texts={["Hello, world!", "Welcome to my website", "Check out my portfolio"]}
 *   typingSpeed={150}
 *   loop={true}
 * />
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1000,
  className,
  onComplete,
  loop = true,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const completionTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      if (completionTimeout.current) {
        clearTimeout(completionTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const handleTyping = () => {
      const currentFullText = texts[currentTextIndex];
      const currentTextLength = currentText.length;

      if (!isDeleting) {
        if (currentTextLength < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentTextLength + 1));
          typingTimeout.current = setTimeout(handleTyping, typingSpeed);
        } else {
          setIsDeleting(true);
          typingTimeout.current = setTimeout(handleTyping, delayBetweenTexts);
        }
      } else {
        if (currentTextLength > 0) {
          setCurrentText(currentText.substring(0, currentTextLength - 1));
          typingTimeout.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => {
            const isLastText = prevIndex === texts.length - 1;

            if (isLastText && !loop) {
              if (onComplete) {
                completionTimeout.current = setTimeout(onComplete, 500);
              }
              return prevIndex;
            }

            return isLastText ? 0 : prevIndex + 1;
          });

          typingTimeout.current = setTimeout(handleTyping, typingSpeed);
        }
      }
    };

    typingTimeout.current = setTimeout(handleTyping, typingSpeed);

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts,
    loop,
    onComplete,
  ]);

  return (
    <span className={cn('inline-block whitespace-pre', className)}>
      {currentText}
      {currentText.length > 0 ? ' ' : ''}
    </span>
  );
};

export default TypewriterText;
