/**
 * Utility to check and validate media paths
 * This helps ensure images and videos are using correct paths
 */

import fs from 'fs';
import path from 'path';

/**
 * Normalizes a media path, ensuring it has the correct format
 * @param mediaPath The path to normalize
 * @returns Normalized path
 */
export const normalizeMediaPath = (mediaPath: string): string => {
  // Remove any leading slash
  const normalizedPath = mediaPath.startsWith('/')
    ? mediaPath.substring(1)
    : mediaPath;

  // Handle absolute URLs
  if (
    normalizedPath.startsWith('http://') ||
    normalizedPath.startsWith('https://')
  ) {
    return normalizedPath;
  }

  // Handle LinkedIn media paths
  if (normalizedPath.startsWith('media.licdn.com')) {
    return `https://${normalizedPath}`;
  }

  return normalizedPath;
};

/**
 * Checks if an image file exists in the public directory
 * @param imagePath The image path to check
 * @returns Boolean indicating if the file exists
 */
export const checkImageExists = (imagePath: string): boolean => {
  if (!imagePath) return false;

  // Don't check external URLs
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return true;
  }

  const normalizedPath = normalizeMediaPath(imagePath);
  const fullPath = path.join(process.cwd(), 'public', normalizedPath);

  try {
    return fs.existsSync(fullPath);
  } catch (error) {
    console.error(`Error checking if image exists: ${error}`);
    return false;
  }
};

/**
 * Checks if a video file exists in the public directory
 * @param videoPath The video path to check
 * @returns Boolean indicating if the file exists
 */
export const checkVideoExists = (videoPath: string): boolean => {
  if (!videoPath) return false;

  const normalizedPath = normalizeMediaPath(videoPath);
  // Videos are expected to be in the videos directory
  const fullPath = path.join(process.cwd(), 'public', 'videos', normalizedPath);

  try {
    return fs.existsSync(fullPath);
  } catch (error) {
    console.error(`Error checking if video exists: ${error}`);
    return false;
  }
};

/**
 * Gets the correct path for an image to be used in an <Image> component
 * @param imagePath The image path
 * @returns The correct path to use
 */
export const getImageSrc = (imagePath: string): string => {
  if (!imagePath) return '';

  // Handle absolute URLs
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Handle LinkedIn media
  if (imagePath.startsWith('media.licdn.com')) {
    return `https://${imagePath}`;
  }

  // Ensure the path starts with a slash for Next.js Image component
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

/**
 * Gets the correct path for a video to be used in a <video> element
 * @param videoPath The video path
 * @returns The correct path to use
 */
export const getVideoSrc = (videoPath: string): string => {
  if (!videoPath) return '';

  // Videos are expected to be in the videos directory
  return `/videos/${normalizeMediaPath(videoPath)}`;
};
