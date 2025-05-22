import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin racine du projet
const rootDir = path.join(__dirname, '..');

// Dossiers à ignorer
const ignoredDirs = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.husky',
  '.vscode',
  '.idea',
  'coverage',
  'out',
];

// Fonction pour vérifier si un dossier est vide
function isDirEmpty(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files.length === 0;
  } catch (err) {
    console.error(`Erreur lors de la lecture du dossier ${dirPath}:`, err);
    return false;
  }
}

// Fonction pour vérifier si un dossier doit être ignoré
function shouldIgnoreDir(dirPath) {
  const dirName = path.basename(dirPath);
  return ignoredDirs.includes(dirName) || dirName.startsWith('.');
}

// Fonction récursive pour supprimer les dossiers vides
function removeEmptyDirs(dirPath) {
  if (shouldIgnoreDir(dirPath)) {
    return false;
  }

  // Variable pour suivre si des fichiers existent encore dans le dossier
  let filesStillExist = false;

  try {
    const files = fs.readdirSync(dirPath);

    // Traiter d'abord tous les sous-dossiers
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const wasDeleted = removeEmptyDirs(fullPath);
        if (!wasDeleted) {
          filesStillExist = true;
        }
      } else {
        // Si au moins un fichier existe, le dossier n'est pas vide
        filesStillExist = true;
      }
    }

    // Vérifier si le dossier est vide après le traitement des sous-dossiers
    if (isDirEmpty(dirPath) && dirPath !== rootDir) {
      console.log(
        `Suppression du dossier vide: ${path.relative(rootDir, dirPath)}`
      );
      fs.rmdirSync(dirPath);
      return true;
    }

    return !filesStillExist;
  } catch (err) {
    console.error(`Erreur lors du traitement du dossier ${dirPath}:`, err);
    return false;
  }
}

// Démarrer la recherche à partir du répertoire racine du projet
console.log('Recherche et suppression des dossiers vides...');
const deletedAny = removeEmptyDirs(rootDir);
console.log(
  deletedAny
    ? 'Dossiers vides supprimés avec succès.'
    : 'Aucun dossier vide trouvé.'
);
