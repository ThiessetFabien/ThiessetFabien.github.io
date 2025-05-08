import { motion } from 'framer-motion';

import { Toggle } from '@lib/components/ui/toggle';
import { cn } from '@src/lib/utils';
import { cnBorderRadiusFull } from '@src/styles/border.style';
import { containerScale } from '@src/styles/variantsAnimation';
import { iconBounce } from '@src/styles/variantsAnimation';
import { IconName } from '@src/types/IconNameProps';
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
  return (
    <motion.div
      variants={containerScale}
      initial='initial'
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
          'relative h-10 w-10 bg-accent px-0 transition-colors duration-200',
          cnBorderRadiusFull
        )}
      >
        <motion.div variants={iconBounce} initial='initial' whileHover='hover'>
          <IconLoader
            icon={icon as IconName}
            className={'text-accent-foreground'}
          />
        </motion.div>
        <span className='sr-only'>{ariaLabel}</span>
      </Toggle>
    </motion.div>
  );
};
