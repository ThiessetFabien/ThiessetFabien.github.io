/**
 * Generates an SVG string with a shimmering animation effect.
 * This is commonly used as a placeholder for loading content.
 *
 * @param w - The width of the SVG in pixels
 * @param h - The height of the SVG in pixels
 * @returns A string containing SVG markup with an animated gradient effect
 *
 * @example
 * const placeholder = shimmer(300, 200);
 * // Returns an SVG string with a 300x200 dimensions and shimmering animation
 */
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
