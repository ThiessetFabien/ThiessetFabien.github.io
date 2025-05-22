import { copyFileSync, existsSync, mkdirSync, renameSync } from 'fs';
import { join, extname, dirname } from 'path';
import { promisify } from 'util';
import { readdir } from 'fs';

import sharp from 'sharp';

const readdirAsync = promisify(readdir);

// Configuration des types d'images à optimiser
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const QUALITY = {
  jpeg: 80,
  jpg: 80,
  png: 80,
  webp: 75,
};

// Dossiers à exclure de l'optimisation
const EXCLUDED_FOLDERS = ['node_modules', '.next', '.git', 'leaflet'];

async function optimizeProfileImage() {
  const inputPath = join(process.cwd(), 'public/images/profile.webp');
  const outputPath = join(process.cwd(), 'public/images/profile.webp');

  try {
    const backupPath = join(
      process.cwd(),
      'backups/images/profile.original.webp'
    );
    if (!existsSync(backupPath)) {
      // Créer le dossier de backup s'il n'existe pas
      const backupDir = dirname(backupPath);
      if (!existsSync(backupDir)) {
        mkdirSync(backupDir, { recursive: true });
      }
      copyFileSync(inputPath, backupPath);
      console.log(`Backup created: ${backupPath}`);
    }

    await sharp(inputPath)
      .resize({
        width: 400,
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(outputPath + '.temp');

    renameSync(outputPath + '.temp', outputPath);

    console.log('✅ Profile image optimized successfully');
  } catch (error) {
    console.error('❌ Error optimizing profile image:', error);
  }
}

async function processImage(filePath) {
  try {
    const ext = extname(filePath).substring(1).toLowerCase();

    if (!Object.keys(QUALITY).includes(ext)) {
      return;
    }

    const outputDir = dirname(filePath);
    const outputPath = filePath;
    const fileName = filePath.split('/').pop();
    const backupPath = join(
      process.cwd(),
      `backups/images/${fileName}.original`
    );

    // Créer une sauvegarde si elle n'existe pas
    if (!existsSync(backupPath)) {
      // Créer le dossier de backup s'il n'existe pas
      const backupDir = dirname(backupPath);
      if (!existsSync(backupDir)) {
        mkdirSync(backupDir, { recursive: true });
      }
      copyFileSync(filePath, backupPath);
      console.log(`Backup created: ${backupPath}`);
    }

    // Optimiser l'image
    await sharp(filePath)
      .resize({
        width: 1200, // Taille maximale, adaptez selon vos besoins
        withoutEnlargement: true,
      })
      [ext === 'webp' ? 'webp' : ext === 'png' ? 'png' : 'jpeg']({
        quality: QUALITY[ext],
      })
      .toFile(`${outputPath}.temp`);

    renameSync(`${outputPath}.temp`, outputPath);
    console.log(`✅ Optimized: ${filePath}`);

    return { success: true, path: filePath };
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
    return { success: false, path: filePath, error: error.message };
  }
}

async function processDirectory(directory) {
  try {
    const entries = await readdirAsync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(directory, entry.name);

      // Sauter les dossiers exclus
      if (EXCLUDED_FOLDERS.some((folder) => fullPath.includes(folder))) {
        continue;
      }

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const extension = extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(extension)) {
          await processImage(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${directory}:`, error);
  }
}

async function main() {
  console.log('🔍 Starting image optimization...');

  // S'assurer que le dossier .cache existe
  const cacheDir = join(process.cwd(), '.cache');
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }

  // Optimiser l'image de profil spécifiquement
  await optimizeProfileImage();

  // Optimiser toutes les images du dossier public
  const publicDir = join(process.cwd(), 'public');
  await processDirectory(publicDir);

  console.log('✨ Image optimization complete!');
}

main().catch((error) => {
  console.error('❌ Fatal error during image optimization:', error);
  process.exit(1);
});
