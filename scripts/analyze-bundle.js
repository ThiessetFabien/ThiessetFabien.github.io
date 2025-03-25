import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let BundleAnalyzerPlugin;
if (process.env.ANALYZE === 'true') {
  try {
    const webpackBundleAnalyzer = await import('webpack-bundle-analyzer');
    BundleAnalyzerPlugin = webpackBundleAnalyzer.BundleAnalyzerPlugin;
  } catch (error) {
    console.warn('webpack-bundle-analyzer non disponible:', error.message);
  }
}

export default function analyzeBundle(config) {
  if (process.env.ANALYZE === 'true' && BundleAnalyzerPlugin) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.join(__dirname, '../bundle-analysis.html'),
        generateStatsFile: true,
        statsFilename: path.join(__dirname, '../bundle-stats.json'),
        openAnalyzer: false,
      })
    );
  }
  return config;
}
