#!/bin/bash

# Script optimisé pour exécuter Next.js avec Turbopack
# Réécrit pour éviter les problèmes de commande avec zsh

# Définir le dossier de travail
cd "$(dirname "$0")/.." || exit 1

# Charger les variables d'environnement
if [ -f .env.development ]; then
  echo "✅ Chargement des variables d'environnement de développement"
  set -o allexport
  source .env.development
  set +o allexport
fi

# Copier les images Leaflet
echo "🍃 Copie des images Leaflet..."
mkdir -p public/images/leaflet
cp -r node_modules/leaflet/dist/images/* public/images/leaflet/

# Nettoyer le cache avant de démarrer
echo "🧹 Nettoyage du cache Next.js..."
rm -rf .next/cache

# Copier la configuration SWC optimisée pour Turbopack
if [ -f .swcrc.turbo ]; then
  echo "🔄 Utilisation de la configuration SWC optimisée pour Turbopack"
  cp .swcrc.turbo .swcrc.bak.turbo  # Sauvegarde de sécurité
  cp .swcrc .swcrc.original  # Sauvegarde de la configuration originale
  cp .swcrc.turbo .swcrc  # Appliquer la configuration Turbo
fi

# Options Node.js optimisées pour Turbopack
export NODE_OPTIONS="--max-old-space-size=4096 --trace-warnings"

# Exécuter Next.js avec Turbopack
echo "🚀 Démarrage de Next.js avec Turbopack..."
exec bun --bun $(npm bin)/next dev --turbo

# Restaurer la configuration originale à la fin
# Note: Cette partie ne s'exécutera pas à cause du exec ci-dessus
# Pour restaurer manuellement après interruption: mv .swcrc.original .swcrc
