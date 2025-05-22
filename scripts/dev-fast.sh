#!/bin/bash

# Script de développement optimisé pour réduire le temps de démarrage

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

# Vérifier l'existence du répertoire .next
if [ -d ".next" ]; then
  echo "🔍 Répertoire .next trouvé, utilisation du cache existant"
else
  echo "🔍 Création du répertoire .next"
  mkdir -p .next/cache
fi

# Démarrer le serveur de développement avec des flags de performance
echo "🚀 Démarrage du serveur de développement optimisé..."

# Définir l'environnement selon le paramètre
ENV_FILE=".env.development"
if [ "$1" = "prod" ]; then
  ENV_FILE=".env.production"
  export NODE_ENV=development
  echo "🌐 Utilisation de l'environnement de production en mode développement"
else
  export NODE_ENV=development
  echo "🌐 Utilisation de l'environnement de développement"
fi

# Exécuter Next.js avec Bun et un cache plus efficace
echo "⚡ Utilisation de Bun pour des performances optimales"

# Ignorer les erreurs de socket Bitwarden et d'autres fichiers
export NEXT_IGNORE_WATCHIGNORE=false

# Désactiver la télémétrie
export NEXT_TELEMETRY_DISABLED=1

# Ignorer les erreurs de type pour accélérer le développement 
export NEXT_IGNORE_TYPECHECK_ERRORS=true

# Nettoyer les erreurs précédentes
rm -f .next/error.log 2>/dev/null

# Supprimer le cache TypeScript si le paramètre clean est spécifié
if [ "$2" = "clean" ]; then
  echo "🧹 Nettoyage du cache TypeScript..."
  rm -f tsconfig.tsbuildinfo
  rm -rf .next/cache/typescript
fi

# Vérifier si la commande dotenv est disponible dans le PATH
if command -v dotenv &> /dev/null; then
  # Utiliser dotenv directement
  BUN_RUNTIME_ARGS="--smol --hot" dotenv -e $ENV_FILE -- bun --bun next dev
elif [ -f "node_modules/.bin/dotenv" ]; then
  # Utiliser la version locale installée
  BUN_RUNTIME_ARGS="--smol --hot" ./node_modules/.bin/dotenv -e $ENV_FILE -- bun --bun next dev
else
  # Solution de repli : utiliser npx
  BUN_RUNTIME_ARGS="--smol --hot" npx dotenv-cli -e $ENV_FILE -- bun --bun next dev
fi
