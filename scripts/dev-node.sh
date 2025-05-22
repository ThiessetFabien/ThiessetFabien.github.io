#!/bin/bash

# Script simplifié pour démarrer Next.js sans dépendre de Bun
# Utilise NPM ou Node.js directement

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║        DÉVELOPPEMENT NEXT.JS SANS BUN (NODE.JS)            ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Préparer l'environnement
ENV_FILE=".env.development"
if [ "$1" = "prod" ]; then
  echo -e "${YELLOW}Utilisation de l'environnement de production en mode développement${NC}"
  ENV_FILE=".env.production"
else
  echo -e "${YELLOW}Utilisation de l'environnement de développement${NC}"
fi

# Copier les images de Leaflet
if [ ! -d "public/images/leaflet" ] || [ -z "$(ls -A public/images/leaflet 2>/dev/null)" ]; then
  echo -e "${BLUE}Copie des images Leaflet...${NC}"
  mkdir -p public/images/leaflet
  cp -r node_modules/leaflet/dist/images/* public/images/leaflet/
fi

# Vérifier et créer le dossier .next/types s'il n'existe pas
if [ ! -d ".next/types" ]; then
  echo -e "${BLUE}Création du dossier .next/types...${NC}"
  mkdir -p .next/types
  touch .next/types/cache-life.d.ts
  echo "// Fichier de type généré automatiquement" > .next/types/cache-life.d.ts
fi

# Nettoyer le cache si demandé
if [ "$2" = "clean" ]; then
  echo -e "${BLUE}Nettoyage des caches...${NC}"
  if [ -d ".next/cache" ]; then
    rm -rf .next/cache/webpack
    rm -rf .next/cache/swc
    mkdir -p .next/cache/webpack
  fi
fi

# Variables d'environnement
export NODE_ENV=development
export NODE_OPTIONS="--max-old-space-size=4096"
export NEXT_TELEMETRY_DISABLED=1

# Démarrer Next.js avec Node directement
echo -e "${GREEN}Démarrage du serveur Next.js avec Node.js...${NC}"

# Vérifier si NPM est disponible et lancer le script approprié
if command -v npm &> /dev/null; then
  if [ "$ENV_FILE" = ".env.production" ]; then
    npm run dev:prod:node
  else
    npm run dev:node
  fi
else
  # Solution de secours : Utiliser Node directement
  echo -e "${YELLOW}NPM non détecté, tentative d'utilisation directe de Node...${NC}"
  if command -v node &> /dev/null; then
    if [ -f "node_modules/.bin/next" ]; then
      if [ "$ENV_FILE" = ".env.production" ]; then
        NODE_ENV=development node node_modules/.bin/next dev
      else
        node node_modules/.bin/next dev
      fi
    else
      echo -e "${RED}Impossible de trouver l'exécutable Next.js.${NC}"
      echo -e "${YELLOW}Veuillez installer les dépendances avec 'npm install' ou 'yarn install'.${NC}"
      exit 1
    fi
  else
    echo -e "${RED}${BOLD}Erreur : Node.js n'est pas installé ou n'est pas dans votre PATH${NC}"
    echo -e "${YELLOW}Veuillez installer Node.js depuis https://nodejs.org${NC}"
    exit 1
  fi
fi
