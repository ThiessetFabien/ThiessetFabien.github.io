/**
 * Converts a string to its Base64 encoded representation.
 * Works in both browser and Node.js environments.
 *
 * @param str - The string to convert to Base64
 * @returns The Base64 encoded string
 *
 * @remarks
 * This function uses different methods based on the runtime environment:
 * - In Node.js, it uses Buffer.from().toString('base64')
 * - In browsers, it uses window.btoa()
 */
export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
