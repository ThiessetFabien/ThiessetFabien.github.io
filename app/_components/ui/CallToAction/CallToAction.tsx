import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  title: string;
  description: string;
  ctaText: string;
  onClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  ctaText,
  onClick,
}) => {
  return (
    <div className='rounded-lg bg-gray-100 p-6 shadow-md'>
      <h2 className='mb-4 text-2xl font-bold'>{title}</h2>
      <p className='mb-6 text-gray-700'>{description}</p>
      <Button onClick={onClick}>{ctaText}</Button>
    </div>
  );
};
