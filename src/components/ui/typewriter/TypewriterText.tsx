import { useState, useEffect } from 'react';

import { cn } from '@src/lib/utils';

import { Cursor } from '@src/components/ui/cursor/Cursor';

/**
 * TypewriterText component animates text with a typewriter effect.
 *
 * @param text - The text to animate.
 * @param typingSpeed - Speed of typing animation in milliseconds.
 * @param delayBeforeStart - Delay before typing starts in milliseconds.
 * @param delayBeforeDelete - Delay before deleting starts in milliseconds.
 * @param onComplete - Callback triggered when animation completes.
 * @param className - Additional class names for styling.
 */
export const TypewriterText: React.FC<{
  text: string;
  typingSpeed?: number;
  delayBeforeStart?: number;
  delayBeforeDelete?: number;
  onComplete?: () => void;
  className?: string;
}> = ({
  text,
  typingSpeed = 70,
  delayBeforeStart = 300,
  delayBeforeDelete = 1200,
  onComplete,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(false);
    setIsDeleting(false);

    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delayBeforeStart);

    return () => clearTimeout(startTimer);
  }, [text, delayBeforeStart]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping && currentIndex < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    } else if (isTyping && currentIndex === text.length) {
      timer = setTimeout(() => {
        setIsTyping(false);
        setIsDeleting(true);
        setCurrentIndex(text.length);
      }, delayBeforeDelete);
    } else if (isDeleting && currentIndex > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, typingSpeed / 1.5);
    } else if (isDeleting && currentIndex === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        if (onComplete) onComplete();
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [
    isTyping,
    isDeleting,
    currentIndex,
    text,
    typingSpeed,
    delayBeforeDelete,
    onComplete,
  ]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      {(isTyping || isDeleting) && <Cursor />}
    </span>
  );
};
