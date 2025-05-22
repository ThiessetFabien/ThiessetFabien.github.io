#!/bin/bash

# Script pour lancer Next.js en mode standard sans Turbopack
# Utilisez ce script si Turbopack pose problème

echo "🚀 Démarrage de Next.js en mode standard (sans Turbo)..."

# Définir le dossier de travail
cd "$(dirname "$0")/.." || exit 1

# Charger les variables d'environnement
if [ -f .env.development ]; then
  set -o allexport
  source .env.development
  set +o allexport
fi

# Copier les images Leaflet
mkdir -p public/images/leaflet
cp -r node_modules/leaflet/dist/images/* public/images/leaflet/

# Exécuter Next.js sans Turbopack
bun --bun next dev
