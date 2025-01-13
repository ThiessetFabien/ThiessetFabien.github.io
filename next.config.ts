/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';

const nextconfig: NextConfig = {
  env: {
    PORT: process.env.PORT || '3000',
  },
  reactStrictMode: false,
};

export default nextconfig;
