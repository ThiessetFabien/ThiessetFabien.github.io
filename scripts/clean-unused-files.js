#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Script de nettoyage sélectif des fichiers inutilisés
 * Supprime uniquement les fichiers considérés comme "sûrs" à supprimer
 */

const SAFE_TO_DELETE = [
  // Fichiers de test
  'components/test.tsx',

  // Fichiers vides (0 B)
  'components/ui/maps/LeafletMapFixed.tsx',
  'components/ui/maps/TestLeafletMap.tsx',
  'components/ui/qrcode/index.ts',
  'components/ui/qrcode/QRCodeOverlay.tsx',
  'hooks/useMotionVariants.ts',
  'hooks/useScrollVisibility.ts',
  'utils/leaflet/diagnostics.ts',
  'utils/leaflet/testUtils.ts',

  // Types inutilisés probablement sûrs
  'types/GitHubStats.ts',
  'types/JobsProps.ts',
  'types/TagsProps.ts',
  'types/TestimonialProps.ts',
  'types/TypewriterTextProps.ts',
  'types/useFloatingToggleProps.ts',

  // Utilitaires spécifiques non utilisés
  'utils/assetPath.ts',
  'utils/expertises.util.ts',
  'utils/ShuffleArray.util.ts',
  'utils/toBase64.ts',
  'utils/shimmer.ts',
  'utils/normalizePaths.ts',
  'utils/dynamicYear.util.ts',

  // Configurations non utilisées
  'config/gmailAuth.config.ts',
  'config/css-classes.ts',
  'config/sectionMappings.ts',

  // Hooks spécifiques non utilisés
  'hooks/ScrollToTop.hook.ts',
  'hooks/useActiveSection.hook.ts',
  'hooks/useFloatingToggle.hook.ts',
  'hooks/useLeafletMap.ts',
  'hooks/useTestimonialsCarousel.ts',
  'hooks/useThemeManager.hook.ts',

  // Composants spécifiques non utilisés
  'components/ui/counter/Counter.tsx',
  'components/ui/skeleton.tsx',
  'components/ui/forms/index.ts',
  'components/ui/LoadingScreen.tsx',
];

const MAYBE_SAFE = [
  // Styles qui pourraient être inutilisés
  'styles/grid.style.tsx',
  'styles/hideItem.style.ts',
  'styles/hovers.style.ts',
  'styles/image.styles.ts',
  'styles/text.style.ts',
  'styles/translate.style.ts',
  'styles/variantsAnimation.ts',

  // Composants UI génériques
  'lib/components/ui/avatar.tsx',
  'lib/components/ui/badge.tsx',
  'lib/components/ui/button.tsx',
  'lib/components/ui/carousel.tsx',
  'lib/components/ui/checkbox.tsx',
  'lib/components/ui/collapsible.tsx',
  'lib/components/ui/form.tsx',
  'lib/components/ui/hover-card.tsx',
  'lib/components/ui/input.tsx',
  'lib/components/ui/label.tsx',
  'lib/components/ui/menubar.tsx',
  'lib/components/ui/progress.tsx',
  'lib/components/ui/radio-group.tsx',
  'lib/components/ui/sheet.tsx',
  'lib/components/ui/skeleton.tsx',
  'lib/components/ui/tabs.tsx',
  'lib/components/ui/textarea.tsx',
  'lib/components/ui/toggle.tsx',
];

const KEEP_FOR_NOW = [
  // Points d'entrée potentiels
  'app/metadata.ts',
  'app/videos/metadata.ts',

  // Composants principaux
  'components/HomePage.tsx',
  'lib/components/blocks/hero-parallax.tsx',

  // Contextes React importants
  'contexts/DataContext.tsx',
  'contexts/LoadingContext.tsx',

  // Utilitaires de formatage
  'utils/formatText.util.ts',
  'utils/HighlightedText.tsx',
  'utils/motion.util.ts',
  'utils/baseUrl.util.ts',
  'utils/mediaPathChecker.ts',
  'utils/dynamicLoading.util.ts',

  // Types principaux
  'types/CardProps.ts',
  'types/ActionButtonProps.ts',
  'types/FormFieldProps.ts',
  'types/LayoutProps.ts',
  'types/ProjectProps.ts',
  'types/LeafletMapProps.ts',
  'types/MenuItemProps.tsx',

  // Fetch et API
  'lib/fetch/github-stats.ts',
  'fetch/loadData.ts',
  'schemas/contactForm.schema.ts',
  'middlewares/gmailAuth.middleware.ts',
];

class SelectiveFileCleaner {
  constructor(srcDir) {
    this.srcDir = path.resolve(srcDir);
    this.deletedFiles = [];
    this.keptFiles = [];
    this.totalSize = 0;
  }

  getFileSize(filePath) {
    try {
      return fs.statSync(filePath).size;
    } catch {
      return 0;
    }
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  deleteFile(relativePath) {
    const fullPath = path.join(this.srcDir, relativePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Fichier non trouvé: ${relativePath}`);
      return false;
    }

    const size = this.getFileSize(fullPath);

    try {
      fs.unlinkSync(fullPath);
      this.deletedFiles.push({ path: relativePath, size });
      this.totalSize += size;
      console.log(`✅ Supprimé: ${relativePath} (${this.formatSize(size)})`);
      return true;
    } catch (error) {
      console.log(
        `❌ Erreur lors de la suppression de ${relativePath}: ${error.message}`
      );
      return false;
    }
  }

  cleanupEmptyDirectories() {
    console.log('\n🧹 Nettoyage des dossiers vides...');

    const removeEmptyDirs = (dirPath) => {
      if (!fs.existsSync(dirPath)) return;

      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
          removeEmptyDirs(itemPath);
        }
      }

      // Vérifier si le dossier est maintenant vide
      const remainingItems = fs.readdirSync(dirPath);
      if (remainingItems.length === 0 && dirPath !== this.srcDir) {
        try {
          fs.rmdirSync(dirPath);
          console.log(
            `📁 Dossier vide supprimé: ${path.relative(this.srcDir, dirPath)}`
          );
        } catch (error) {
          console.log(
            `⚠️  Impossible de supprimer le dossier: ${path.relative(this.srcDir, dirPath)}`
          );
        }
      }
    };

    removeEmptyDirs(this.srcDir);
  }

  run(mode = 'safe') {
    console.log('🧹 NETTOYAGE SÉLECTIF DES FICHIERS INUTILISÉS\n');

    let filesToDelete = [];

    switch (mode) {
      case 'safe':
        filesToDelete = SAFE_TO_DELETE;
        console.log(
          '🔒 Mode SÉCURISÉ - Suppression uniquement des fichiers considérés comme sûrs\n'
        );
        break;
      case 'aggressive':
        filesToDelete = [...SAFE_TO_DELETE, ...MAYBE_SAFE];
        console.log(
          '⚡ Mode AGRESSIF - Suppression des fichiers sûrs + potentiellement sûrs\n'
        );
        break;
      case 'dry-run':
        filesToDelete = [...SAFE_TO_DELETE, ...MAYBE_SAFE];
        console.log(
          '👀 Mode TEST - Simulation de suppression (aucun fichier ne sera supprimé)\n'
        );
        break;
      default:
        console.log(
          '❌ Mode invalide. Modes disponibles: safe, aggressive, dry-run'
        );
        return;
    }

    console.log(`📋 ${filesToDelete.length} fichiers à traiter:\n`);

    filesToDelete.forEach((file) => {
      const fullPath = path.join(this.srcDir, file);
      const size = this.getFileSize(fullPath);

      if (mode === 'dry-run') {
        if (fs.existsSync(fullPath)) {
          console.log(`🔍 SIMULATION: ${file} (${this.formatSize(size)})`);
          this.totalSize += size;
        } else {
          console.log(`⚠️  SIMULATION: Fichier non trouvé: ${file}`);
        }
      } else {
        this.deleteFile(file);
      }
    });

    if (mode !== 'dry-run') {
      this.cleanupEmptyDirectories();
    }

    console.log('\n📊 RÉSUMÉ:');
    console.log('==========');

    if (mode === 'dry-run') {
      console.log(
        `🔍 Simulation de suppression de ${filesToDelete.length} fichiers`
      );
      console.log(
        `💾 Taille totale qui serait libérée: ${this.formatSize(this.totalSize)}`
      );
    } else {
      console.log(`✅ ${this.deletedFiles.length} fichiers supprimés`);
      console.log(`💾 Espace libéré: ${this.formatSize(this.totalSize)}`);
    }

    // Recommandations
    console.log('\n💡 RECOMMANDATIONS:');
    console.log('- Exécutez vos tests après le nettoyage');
    console.log("- Vérifiez que l'application fonctionne correctement");
    console.log('- Commitez les changements avant de continuer');

    if (mode === 'safe') {
      console.log('\n🔄 Pour un nettoyage plus agressif, utilisez:');
      console.log('node scripts/clean-unused-files.js aggressive');
    }
  }
}

// Utilisation
const mode = process.argv[3] || 'safe';
const srcDir = process.argv[2] || './src';

const cleaner = new SelectiveFileCleaner(srcDir);
cleaner.run(mode);
