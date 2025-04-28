import { Button } from '@src/lib/components/ui/button';
import { ActionButtonProps } from '@src/types/ActionButtonProps';
import { CardProps } from '@src/types/CardProps';

import { IconLoader } from '../icons/IconLoader';

/**
 * A carousel arrow button component that displays an icon within a button.
 * Used for navigation in carousel/slider components.
 *
 * @component
 * @param {Object} props - The component props
 * @param {CardProps['className']} props.className - CSS class name for styling the button
 * @param {ActionButtonProps['icon']} props.icon - Icon to display inside the button
 * @param {ActionButtonProps['onClick']} props.onClick - Function to execute when the button is clicked
 * @returns {JSX.Element} A button with an icon for carousel navigation
 */
export const ArrowCarouselButton: React.FC<{
  className: CardProps['className'];
  icon: ActionButtonProps['icon'];
  onClick: ActionButtonProps['onClick'] | undefined;
}> = ({
  className,
  icon,
  onClick,
}: {
  className: CardProps['className'];
  icon: ActionButtonProps['icon'];
  onClick: ActionButtonProps['onClick'];
}): JSX.Element => {
  return (
    <Button
      variant='outline'
      size='icon'
      className={className}
      onClick={onClick}
      aria-label='Témoignage précédent'
    >
      <IconLoader icon={`${icon}`} />
    </Button>
  );
};
