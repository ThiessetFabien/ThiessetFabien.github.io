import React, { useEffect, useState } from 'react';

export const IconLoader = (icon: string) => {
  const [Icon, setIcon] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      const iconModule: any = await import(`lucide-react`);
      setIcon(() => iconModule[icon] as React.ComponentType);
    };
    loadIcon();
  }, [icon]);

  return Icon ? <Icon /> : null;
};
