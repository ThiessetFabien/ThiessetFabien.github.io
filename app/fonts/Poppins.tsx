import { Poppins as PoppinsFont } from 'next/font/google';

export const Poppins = PoppinsFont({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '500', '700'],
  variable: '--font-poppins-sans',
});
