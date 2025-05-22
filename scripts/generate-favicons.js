const sharp = require('sharp');
const { join } = require('path');

// Couleur primaire de notre thème
const PRIMARY_COLOR = '#6C5DD3';

// Configuration des tailles de favicon
const FAVICON_CONFIGS = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];

async function generateFavicons() {
  try {
    // Créer un SVG de base avec la couleur primaire
    const svgBuffer = Buffer.from(`
      <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="${PRIMARY_COLOR}" rx="64"/>
        <text x="256" y="320" font-family="Expletus Sans, sans-serif" font-size="320" fill="white" text-anchor="middle">F</text>
      </svg>
    `);

    // Générer chaque taille de favicon
    for (const config of FAVICON_CONFIGS) {
      await sharp(svgBuffer)
        .resize(config.size, config.size)
        .png()
        .toFile(join(__dirname, '../public/', config.name));

      console.log(`✓ Generated ${config.name}`);
    }

    // Générer le favicon.ico (qui contient plusieurs tailles)
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFormat('ico')
      .toFile(join(__dirname, '../public/favicon.ico'));

    console.log('✓ Generated favicon.ico');

    console.log('\n✨ All favicons generated successfully');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
