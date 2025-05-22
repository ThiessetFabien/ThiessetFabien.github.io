#!/bin/bash

# Script optimisé pour le développement avec Turbopack

# Définir les variables selon l'environnement
if [ "$1" = "prod" ]; then
  echo "🚀 Démarrage avec Turbopack et environnement de production..."
  ENV_FILE=".env.production"
  ENV_VALUE="development"
else
  echo "🚀 Démarrage avec Turbopack et environnement de développement..."
  ENV_FILE=".env.development"
  ENV_VALUE="development"
fi

# Copier les images de Leaflet seulement si elles n'existent pas déjà
if [ ! -d "public/images/leaflet" ] || [ -z "$(ls -A public/images/leaflet 2>/dev/null)" ]; then
  echo "📦 Copie des images Leaflet..."
  mkdir -p public/images/leaflet
  cp -r node_modules/leaflet/dist/images/* public/images/leaflet/
else
  echo "📦 Images Leaflet déjà présentes, ignorées."
fi

# Définir les options pour améliorer les performances
export NODE_OPTIONS="--max-old-space-size=4096"

# Nettoyer pour éviter les problèmes avec Turbopack
if [ "$2" = "clean" ]; then
  echo "🧹 Nettoyage pour Turbopack..."
  # Supprimer le cache Next.js
  rm -rf .next
  # Supprimer le fichier tsconfig.tsbuildinfo
  rm -f tsconfig.tsbuildinfo
  # Créer le dossier .next/cache pour éviter les erreurs
  mkdir -p .next/cache
fi

# Désactiver temporairement les options expérimentales incompatibles
export NEXT_MINIMAL_CONFIG=1
export NEXT_TELEMETRY_DISABLED=1
export NEXT_IGNORE_TYPECHECK_ERRORS=true

echo "⚡ Démarrage de Turbopack..."

# Vérifier si la commande dotenv est disponible dans le PATH
if command -v dotenv &> /dev/null; then
  # Utiliser dotenv directement
  BUN_RUNTIME_ARGS="--smol" dotenv -e $ENV_FILE -- bun --bun next dev --turbo
elif [ -f "node_modules/.bin/dotenv" ]; then
  # Utiliser la version locale installée
  BUN_RUNTIME_ARGS="--smol" ./node_modules/.bin/dotenv -e $ENV_FILE -- bun --bun next dev --turbo
else
  # Solution de repli : utiliser npx
  BUN_RUNTIME_ARGS="--smol" npx dotenv-cli -e $ENV_FILE -- bun --bun next dev --turbo
fi
