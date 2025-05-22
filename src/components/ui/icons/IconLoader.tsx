/**
 * @file IconLoader.tsx
 * @description This file exports a component that dynamically loads and renders an icon from the lucide-react library.
 */

import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { cn } from '@src/lib/utils';
import { cnSizeIcon } from '@styles/size.style';
import type { CardProps } from '@src/types/CardProps';

/**
 * IconLoader component.
 * @param {string} icon - The name of the icon to load.
 * @returns {JSX.Element | null} The rendered icon component or null if the icon is not yet loaded.
 * @example
 * <IconLoader icon="Home" />
 */

interface IconLoaderProps {
  icon: string;
  className?: CardProps['className'];
}

export const IconLoader: React.FC<IconLoaderProps> = ({ icon, className }) => {
  const [IconComponent, setIconComponent] = useState<LucideIcon | null>(null);

  useEffect(() => {
    if (!icon) return;

    const LoadedIcon = Icons[icon as keyof typeof Icons];

    if (LoadedIcon) {
      setIconComponent(LoadedIcon as LucideIcon);
    } else {
      console.error(`Icon ${icon} not found`);
    }
  }, [icon]);

  if (!IconComponent) return null;

  return (
    <IconComponent className={cn(className, cnSizeIcon)} aria-hidden='true' />
  );
};
