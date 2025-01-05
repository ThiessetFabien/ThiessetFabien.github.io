/**
 * @file dynamicYear.tsx
 * @description This file exports the current year dynamically.
 */

import { useEffect, useState } from 'react';

/**
 * Get the current year.
 * @returns {number} The current year.
 */
export const DynamicYear = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) return null;
  return <span>{year}</span>;
};
