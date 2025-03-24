/** @type {import('next').NextConfig} */
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/images/[name][ext]',
      },
    });
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['tailwindcss', 'autoprefixer'],
            },
          },
        },
      ],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      'leaflet/dist/images': resolve(
        __dirname,
        'node_modules/leaflet/dist/images'
      ),
      'lucide-react': resolve(__dirname, 'node_modules/lucide-react'),
    };
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.{png,jpg,gif}': ['@next/font/image'],
      },
    },
  },
  transpilePackages: ['leaflet', 'react-leaflet', 'lucide-react'],
};

export default nextconfig;
