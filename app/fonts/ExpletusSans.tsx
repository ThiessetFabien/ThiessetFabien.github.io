import { Expletus_Sans as Expletus_SansFont } from 'next/font/google';

export const Expletus_Sans = Expletus_SansFont({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['500', '700'],
  variable: '--font-caption',
});
