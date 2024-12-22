import CardProps from '@/types/CardProps';
import React from 'react';
import { cnParagraph } from '@/styles/fontStyles';
import { cnPaddingX } from '@/styles/boxModelStyles';
import { cnLightTextMuted } from '@/styles/fontStyles';
import { Quote } from 'lucide-react';
import { sizeIcon } from '@/styles/sizeStyles';
import { cn } from '@/lib/utils';

export const QuoteCard: React.FC<CardProps> = ({ quote }) => {
  return (
    <div className={cn(cnLightTextMuted, 'flex')}>
      <div className='self-start'>
        <Quote className={cn(sizeIcon)} />
      </div>
      <p className={cn(cnParagraph, cnPaddingX)}>
        {quote && quote.text} <br />
        <em className={'block text-right italic'}>{quote && quote.author}</em>
      </p>
      <div className='self-end'>
        <Quote className={cn(sizeIcon, 'rotate-180')} />
      </div>
    </div>
  );
};
