import React, { useEffect, useState } from 'react';

/**
 * @file IconLoader.tsx
 * @description This file exports a component that dynamically loads and renders an icon from the lucide-react library.
 */

/**
 * IconLoader component.
 * @param {string} icon - The name of the icon to load.
 * @returns {JSX.Element | null} The rendered icon component or null if the icon is not yet loaded.
 * @example
 * <IconLoader icon="Home" />
 */

export const IconLoader = (icon: string) => {
  const [Icon, setIcon] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      const iconModule = await import(`lucide-react`);
      setIcon(() => iconModule[icon] as React.ComponentType);
    };
    loadIcon();
  }, [icon]);

  return Icon ? <Icon /> : null;
};
