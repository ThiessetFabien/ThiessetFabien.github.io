/**
 * Normalizes an image path to ensure it has a consistent format
 * @param path The image path to normalize
 * @returns Normalized image path
 */
export const normalizeImagePath = (path: string): string => {
  if (!path) return '';

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;

  return cleanPath;
};

/**
 * Normalizes a video path to ensure it has a consistent format
 * @param path The video path to normalize
 * @returns Normalized video path
 */
export const normalizeVideoPath = (path: string): string => {
  if (!path) return '';

  // Remove leading slash if present
  let cleanPath = path.startsWith('/') ? path.substring(1) : path;

  // Remove 'videos/' prefix if already present
  if (cleanPath.startsWith('videos/')) {
    cleanPath = cleanPath.substring(7);
  }

  return cleanPath;
};
