#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Script sécurisé pour nettoyer les fichiers inutilisés
 * Analyse précisément les dépendances avant de suggérer des suppressions
 */

class SafeUnusedFilesCleaner {
  constructor(srcDir) {
    this.srcDir = path.resolve(srcDir);
    this.allFiles = [];
    this.usedFiles = new Set();
    this.entryPoints = [];
    this.shadowcnComponents = new Set();
    this.importMap = new Map(); // Fichier -> Set des imports
  }

  // Trouve tous les fichiers
  findAllFilesRecursive(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!['node_modules', '.next', 'dist', 'build'].includes(file)) {
          this.findAllFilesRecursive(filePath, fileList);
        }
      } else if (
        stat.isFile() &&
        /\.(ts|tsx|js|jsx)$/.test(file) &&
        !file.endsWith('.d.ts')
      ) {
        fileList.push(filePath);
      }
    });

    return fileList;
  }

  findAllFiles() {
    this.allFiles = this.findAllFilesRecursive(this.srcDir);
    console.log(`📁 Analysé ${this.allFiles.length} fichiers`);
  }

  // Identifie les composants shadcn/ui
  identifyShadcnComponents() {
    this.allFiles.forEach((file) => {
      const relativePath = path.relative(this.srcDir, file);
      if (relativePath.startsWith('lib/components/ui/')) {
        this.shadowcnComponents.add(file);
      }
    });
    console.log(
      `🎨 Identifié ${this.shadowcnComponents.size} composants shadcn/ui`
    );
  }

  // Trouve les points d'entrée
  findEntryPoints() {
    this.entryPoints = this.allFiles.filter((file) => {
      const relativePath = path.relative(this.srcDir, file);
      return (
        // Pages Next.js
        relativePath.includes('app/page.') ||
        relativePath.includes('app/layout.') ||
        (relativePath.includes('app/') && relativePath.includes('/page.')) ||
        (relativePath.includes('app/') && relativePath.includes('/layout.')) ||
        (relativePath.includes('app/api/') &&
          relativePath.includes('/route.')) ||
        relativePath.includes('pages/') ||
        // Middlewares
        relativePath === 'middleware.ts' ||
        relativePath === 'middleware.tsx' ||
        // Pages spéciales Next.js
        relativePath.includes('app/not-found.') ||
        relativePath.includes('app/loading.') ||
        relativePath.includes('app/error.') ||
        relativePath.includes('app/global-error.') ||
        // Points d'entrée principaux
        relativePath === 'lib/utils.tsx' ||
        relativePath === 'lib/utils.ts'
      );
    });

    console.log(`🚪 Trouvé ${this.entryPoints.length} points d'entrée`);
  }

  // Parse les imports avec plus de précision
  parseImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = [];

      // Patterns d'imports plus précis
      const importPatterns = [
        // import ... from '...'
        /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"`]([^'"`]+)['"`]/g,
        // import('...')
        /import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
        // require('...')
        /require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
        // dynamic imports Next.js
        /dynamic\s*\(\s*\(\)\s*=>\s*import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g,
      ];

      importPatterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const importPath = match[1];
          if (this.isLocalImport(importPath)) {
            const resolvedPath = this.resolveImportPath(importPath, filePath);
            if (resolvedPath && this.allFiles.includes(resolvedPath)) {
              imports.push(resolvedPath);
            }
          }
        }
      });

      return imports;
    } catch (error) {
      console.warn(
        `⚠️  Erreur lecture ${path.relative(this.srcDir, filePath)}: ${error.message}`
      );
      return [];
    }
  }

  isLocalImport(importPath) {
    return (
      importPath.startsWith('.') ||
      importPath.startsWith('@') ||
      importPath.startsWith('/') ||
      importPath.startsWith('src/')
    );
  }

  resolveImportPath(importPath, fromFile) {
    const fromDir = path.dirname(fromFile);
    let resolvedPath;

    // Gestion des alias
    if (importPath.startsWith('@')) {
      // @src/... -> src/...
      if (importPath.startsWith('@src/')) {
        resolvedPath = path.resolve(this.srcDir, importPath.substring(5));
      }
      // @lib/... -> src/lib/...
      else if (importPath.startsWith('@lib/')) {
        resolvedPath = path.resolve(
          this.srcDir,
          'lib',
          importPath.substring(5)
        );
      }
      // @/... -> src/...
      else if (importPath.startsWith('@/')) {
        resolvedPath = path.resolve(this.srcDir, importPath.substring(2));
      }
      // @styles/... -> src/styles/...
      else if (importPath.startsWith('@styles/')) {
        resolvedPath = path.resolve(
          this.srcDir,
          'styles',
          importPath.substring(8)
        );
      }
      // @utils/... -> src/utils/...
      else if (importPath.startsWith('@utils/')) {
        resolvedPath = path.resolve(
          this.srcDir,
          'utils',
          importPath.substring(7)
        );
      }
      // @ui/... -> src/components/ui/...
      else if (importPath.startsWith('@ui/')) {
        resolvedPath = path.resolve(
          this.srcDir,
          'components/ui',
          importPath.substring(4)
        );
      } else {
        resolvedPath = path.resolve(this.srcDir, importPath.substring(1));
      }
    } else if (importPath.startsWith('src/')) {
      resolvedPath = path.resolve(this.srcDir, '..', importPath);
    } else if (importPath.startsWith('/')) {
      resolvedPath = path.resolve(this.srcDir, '..', importPath.substring(1));
    } else {
      resolvedPath = path.resolve(fromDir, importPath);
    }

    // Essaie différentes extensions
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];

    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
      return resolvedPath;
    }

    for (const ext of extensions) {
      const withExt = resolvedPath + ext;
      if (fs.existsSync(withExt)) {
        return withExt;
      }
    }

    // Essaie index.* dans un dossier
    if (
      fs.existsSync(resolvedPath) &&
      fs.statSync(resolvedPath).isDirectory()
    ) {
      for (const ext of extensions) {
        const indexFile = path.join(resolvedPath, 'index' + ext);
        if (fs.existsSync(indexFile)) {
          return indexFile;
        }
      }
    }

    return null;
  }

  // Construit la carte des imports
  buildImportMap() {
    console.log('🗺️  Construction de la carte des imports...');

    this.allFiles.forEach((file) => {
      const imports = this.parseImports(file);
      this.importMap.set(file, new Set(imports));
    });
  }

  // Analyse récursive des dépendances
  analyzeDependencies() {
    console.log('🔍 Analyse des dépendances...');

    const toAnalyze = [...this.entryPoints];
    const analyzed = new Set();

    // Marquer tous les points d'entrée comme utilisés
    this.entryPoints.forEach((file) => this.usedFiles.add(file));

    while (toAnalyze.length > 0) {
      const currentFile = toAnalyze.pop();

      if (analyzed.has(currentFile)) {
        continue;
      }

      analyzed.add(currentFile);
      const imports = this.importMap.get(currentFile) || new Set();

      imports.forEach((importedFile) => {
        if (!this.usedFiles.has(importedFile)) {
          this.usedFiles.add(importedFile);
          toAnalyze.push(importedFile);
        }
      });
    }

    console.log(`✅ ${this.usedFiles.size} fichiers identifiés comme utilisés`);
  }

  // Trouve les fichiers vraiment inutilisés
  findReallyUnusedFiles() {
    const unusedFiles = [];

    this.allFiles.forEach((file) => {
      if (!this.usedFiles.has(file)) {
        const relativePath = path.relative(this.srcDir, file);
        const stats = fs.statSync(file);

        // Classification des fichiers
        let category = 'other';
        let risk = 'medium';

        if (this.shadowcnComponents.has(file)) {
          category = 'shadcn';
          risk = 'high'; // Les composants shadcn peuvent être référencés dynamiquement
        } else if (relativePath.includes('/components/')) {
          category = 'components';
          risk = 'medium';
        } else if (relativePath.includes('/utils/')) {
          category = 'utils';
          risk = 'low';
        } else if (relativePath.includes('/hooks/')) {
          category = 'hooks';
          risk = 'medium';
        } else if (relativePath.includes('/types/')) {
          category = 'types';
          risk = 'low';
        } else if (relativePath.includes('/styles/')) {
          category = 'styles';
          risk = 'low';
        } else if (relativePath.includes('/config/')) {
          category = 'config';
          risk = 'medium';
        }

        // Fichiers vides = sûrs à supprimer
        if (stats.size === 0) {
          risk = 'safe';
        }

        // Fichiers de test = sûrs à supprimer
        if (relativePath.includes('test') || relativePath.includes('Test')) {
          risk = 'safe';
        }

        unusedFiles.push({
          absolute: file,
          relative: relativePath,
          size: stats.size,
          category,
          risk,
        });
      }
    });

    return unusedFiles.sort((a, b) => a.relative.localeCompare(b.relative));
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  run() {
    console.log('🔍 ANALYSE SÉCURISÉE DES FICHIERS INUTILISÉS\n');

    this.findAllFiles();
    this.identifyShadcnComponents();
    this.findEntryPoints();
    this.buildImportMap();
    this.analyzeDependencies();

    const unusedFiles = this.findReallyUnusedFiles();

    console.log("\n📊 RÉSULTATS DE L'ANALYSE:");
    console.log('============================');

    if (unusedFiles.length === 0) {
      console.log('✨ Aucun fichier inutilisé détecté!');
      return;
    }

    // Grouper par niveau de risque
    const byRisk = {
      safe: [],
      low: [],
      medium: [],
      high: [],
    };

    let totalSize = 0;
    unusedFiles.forEach((file) => {
      totalSize += file.size;
      byRisk[file.risk].push(file);
    });

    console.log(
      `🗑️  ${unusedFiles.length} fichiers potentiellement inutilisés (${this.formatSize(totalSize)})\n`
    );

    // Affichage par niveau de risque
    Object.entries(byRisk).forEach(([risk, files]) => {
      if (files.length === 0) return;

      const riskEmoji = {
        safe: '✅',
        low: '🟡',
        medium: '🟠',
        high: '🔴',
      };

      const riskText = {
        safe: 'SÛRS À SUPPRIMER',
        low: 'RISQUE FAIBLE',
        medium: 'RISQUE MOYEN',
        high: 'RISQUE ÉLEVÉ - NE PAS SUPPRIMER',
      };

      console.log(
        `\n${riskEmoji[risk]} ${riskText[risk]} (${files.length} fichiers):`
      );

      const categoryGroups = {};
      files.forEach((file) => {
        if (!categoryGroups[file.category]) {
          categoryGroups[file.category] = [];
        }
        categoryGroups[file.category].push(file);
      });

      Object.entries(categoryGroups).forEach(([category, categoryFiles]) => {
        console.log(`   📁 ${category.toUpperCase()}:`);
        categoryFiles.forEach((file) => {
          console.log(`      ${file.relative} (${this.formatSize(file.size)})`);
        });
      });
    });

    // Recommandations spécifiques
    console.log('\n🎯 RECOMMANDATIONS SPÉCIFIQUES:');
    console.log('===============================');

    if (byRisk.safe.length > 0) {
      console.log(
        `✅ ${byRisk.safe.length} fichiers SÛRS à supprimer immédiatement`
      );
      console.log('   Ces fichiers sont vides ou clairement inutilisés');
    }

    if (byRisk.low.length > 0) {
      console.log(`🟡 ${byRisk.low.length} fichiers à RISQUE FAIBLE`);
      console.log('   Vérifiez manuellement avant suppression');
    }

    if (byRisk.medium.length > 0) {
      console.log(`🟠 ${byRisk.medium.length} fichiers à RISQUE MOYEN`);
      console.log(
        '   Peuvent être référencés dynamiquement - vérification approfondie requise'
      );
    }

    if (byRisk.high.length > 0) {
      console.log(`🔴 ${byRisk.high.length} fichiers à RISQUE ÉLEVÉ`);
      console.log(
        '   ⚠️  COMPOSANTS SHADCN/UI - NE PAS SUPPRIMER SANS VÉRIFICATION MANUELLE'
      );
      console.log(
        "   Ces composants peuvent être utilisés par d'autres composants shadcn"
      );
    }

    // Script de suppression pour les fichiers sûrs
    if (byRisk.safe.length > 0) {
      console.log('\n🧹 SCRIPT DE NETTOYAGE AUTOMATIQUE:');
      console.log('====================================');
      console.log('Pour supprimer uniquement les fichiers SÛRS:');
      console.log('');

      const safeFiles = byRisk.safe.map((f) => `"${f.absolute}"`).join(' ');
      console.log(`rm ${safeFiles}`);
      console.log('');
      console.log('Ou créez un script:');
      console.log('node scripts/clean-safe-files.js');
    }

    console.log('\n⚠️  AVERTISSEMENTS:');
    console.log('===================');
    console.log(
      '- Ne supprimez JAMAIS les composants shadcn/ui sans vérification manuelle'
    );
    console.log('- Testez votre application après chaque suppression');
    console.log('- Commitez vos changements avant le nettoyage');
    console.log('- Les imports dynamiques peuvent ne pas être détectés');
  }
}

// Utilisation
const srcDir = process.argv[2] || './src';
const analyzer = new SafeUnusedFilesCleaner(srcDir);
analyzer.run();
