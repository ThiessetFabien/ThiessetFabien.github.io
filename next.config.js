/** @type {import('next').NextConfig} */

const nextconfig = {
  env: {
    PORT: process.env.PORT || '3000',
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_REDIRECT_URI: process.env.GMAIL_REDIRECT_URI,
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
    SMTP_SERVER_USERNAME: process.env.SMTP_SERVER_USERNAME,
  },
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextconfig;
