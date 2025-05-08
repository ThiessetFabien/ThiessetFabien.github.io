/**
 * Utility functions for handling asset paths (images, videos, etc.)
 * Ensures consistent path formatting across the application
 */

/**
 * Formats an image path to ensure it has the correct structure
 * @param path - The image path to format
 * @returns Properly formatted image path
 */
export const getImagePath = (path: string): string => {
  // Handle external URLs (http, https, data URLs)
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:image/')
  ) {
    return path;
  }

  // Handle LinkedIn images
  if (path.startsWith('media.licdn.com')) {
    return `https://${path}`;
  }

  // Ensure path starts with /
  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Formats a video path to ensure it has the correct structure
 * @param path - The video path to format
 * @returns Properly formatted video path
 */
export const getVideoPath = (path: string): string => {
  // Handle external URLs (http, https)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Handle undefined or empty paths
  if (!path || path === 'undefined') {
    return '';
  }

  // For video files, ensure they're in the /videos directory
  if (!path.startsWith('/videos/')) {
    return path.startsWith('/') ? `/videos${path}` : `/videos/${path}`;
  }

  return path;
};
