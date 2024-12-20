/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';

const nextconfig: NextConfig = {
  env: {
    PORT: process.env.PORT || '3000',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};

export default nextconfig;
