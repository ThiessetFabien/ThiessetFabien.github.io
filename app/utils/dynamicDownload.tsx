/**
 * @file dynamicDownload.tsx
 * @description This file exports a function that returns an object with download attributes based on the downloadActive parameter.
 */

/**
 * Returns an object with download attributes based on the downloadActive parameter.
 * @param {boolean} downloadActive - A boolean indicating whether the download is active.
 * @returns {Object} An object with either a download attribute or a target attribute.
 * @example
 * const downloadAttributes = dynamicDownload(true); // { download: true }
 * const downloadAttributes = dynamicDownload(false); // { target: '_blank' }
 */

export const dynamicDownload = (
  downloadActive: boolean
): { download?: boolean; target?: string } => {
  return downloadActive ? { download: true } : { target: '_blank' };
};
