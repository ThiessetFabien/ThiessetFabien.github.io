import { copyFileSync, existsSync, renameSync } from 'fs';
import { join } from 'path';

import sharp from 'sharp';

async function optimizeProfileImage() {
  const inputPath = join(process.cwd(), 'public/images/profile.webp');
  const outputPath = join(process.cwd(), 'public/images/profile.webp');

  try {
    const backupPath = join(
      process.cwd(),
      'public/images/profile.original.webp'
    );
    if (!existsSync(backupPath)) {
      copyFileSync(inputPath, backupPath);
    }

    await sharp(inputPath)
      .resize({
        width: 400,
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(outputPath + '.temp');

    renameSync(outputPath + '.temp', outputPath);

    console.log('Profile image optimized successfully');
  } catch (error) {
    console.error('Error optimizing profile image:', error);
  }
}

optimizeProfileImage();
