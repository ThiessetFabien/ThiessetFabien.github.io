/**
 * @file IconLoader.tsx
 * @description This file exports a component that dynamically loads and renders an icon from the lucide-react library.
 */

import React, { useEffect, useState } from 'react';

import type { CardProps } from '@src/types/CardProps';

/**
 * IconLoader component.
 * @param {string} icon - The name of the icon to load.
 * @returns {JSX.Element | null} The rendered icon component or null if the icon is not yet loaded.
 * @example
 * <IconLoader icon="Home" />
 */

export const IconLoader = (
  icon: string,
  className?: CardProps['className']
) => {
  const [Icon, setIcon] = useState<React.ComponentType | null>(null);
  const [ClassName, setClassName] = useState<CardProps['className']>('');

  useEffect(() => {
    const loadIcon = async () => {
      const iconModule = (await import(`lucide-react`)) as unknown as {
        [key: string]: React.ComponentType;
      };
      setIcon(() => iconModule[icon] as React.ComponentType);
    };
    loadIcon();

    setClassName(className || '');
  }, [icon, className]);

  return Icon ? (
    <Icon {...({ className: `${ClassName}` } as React.ComponentProps<'svg'>)} />
  ) : null;
};
