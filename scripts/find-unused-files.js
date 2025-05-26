#!/usr/bin/env node

import { readFileSync, existsSync, statSync } from 'fs';
import { resolve, dirname, join, relative as _relative } from 'path';
import { sync } from 'glob';

class UnusedFilesFinder {
  constructor(srcDir) {
    this.srcDir = resolve(srcDir);
    this.allFiles = new Set();
    this.referencedFiles = new Set();
    this.entryPoints = new Set();
  }

  // Trouve tous les fichiers TypeScript/JavaScript
  findAllFiles() {
    const patterns = [
      '**/*.{ts,tsx,js,jsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/build/**',
      '!**/.next/**',
    ];

    patterns.forEach((pattern) => {
      const files = sync(pattern, {
        cwd: this.srcDir,
        absolute: true,
      });
      files.forEach((file) => this.allFiles.add(file));
    });

    console.log(`📁 Trouvé ${this.allFiles.size} fichiers au total`);
  }

  // Identifie les points d'entrée (pages, layouts, API routes)
  findEntryPoints() {
    const entryPatterns = [
      '**/app/page.{ts,tsx,js,jsx}',
      '**/app/layout.{ts,tsx,js,jsx}',
      '**/app/**/page.{ts,tsx,js,jsx}',
      '**/app/**/layout.{ts,tsx,js,jsx}',
      '**/app/api/**/route.{ts,tsx,js,jsx}',
      '**/pages/**/*.{ts,tsx,js,jsx}',
      '**/middleware.{ts,tsx,js,jsx}',
      '**/app/not-found.{ts,tsx,js,jsx}',
      '**/app/loading.{ts,tsx,js,jsx}',
      '**/app/error.{ts,tsx,js,jsx}',
    ];

    entryPatterns.forEach((pattern) => {
      const files = sync(pattern, {
        cwd: this.srcDir,
        absolute: true,
      });
      files.forEach((file) => {
        this.entryPoints.add(file);
        this.referencedFiles.add(file);
      });
    });

    console.log(`🚪 Trouvé ${this.entryPoints.size} points d'entrée`);
  }

  // Parse les imports dans un fichier
  parseImports(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const imports = new Set();

      // Regex pour les imports ES6/CommonJS
      const importRegexes = [
        /import\s+.*?\s+from\s+['"`](.+?)['"`]/g,
        /import\s*\(\s*['"`](.+?)['"`]\s*\)/g,
        /require\s*\(\s*['"`](.+?)['"`]\s*\)/g,
        /import\s+['"`](.+?)['"`]/g,
      ];

      importRegexes.forEach((regex) => {
        let match;
        while ((match = regex.exec(content)) !== null) {
          const importPath = match[1];
          if (this.isLocalImport(importPath)) {
            const resolvedPath = this.resolveImportPath(importPath, filePath);
            if (resolvedPath) {
              imports.add(resolvedPath);
            }
          }
        }
      });

      // Recherche les imports dynamiques Next.js
      const dynamicImportRegex =
        /dynamic\s*\(\s*\(\)\s*=>\s*import\s*\(\s*['"`](.+?)['"`]\s*\)/g;
      let match;
      while ((match = dynamicImportRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (this.isLocalImport(importPath)) {
          const resolvedPath = this.resolveImportPath(importPath, filePath);
          if (resolvedPath) {
            imports.add(resolvedPath);
          }
        }
      }

      return imports;
    } catch (error) {
      console.warn(
        `⚠️  Erreur lors de la lecture de ${filePath}: ${error.message}`
      );
      return new Set();
    }
  }

  // Vérifie si un import est local (pas un module npm)
  isLocalImport(importPath) {
    return (
      importPath.startsWith('.') ||
      importPath.startsWith('@') ||
      importPath.startsWith('/') ||
      importPath.startsWith('src/')
    );
  }

  // Résout le chemin d'import vers un fichier absolu
  resolveImportPath(importPath, fromFile) {
    const fromDir = dirname(fromFile);
    let resolvedPath;

    // Gestion des alias (@ = src)
    if (importPath.startsWith('@')) {
      resolvedPath = resolve(this.srcDir, importPath.substring(1));
    } else if (importPath.startsWith('src/')) {
      resolvedPath = resolve(this.srcDir, '..', importPath);
    } else if (importPath.startsWith('/')) {
      resolvedPath = resolve(this.srcDir, '..', importPath.substring(1));
    } else {
      resolvedPath = resolve(fromDir, importPath);
    }

    // Essaie différentes extensions
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];

    // Si le fichier existe déjà
    if (existsSync(resolvedPath) && statSync(resolvedPath).isFile()) {
      return resolvedPath;
    }

    // Essaie avec les extensions
    for (const ext of extensions) {
      const withExt = resolvedPath + ext;
      if (existsSync(withExt)) {
        return withExt;
      }
    }

    // Essaie index.* dans un dossier
    if (existsSync(resolvedPath) && statSync(resolvedPath).isDirectory()) {
      for (const ext of extensions) {
        const indexFile = join(resolvedPath, 'index' + ext);
        if (existsSync(indexFile)) {
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
        if (this.allFiles.has(importedFile)) {
          this.referencedFiles.add(importedFile);
          if (!analyzed.has(importedFile)) {
            toAnalyze.push(importedFile);
          }
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
        const relativePath = _relative(this.srcDir, file);
        unusedFiles.push({
          absolute: file,
          relative: relativePath,
          size: this.getFileSize(file),
        });
      }
    });

    return unusedFiles.sort((a, b) => a.relative.localeCompare(b.relative));
  }

  // Obtient la taille d'un fichier
  getFileSize(filePath) {
    try {
      const stats = statSync(filePath);
      return stats.size;
    } catch {
      return 0;
    }
  }

  // Formate la taille en octets
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
      other: [],
    };

    unusedFiles.forEach((file) => {
      totalSize += file.size;

      // Catégorise les fichiers
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
          console.log(`   ${file.relative} (${this.formatSize(file.size)})`);
        });
      }
    });

    console.log(
      `\n💾 Taille totale des fichiers inutilisés: ${this.formatSize(totalSize)}`
    );

    console.log('\n⚠️  ATTENTION:');
    console.log('- Vérifiez manuellement avant de supprimer');
    console.log('- Certains fichiers peuvent être référencés dynamiquement');
    console.log('- Les fichiers de configuration peuvent être nécessaires');

    console.log('\n🔧 Pour supprimer ces fichiers, utilisez:');
    console.log('rm ' + unusedFiles.map((f) => `"${f.absolute}"`).join(' '));
  }
}

// Utilisation
const srcDir = process.argv[2] || './src';
const finder = new UnusedFilesFinder(srcDir);
finder.run();
