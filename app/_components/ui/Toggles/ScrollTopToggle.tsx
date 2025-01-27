import { IconLoader } from '@/hooks/IconLoader';
import { HoverCard, HoverCardContent } from '@/lib/components/ui/hover-card';
import { HoverCardTrigger } from '@/lib/components/ui/hover-card';
import { Toggle } from '@/lib/components/ui/toggle';
import { cnParagraph } from '@/styles/fontStyles';

interface ScrollTopToggleProps {
  variant: 'default' | 'outline';
  size: 'default' | 'sm' | 'lg';
  onClick: () => void;
  icon: string;
  'aria-label': string;
  type?: 'button' | 'submit' | 'reset';
}

export const ScrollTopToggle: React.FC<ScrollTopToggleProps> = ({
  variant = 'default',
  size = 'default',
  onClick,
  icon,
  'aria-label': ariaLabel,
  type,
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Toggle variant={variant} size={size} onClick={onClick} type={type}>
        {IconLoader(icon)}
        <span className='sr-only'>{ariaLabel}</span>
      </Toggle>
    </HoverCardTrigger>
    <HoverCardContent className={cnParagraph}>{ariaLabel}</HoverCardContent>
  </HoverCard>
);
