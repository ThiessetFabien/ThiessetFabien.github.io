import { motion } from 'framer-motion';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/src/lib/components/ui/sheet';
import { cnBorderRadiusMd } from '@/src/styles/border.style';
import { cnSmallPadding, cnSpaceX } from '@/src/styles/boxModel.style';
import { cnSmallText } from '@/src/styles/font.style';
import { cnSizeIcon } from '@/src/styles/size.style';
import { MenuItemProps } from '@/src/types/MenuItemProps';
import { cn } from '@src/lib/utils';
import { cnFlexCenterY } from '@src/styles/flex.style';

import { IconLoader } from '../icons/IconLoader';

export const MobileMenu = ({ items }: { items: MenuItemProps[] }) => (
  <Sheet>
    <SheetTrigger
      className={cn(cnFlexCenterY, cnBorderRadiusMd, 'transition-all')}
      aria-label='Ouvrir le menu de navigation'
    >
      <IconLoader icon='Menu' className={cnSizeIcon} aria-hidden='true' />
    </SheetTrigger>
    <SheetContent side='left'>
      <SheetTitle className='text-lg font-medium'>Navigation</SheetTitle>
      <nav
        aria-label='Navigation principale'
        className='flex flex-col space-y-4 pt-8'
      >
        {items.map((item) => (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={item.id}
          >
            <a
              href={item.href}
              target={item.target}
              rel={item.rel}
              className={cn(
                cnFlexCenterY,
                cnSmallPadding,
                cnSpaceX,
                cnBorderRadiusMd,
                cnSmallText,
                'group hover:bg-accent hover:text-accent-foreground'
              )}
              aria-label={item.label}
            >
              <IconLoader
                icon={item.icon}
                className={cnSizeIcon}
                aria-hidden='true'
              />
              <span>{item.label}</span>
            </a>
          </motion.a>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);
