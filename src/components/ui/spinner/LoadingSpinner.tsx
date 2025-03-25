import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Chargement en cours...',
  className = '',
}) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 ${className}`}
    >
      <Loader2 className={`animate-spin ${sizeMap[size]}`} aria-hidden='true' />
      {message && <p className='text-sm text-muted-foreground'>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
