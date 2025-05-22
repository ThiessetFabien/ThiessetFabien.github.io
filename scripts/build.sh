#!/bin/bash

# Script optimisé pour exécuter le build du projet plus rapidement

# Copier les images de Leaflet seulement si elles n'existent pas déjà
if [ ! -d "public/images/leaflet" ] || [ -z "$(ls -A public/images/leaflet 2>/dev/null)" ]; then
  echo "📦 Copie des images Leaflet..."
  mkdir -p public/images/leaflet
  cp -r node_modules/leaflet/dist/images/* public/images/leaflet/
else
  echo "📦 Images Leaflet déjà présentes, ignorées."
fi

# Définir les options de Node pour augmenter la mémoire disponible 
# et améliorer les performances
export NODE_OPTIONS="--max-old-space-size=4096 --max-http-header-size=16384"

# S'assurer que NODE_ENV est correctement défini
export NODE_ENV=production

# Activer le cache pour les opérations de build
export NEXT_TELEMETRY_DISABLED=1

# Nettoyer uniquement les fichiers non nécessaires pour accélérer la réconstruction
echo "🧹 Nettoyage stratégique du cache..."
find .next -type d -name "cache" -prune -o -type f \( -name "*.hot-update.*" -o -name "*.map" -not -name "react-loadable-manifest.json" \) -delete

# Charger les variables d'environnement (si dotenv-cli est disponible)
if command -v dotenv &> /dev/null; then
  echo "🔧 Chargement des variables d'environnement..."
  start_time=$(date +%s)
  
  echo "🏗️ Compilation avec une configuration optimisée pour la production..."
  dotenv -e .env.production -- bun --bun next build
  
  end_time=$(date +%s)
  elapsed=$(( end_time - start_time ))
  echo "✅ Build terminé en ${elapsed} secondes!"
else
  echo "🔧 Exécution du build sans dotenv..."
  bun --bun next build
fi
