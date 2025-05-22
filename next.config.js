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
  images: {
    unoptimized: true,
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    domains: ['tile.openstreetmap.org', 'media.licdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
    ],
    deviceSizes: [360, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config) => {
    // Optimisez les règles de webpack pour accélérer le build
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/images/[name][ext]',
      },
    });

    // Optimisation pour la première compilation
    config.watchOptions = {
      ignored: ['**/.git/**', '**/node_modules/**', '**/public/**'],
      aggregateTimeout: 300, // Délai en ms après lequel webpack recompile après un changement
    };

    // Optimisations pour la première compilation
    if (process.env.OPTIMIZE_FIRST_COMPILATION === 'true') {
      // Utiliser un cache persistant pour webpack
      config.cache = {
        type: 'filesystem',
        cacheDirectory: resolve(__dirname, '.next/cache/webpack'),
        buildDependencies: {
          config: [__filename], // Invalide le cache quand ce fichier change
        },
        compression: false, // Désactiver la compression pour la première compilation
      };

      // Optimisations aggressives pour la première compilation
      config.optimization = {
        ...config.optimization,
        minimize: false, // Désactive la minification pour la première compilation
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    } else {
      // Configuration normale pour les compilations suivantes
      config.cache = {
        type: 'filesystem',
        cacheDirectory: resolve(__dirname, '.next/cache/webpack'),
      };
    }

    // Utilisez le cache de Bun pour les transformations CSS
    config.module.rules.push({
      test: /\.css$/,
      exclude: /leaflet\.css$/,
      use: [
        { loader: 'style-loader', options: { injectType: 'styleTag' } },
        { loader: 'css-loader', options: { importLoaders: 1 } },
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
            // Activer le cache pour accélérer les builds suivants
            cache: true,
            cacheDirectory: resolve(__dirname, '.cache/images'),
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
      '@styles': resolve(__dirname, 'src/styles'),
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
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        moduleIds: 'deterministic',
      };
    } else {
      // En mode développement, optimiser pour la vitesse plutôt que pour la taille
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }

    return analyzeBundle(config);
  },
  experimental: {
    turbo: {
      rules: {
        // Simplifier les règles pour Turbopack
        '*.{png,jpg,gif,webp}': ['@next/font/image'],
      },
      // Réduire les fonctionnalités expérimentales pour augmenter la compatibilité
      resolveAlias: {
        '@src': './src',
      },
    },
    // Désactiver l'optimisation CSS pour éviter les problèmes avec critters
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Optimisation du chargement
    serverMinification: true,
    webpackBuildWorker: true,
  },
  transpilePackages: ['leaflet', 'react-leaflet', 'lucide-react'],
  // Configuration correcte pour ignorer certains fichiers lors de la surveillance
  // https://nextjs.org/docs/app/api-reference/next-config-js/watchOptions
  onDemandEntries: {
    // période (en ms) où le serveur continuera à garder les pages en mémoire
    maxInactiveAge: 25 * 1000,
    // nombre de pages à garder en mémoire
    pagesBufferLength: 2,
  },
};

export default nextconfig;
