import React from 'react';
import { Map } from '@/ui/Map/Map';

export function isMapComponent(content: React.ReactNode): boolean {
  return React.isValidElement(content) && content.type === Map;
}
