import { motion } from 'framer-motion';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@src/lib/components/ui/sheet';
import { cn } from '@src/lib/utils';
import { cnBorderRadiusMd } from '@src/styles/border.style';
import {
  cnPaddingTop,
  cnSmallPadding,
  cnSpaceX,
  cnSpaceY,
} from '@src/styles/boxModel.style';
import { cnFlexCenterY, cnFlexCol } from '@src/styles/flex.style';
import { cnSmallText, cnTitle3 } from '@src/styles/font.style';
import { cnSizeIcon } from '@src/styles/size.style';
import { MenuItemProps } from '@src/types/MenuItemProps';

import { IconLoader } from '../icons/IconLoader';

export const MobileMenu = ({ items }: { items: MenuItemProps[] }) => (
  <Sheet>
    <SheetTrigger
      className={cn(
        cnFlexCenterY,
        cnBorderRadiusMd,
        'transition-colors duration-200'
      )}
      aria-label='Ouvrir le menu de navigation'
    >
      <IconLoader icon='Menu' className={cnSizeIcon} aria-hidden='true' />
    </SheetTrigger>
    <SheetContent side='left' className='w-[90%] sm:max-w-md'>
      <SheetTitle className={cnTitle3}>Navigation</SheetTitle>
      <SheetDescription className='sr-only'>
        <p>
          Menu de navigation permettant d&apos;accéder aux différentes sections
          du site
        </p>
      </SheetDescription>
      <nav
        aria-label='Navigation principale'
        className={cn(cnFlexCol, cnSpaceY, cnPaddingTop)}
      >
        {items.map((item) => (
          <motion.div
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
                'group transition-colors duration-200 hover:bg-accent hover:text-accent-foreground'
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
          </motion.div>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);
