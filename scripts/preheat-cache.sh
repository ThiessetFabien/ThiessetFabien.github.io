#!/bin/bash

# Script de préchauffage du cache pour améliorer les performances de la première compilation
echo "🔄 Préchauffage du cache de compilation..."

# Créer le dossier .next s'il n'existe pas
mkdir -p .next

# Créer le dossier de cache pour SWC et TypeScript si inexistant
mkdir -p .next/cache/{swc,tsbuildinfo}

# Générer les dossiers de cache d'images
mkdir -p .cache/images

# Précompiler certains fichiers TypeScript essentiels en utilisant esbuild au lieu de SWC
echo "⚙️ Compilation préalable des fichiers TypeScript essentiels..."
FICHIERS_CRITIQUES=(
  "src/lib/utils.tsx"
  "src/styles/font.style.ts"
  "src/styles/border.style.ts"
  "src/styles/boxModel.style.ts"
  "src/styles/flex.style.ts"
  "src/styles/mediaQueries.style.ts"
  "src/utils/formatText.util.ts"
)

# Utiliser esbuild pour précompiler ces fichiers
if command -v bun &> /dev/null; then
  for fichier in "${FICHIERS_CRITIQUES[@]}"; do
    if [ -f "$fichier" ]; then
      echo "   🔥 Précompilation de $fichier"
      bun x esbuild "$fichier" --outdir=.next/cache/swc/ --format=esm --target=es2020 --minify-whitespace || echo "   ⚠️ Échec de précompilation de $fichier, continuons..."
    fi
  done
else
  echo "⚠️ Bun n'est pas disponible. Certaines optimisations ne seront pas appliquées."
fi

# Créer un manifeste de cache simulé pour Next.js
echo "{\"version\":1}" > .next/cache/cache-manifest.json

# Copier certains fichiers fréquemment utilisés dans le cache
echo "📦 Préparation du cache de modules..."
if [ -d "node_modules/next" ]; then
  mkdir -p .next/cache/next-client-pages-loader
  mkdir -p .next/cache/next-babel-loader
  touch .next/cache/next-babel-loader/index.json
fi

echo "✅ Préchauffage du cache terminé. La première compilation devrait être plus rapide."
