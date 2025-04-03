import { motion } from 'framer-motion';

import { cn } from '@/src/lib/utils';
import { cnBorderRadiusFull } from '@/src/styles/border.style';
import { cnSizeFull } from '@/src/styles/size.style';
import { IconName } from '@/src/types/IconNameProps';
import { Toggle } from '@lib/components/ui/toggle';
import type { ScrollTopToggleProps } from '@src/types/ScrollTopToggleProps';
import { IconLoader } from '@ui/icons/IconLoader';

/**
 * ScrollTopToggle is a reusable component that combines a toggle button with hover card functionality.
 * It displays an icon and an accessible label, and provides hover and tap animations.
 * @param {ScrollTopToggleProps} props - The properties for the ScrollTopToggle component.
 * @param {string} [props.variant] - The variant style of the toggle.
 * @param {string} [props.size] - The size of the toggle.
 * @param {() => void} props.onClick - The click handler for the toggle.
 * @param {IconName} props.icon - The icon to display inside the toggle.
 * @param {string} props.type - The type attribute for the toggle button.
 * @param {string} props.className - Additional class names for the wrapper.
 * @returns {JSX.Element} The ScrollTopToggle component.
 */
export const ScrollTopToggle: React.FC<ScrollTopToggleProps> = ({
  variant,
  size,
  onClick,
  icon,
  'aria-label': ariaLabel,
  type,
  className,
}: ScrollTopToggleProps): JSX.Element => {
  const containerVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 } },
    tap: { scale: 0.8, transition: { duration: 0.1 } },
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: {
      y: [0, -5, 0, -3, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'loop' as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      whileHover='hover'
      whileTap='tap'
      className={className}
    >
      <Toggle
        variant={variant}
        size={size}
        onClick={onClick}
        type={type}
        className={cn(
          'dark:text-accent-foreground0 relative bg-accent px-0',
          cnBorderRadiusFull
        )}
      >
        <motion.div variants={iconVariants} whileHover='hover'>
          <IconLoader icon={icon as IconName} className={cnSizeFull} />
        </motion.div>
        <span className='sr-only'>{ariaLabel}</span>
      </Toggle>
    </motion.div>
  );
};
