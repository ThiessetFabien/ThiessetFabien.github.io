import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, dirname, relative } from 'path';

import sharp from 'sharp';

// Configuration
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const SIZES = [320, 640, 768, 1024, 1280, 1920]; // Tailles communes pour l'affichage responsive
const SOURCE_DIR = join(process.cwd(), 'public');
const OUTPUT_DIR = join(process.cwd(), 'public/images/responsive');
const EXCLUDED_FOLDERS = ['node_modules', '.next', '.git', 'responsive'];

// Créer le dossier de sortie s'il n'existe pas
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Crée des versions responsives d'une image
 */
async function createResponsiveImage(filePath) {
  try {
    const ext = extname(filePath).toLowerCase();
    const fileBasename = basename(filePath, ext);
    const relativePath = relative(SOURCE_DIR, dirname(filePath));

    // Créer un sous-dossier correspondant au chemin relatif
    const outputSubdir = join(OUTPUT_DIR, relativePath);
    if (!existsSync(outputSubdir)) {
      mkdirSync(outputSubdir, { recursive: true });
    }

    const outputFormat =
      ext === '.webp' ? 'webp' : ext === '.png' ? 'png' : 'jpeg';
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Ne traiter que si l'image est plus grande que la plus petite taille cible
    if (metadata.width <= SIZES[0]) {
      console.log(`⏭️ Skipping ${filePath} (too small: ${metadata.width}px)`);
      return;
    }

    console.log(`⚙️ Processing ${filePath}`);

    // Générer chaque taille
    for (const size of SIZES) {
      // Ne pas agrandir les images
      if (size >= metadata.width) continue;

      const outputPath = join(outputSubdir, `${fileBasename}-${size}${ext}`);

      await image
        .clone()
        .resize({
          width: size,
          withoutEnlargement: true,
        })
        [outputFormat]({
          quality: 80,
        })
        .toFile(outputPath);

      console.log(`   ✅ Created ${size}px version`);
    }

    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Parcourt un répertoire à la recherche d'images
 */
function processDirectory(directory) {
  try {
    const entries = readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(directory, entry.name);

      // Ignorer les dossiers exclus
      if (EXCLUDED_FOLDERS.some((folder) => fullPath.includes(folder))) {
        continue;
      }

      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.isFile()) {
        const extension = extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(extension)) {
          createResponsiveImage(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${directory}:`, error);
  }
}

// Démarrer le traitement
console.log('🔍 Generating responsive images...');
processDirectory(SOURCE_DIR);
console.log(
  '⏳ Processing images in background. This may take a while for large images...'
);
