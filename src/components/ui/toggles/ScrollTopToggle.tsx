import { motion } from 'framer-motion';

import { IconLoader } from '@/src/components/ui/icons/IconLoader';
import { cnParagraph } from '@/src/styles/font.style';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@lib/components/ui/hover-card';
import { Toggle } from '@lib/components/ui/toggle';
import type { ScrollTopToggleProps } from '@src/types/ScrollTopToggleProps';

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
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
        <Toggle variant={variant} size={size} onClick={onClick} type={type}>
          {IconLoader(icon)}
          <span className='sr-only'>{ariaLabel}</span>
        </Toggle>
      </motion.div>
    </HoverCardTrigger>
    <HoverCardContent className={cnParagraph}>{ariaLabel}</HoverCardContent>
  </HoverCard>
);
