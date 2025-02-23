import { motion } from 'framer-motion';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@lib/components/ui/hover-card';
import { Toggle } from '@lib/components/ui/toggle';
import { IconLoader } from '@services/IconLoader';
import type { ScrollTopToggleProps } from '@src/types/ScrollTopToggleProps';
import { cnParagraph } from '@styles/fontStyles';

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
