/**
 * @file IconLoader.tsx
 * @description This file exports a component that dynamically loads and renders an icon from the lucide-react library.
 */

import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { CardProps } from '@src/types/CardProps';

/**
 * IconLoader component.
 * @param {string} icon - The name of the icon to load.
 * @returns {JSX.Element | null} The rendered icon component or null if the icon is not yet loaded.
 * @example
 * <IconLoader icon="Home" />
 */

interface IconLoaderProps {
  icon: keyof typeof Icons;
  className?: CardProps['className'];
}

export const IconLoader = (
  icon: string,
  className?: CardProps['className']
) => {
  const [Icon, setIcon] = useState<LucideIcon | null>(null);

  useEffect(() => {
    const IconComponent = Icons.icon;

    if (IconComponent) {
      setIcon(() => IconComponent as LucideIcon);
    } else {
      console.error(`Icon ${icon} not found`);
    }

  }, [icon]);

  return Icon ? (
    <Icon {...({ className: `${ClassName}` } as React.ComponentProps<'svg'>)} />
  ) : null;
};
