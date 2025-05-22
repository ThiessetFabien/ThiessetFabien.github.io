#!/bin/bash

# Script pour développement stable avec Next.js
# Ce script utilise uniquement les options compatibles et stables

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             DÉVELOPPEMENT NEXT.JS STABLE                   ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Vérifier si Bun est installé
if ! command -v bun &> /dev/null; then
  echo -e "${RED}${BOLD}Erreur : Bun n'est pas installé ou n'est pas dans votre PATH${NC}"
  echo -e "${YELLOW}Vous pouvez installer Bun avec la commande suivante :${NC}"
  echo -e "  curl -fsSL https://bun.sh/install | bash"
  echo -e "${YELLOW}Ou utilisez NPM/PNPM comme alternative :${NC}"
  echo -e "  ${GREEN}npm run dev${NC} ou ${GREEN}pnpm dev${NC}"
  
  # Détection du gestionnaire de paquets disponible
  if command -v npm &> /dev/null; then
    echo -e "${BLUE}NPM est disponible. Voulez-vous exécuter 'npm run dev' à la place ? (o/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
      npm run dev
      exit 0
    fi
  elif command -v pnpm &> /dev/null; then
    echo -e "${BLUE}PNPM est disponible. Voulez-vous exécuter 'pnpm dev' à la place ? (o/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
      pnpm dev
      exit 0
    fi
  fi
  
  exit 1
fi

# Définir les variables selon l'environnement
if [ "$1" = "prod" ]; then
  echo -e "${YELLOW}Utilisation de l'environnement de production en mode développement${NC}"
  ENV_FILE=".env.production"
  ENV_VALUE="development"
else
  echo -e "${YELLOW}Utilisation de l'environnement de développement${NC}"
  ENV_FILE=".env.development"
  ENV_VALUE="development"
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

# Définir les variables d'environnement sans options expérimentales
export NODE_ENV=$ENV_VALUE
export NODE_OPTIONS="--max-old-space-size=4096"
export NEXT_TELEMETRY_DISABLED=1

# Nettoyer le cache si demandé
if [ "$2" = "clean" ]; then
  echo -e "${BLUE}Nettoyage des caches...${NC}"
  if [ -d ".next/cache" ]; then
    rm -rf .next/cache/webpack
    rm -rf .next/cache/swc
    mkdir -p .next/cache/webpack
  fi
  
  # Régénérer les types Next.js
  echo -e "${BLUE}Régénération des types Next.js...${NC}"
  if [ -d ".next/types" ]; then
    rm -rf .next/types
  fi
  mkdir -p .next/types
  touch .next/types/cache-life.d.ts
  echo "// Fichier de type généré automatiquement
export {};" > .next/types/cache-life.d.ts
fi

# Démarrer Next.js en mode développement sans options expérimentales
echo -e "${GREEN}Démarrage du serveur Next.js en mode stable...${NC}"
echo -e "${YELLOW}Ce mode utilise uniquement des fonctionnalités stables et compatibles.${NC}"

# Vérifier si la commande dotenv est disponible dans le PATH
if command -v dotenv &> /dev/null; then
  # Utiliser dotenv directement
  dotenv -e $ENV_FILE -- bun --bun next dev
elif [ -f "node_modules/.bin/dotenv" ]; then
  # Utiliser la version locale installée
  ./node_modules/.bin/dotenv -e $ENV_FILE -- bun --bun next dev
else
  # Solution de repli : utiliser npx
  npx dotenv-cli -e $ENV_FILE -- bun --bun next dev
fi
