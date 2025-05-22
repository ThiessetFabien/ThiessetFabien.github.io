#!/bin/bash

# Script universel pour le développement qui s'adapte au gestionnaire de paquets disponible
# Supporte Bun, PNPM, NPM et Yarn

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             DÉVELOPPEMENT UNIVERSEL NEXT.JS                ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Fonction pour préparer l'environnement
prepare_env() {
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

  # Copier les images de Leaflet si besoin
  if [ ! -d "public/images/leaflet" ] || [ -z "$(ls -A public/images/leaflet 2>/dev/null)" ]; then
    echo -e "${BLUE}Copie des images Leaflet...${NC}"
    mkdir -p public/images/leaflet
    cp -r node_modules/leaflet/dist/images/* public/images/leaflet/
  fi

  # Préparer les types TypeScript
  if [ ! -d ".next/types" ]; then
    echo -e "${BLUE}Création du dossier .next/types...${NC}"
    mkdir -p .next/types
    touch .next/types/cache-life.d.ts
    echo "// Fichier de type généré automatiquement
export {};" > .next/types/cache-life.d.ts
  fi

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

  # Définir les variables d'environnement sans options expérimentales
  export NODE_ENV=$ENV_VALUE
  export NODE_OPTIONS="--max-old-space-size=4096"
  export NEXT_TELEMETRY_DISABLED=1
}

# Détecter et utiliser le gestionnaire de paquets disponible
detect_package_manager() {
  # Vérifier différentes possibilités d'installation de Bun
  BUN_DETECTED=false
  BUN_PATH=""
  
  # 1. Vérifier dans le PATH standard
  if command -v bun &> /dev/null; then
    BUN_DETECTED=true
    BUN_PATH=$(which bun)
    echo -e "${GREEN}Bun détecté dans le PATH système : ${BUN_PATH}${NC}"
  # 2. Vérifier l'installation globale via npm
  elif [ -f "$HOME/.npm-global/bin/bun" ]; then
    BUN_DETECTED=true
    BUN_PATH="$HOME/.npm-global/bin/bun"
    echo -e "${GREEN}Bun détecté dans l'installation globale npm : ${BUN_PATH}${NC}"
  # 3. Vérifier l'installation automatique par curl
  elif [ -f "$HOME/.bun/bin/bun" ]; then
    BUN_DETECTED=true
    BUN_PATH="$HOME/.bun/bin/bun"
    echo -e "${GREEN}Bun détecté dans l'installation standard ~/.bun : ${BUN_PATH}${NC}"
  # 4. Vérifier dans /usr/local/bin
  elif [ -f "/usr/local/bin/bun" ]; then
    BUN_DETECTED=true
    BUN_PATH="/usr/local/bin/bun"
    echo -e "${GREEN}Bun détecté dans /usr/local/bin : ${BUN_PATH}${NC}"
  fi
  
  # Si Bun est détecté, l'utiliser
  if [ "$BUN_DETECTED" = true ]; then
    echo -e "${GREEN}Utilisation de Bun comme gestionnaire de paquets${NC}"
    PM="bun"
    RUN_CMD="$BUN_PATH run"
    prepare_env "$1" "$2"
    
    # Gérer le cas où dotenv est disponible
    DOTENV_CMD=""
    if command -v dotenv &> /dev/null; then
      DOTENV_CMD="dotenv -e $ENV_FILE --"
    elif [ -f "node_modules/.bin/dotenv" ]; then
      DOTENV_CMD="./node_modules/.bin/dotenv -e $ENV_FILE --"
    else
      DOTENV_CMD="npx dotenv-cli -e $ENV_FILE --"
    fi
    
    # Exécuter avec le chemin explicite vers Bun
    $DOTENV_CMD $BUN_PATH --bun next dev
  elif command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}Bun non détecté, utilisation de PNPM comme alternative${NC}"
    PM="pnpm"
    RUN_CMD="pnpm"
    if [ "$ENV_FILE" = ".env.production" ]; then
      prepare_env "$1" "$2"
      NODE_ENV=$ENV_VALUE NODE_OPTIONS="--max-old-space-size=4096" pnpm next dev
    else
      prepare_env "$1" "$2"
      NODE_ENV=$ENV_VALUE NODE_OPTIONS="--max-old-space-size=4096" pnpm next dev
    fi
  elif command -v npm &> /dev/null; then
    echo -e "${YELLOW}Bun et PNPM non détectés, utilisation de NPM comme alternative${NC}"
    PM="npm"
    RUN_CMD="npm run"
    if [ "$ENV_FILE" = ".env.production" ]; then
      prepare_env "$1" "$2"
      NODE_ENV=$ENV_VALUE NODE_OPTIONS="--max-old-space-size=4096" npm run next dev
    else
      prepare_env "$1" "$2"
      NODE_ENV=$ENV_VALUE NODE_OPTIONS="--max-old-space-size=4096" npm run next dev
    fi
  elif command -v yarn &> /dev/null; then
    echo -e "${YELLOW}Bun, PNPM et NPM non détectés, utilisation de Yarn comme alternative${NC}"
    PM="yarn"
    RUN_CMD="yarn"
    if [ "$ENV_FILE" = ".env.production" ]; then
      prepare_env "$1" "$2"
      NODE_ENV=$ENV_VALUE NODE_OPTIONS="--max-old-space-size=4096" yarn next dev
    else
      prepare_env "$1" "$2"
      NODE_ENV=$ENV_VALUE NODE_OPTIONS="--max-old-space-size=4096" yarn next dev
    fi
  else
    echo -e "${RED}${BOLD}Erreur : Aucun gestionnaire de paquets (Bun, PNPM, NPM, Yarn) n'est disponible${NC}"
    echo -e "${YELLOW}Veuillez installer l'un des gestionnaires de paquets suivants :${NC}"
    echo -e "  ${BLUE}Bun :${NC} curl -fsSL https://bun.sh/install | bash"
    echo -e "  ${BLUE}PNPM :${NC} curl -fsSL https://get.pnpm.io/install.sh | sh -"
    echo -e "  ${BLUE}NPM :${NC} installer Node.js depuis https://nodejs.org"
    echo -e "  ${BLUE}Yarn :${NC} npm install -g yarn"
    exit 1
  fi
}

# Point d'entrée du script
detect_package_manager "$1" "$2"
