/** @type {import('next').NextConfig} */

import { createRequire } from 'module';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function analyzeBundle(config) {
  if (process.env.ANALYZE === 'true') {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: resolve(__dirname, 'bundle-analysis.html'),
        generateStatsFile: true,
        statsFilename: resolve(__dirname, 'bundle-stats.json'),
        openAnalyzer: false,
      })
    );
  }
  return config;
}

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
  productionBrowserSourceMaps: false,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    domains: ['tile.openstreetmap.org', 'media.licdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/dms/image/**',
      },
    ],
    deviceSizes: [360, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp', 'image/avif'],
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
      exclude: /leaflet\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'tailwindcss',
                'autoprefixer',
                process.env.NODE_ENV === 'production' ? 'cssnano' : null,
              ].filter(Boolean),
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /leaflet\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      exclude: /node_modules[\\/]leaflet/,
      use: [
        {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            sizes: [300, 600, 900, 1200],
            placeholder: true,
            placeholderSize: 20,
            quality: 70,
            name: 'static/images/[name]-[width].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(png|jpe?g)$/i,
      include: /node_modules[\\/]leaflet/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/images/[name].[hash][ext]',
      },
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'leaflet/dist/images': resolve(
        __dirname,
        'node_modules/leaflet/dist/images'
      ),
      'lucide-react': resolve(__dirname, 'node_modules/lucide-react'),
    };

    if (process.env.NODE_ENV === 'production') {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        },
        moduleIds: 'deterministic',
      };
    }

    return analyzeBundle(config);
  },
  experimental: {
    turbo: {
      rules: {
        '*.{png,jpg,gif}': ['@next/font/image'],
      },
    },
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    modularizeImports: {
      'lucide-react': {
        transform: 'lucide-react/dist/esm/icons/{{member}}',
        preventFullImport: true,
      },
    },
  },
  transpilePackages: ['leaflet', 'react-leaflet', 'lucide-react'],
};

export default nextconfig;
