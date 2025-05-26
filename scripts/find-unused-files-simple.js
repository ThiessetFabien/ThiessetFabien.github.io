#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

class SimpleUnusedFilesFinder {
  constructor(srcDir) {
    this.srcDir = path.resolve(srcDir);
    this.allFiles = [];
    this.referencedFiles = new Set();
    this.entryPoints = [];
  }

  // Trouve tous les fichiers récursivement
  findAllFilesRecursive(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Ignore les dossiers node_modules, .next, etc.
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

  // Trouve tous les fichiers TypeScript/JavaScript
  findAllFiles() {
    this.allFiles = this.findAllFilesRecursive(this.srcDir);
    console.log(`📁 Trouvé ${this.allFiles.length} fichiers au total`);
  }

  // Identifie les points d'entrée
  findEntryPoints() {
    this.entryPoints = this.allFiles.filter((file) => {
      const relativePath = path.relative(this.srcDir, file);
      return (
        relativePath.includes('app/page.') ||
        relativePath.includes('app/layout.') ||
        (relativePath.includes('app/') && relativePath.includes('/page.')) ||
        (relativePath.includes('app/') && relativePath.includes('/layout.')) ||
        (relativePath.includes('app/api/') &&
          relativePath.includes('/route.')) ||
        relativePath.includes('pages/') ||
        relativePath === 'middleware.ts' ||
        relativePath === 'middleware.tsx' ||
        relativePath.includes('app/not-found.') ||
        relativePath.includes('app/loading.') ||
        relativePath.includes('app/error.')
      );
    });

    this.entryPoints.forEach((file) => this.referencedFiles.add(file));
    console.log(`🚪 Trouvé ${this.entryPoints.length} points d'entrée`);
  }

  // Parse les imports dans un fichier
  parseImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = [];

      // Regex simples pour les imports
      const importPatterns = [
        /import\s+.*?\s+from\s+['"`](.+?)['"`]/g,
        /import\s*\(\s*['"`](.+?)['"`]\s*\)/g,
        /require\s*\(\s*['"`](.+?)['"`]\s*\)/g,
        /import\s+['"`](.+?)['"`]/g,
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
      return [];
    }
  }

  // Vérifie si un import est local
  isLocalImport(importPath) {
    return (
      importPath.startsWith('.') ||
      importPath.startsWith('@') ||
      importPath.startsWith('/') ||
      importPath.startsWith('src/')
    );
  }

  // Résout le chemin d'import
  resolveImportPath(importPath, fromFile) {
    const fromDir = path.dirname(fromFile);
    let resolvedPath;

    // Gestion des alias
    if (importPath.startsWith('@')) {
      resolvedPath = path.resolve(this.srcDir, importPath.substring(1));
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

  // Analyse récursive des dépendances
  analyzeDependencies() {
    const toAnalyze = [...this.entryPoints];
    const analyzed = new Set();

    console.log('🔍 Analyse des dépendances...');

    while (toAnalyze.length > 0) {
      const currentFile = toAnalyze.pop();

      if (analyzed.has(currentFile)) {
        continue;
      }

      analyzed.add(currentFile);
      const imports = this.parseImports(currentFile);

      imports.forEach((importedFile) => {
        this.referencedFiles.add(importedFile);
        if (!analyzed.has(importedFile)) {
          toAnalyze.push(importedFile);
        }
      });
    }

    console.log(`✅ ${this.referencedFiles.size} fichiers référencés trouvés`);
  }

  // Trouve les fichiers inutilisés
  findUnusedFiles() {
    const unusedFiles = [];

    this.allFiles.forEach((file) => {
      if (!this.referencedFiles.has(file)) {
        const relativePath = path.relative(this.srcDir, file);
        const stats = fs.statSync(file);
        unusedFiles.push({
          absolute: file,
          relative: relativePath,
          size: stats.size,
        });
      }
    });

    return unusedFiles.sort((a, b) => a.relative.localeCompare(b.relative));
  }

  // Formate la taille
  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Exécute l'analyse complète
  run() {
    console.log('🚀 Recherche des fichiers inutilisés...\n');

    this.findAllFiles();
    this.findEntryPoints();
    this.analyzeDependencies();

    const unusedFiles = this.findUnusedFiles();

    console.log('\n📊 RÉSULTATS:');
    console.log('================');

    if (unusedFiles.length === 0) {
      console.log('✨ Aucun fichier inutilisé trouvé!');
      return;
    }

    console.log(
      `🗑️  ${unusedFiles.length} fichiers potentiellement inutilisés:\n`
    );

    let totalSize = 0;
    const categories = {
      components: [],
      utils: [],
      hooks: [],
      types: [],
      styles: [],
      config: [],
      lib: [],
      other: [],
    };

    unusedFiles.forEach((file) => {
      totalSize += file.size;

      if (file.relative.includes('/components/')) {
        categories.components.push(file);
      } else if (file.relative.includes('/utils/')) {
        categories.utils.push(file);
      } else if (file.relative.includes('/hooks/')) {
        categories.hooks.push(file);
      } else if (file.relative.includes('/types/')) {
        categories.types.push(file);
      } else if (file.relative.includes('/styles/')) {
        categories.styles.push(file);
      } else if (file.relative.includes('/config/')) {
        categories.config.push(file);
      } else if (file.relative.includes('/lib/')) {
        categories.lib.push(file);
      } else {
        categories.other.push(file);
      }
    });

    // Affiche par catégorie
    Object.entries(categories).forEach(([category, files]) => {
      if (files.length > 0) {
        console.log(
          `\n📁 ${category.toUpperCase()} (${files.length} fichiers):`
        );
        files.forEach((file) => {
          console.log(`   ❌ ${file.relative} (${this.formatSize(file.size)})`);
        });
      }
    });

    console.log(`\n💾 Taille totale: ${this.formatSize(totalSize)}`);

    console.log('\n⚠️  ATTENTION:');
    console.log('- Vérifiez manuellement avant suppression');
    console.log('- Certains fichiers peuvent être référencés dynamiquement');
    console.log('- Les fichiers de configuration peuvent être nécessaires');

    // Suggestions de nettoyage
    console.log('\n🧹 SUGGESTIONS DE NETTOYAGE:');

    if (categories.styles.length > 0) {
      console.log('📄 Styles: Vérifiez si ces styles sont vraiment inutilisés');
    }
    if (categories.utils.length > 0) {
      console.log(
        '🔧 Utils: Ces utilitaires peuvent être supprimés en toute sécurité'
      );
    }
    if (categories.types.length > 0) {
      console.log('📝 Types: Vérifiez les définitions TypeScript inutilisées');
    }
    if (categories.components.length > 0) {
      console.log(
        '🧩 Components: Attention aux composants référencés dynamiquement'
      );
    }
  }
}

// Utilisation
const srcDir = process.argv[2] || './src';
const finder = new SimpleUnusedFilesFinder(srcDir);
finder.run();
