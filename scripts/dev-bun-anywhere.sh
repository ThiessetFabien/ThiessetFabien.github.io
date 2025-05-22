#!/bin/zsh

# Script pour démarrer le développement Next.js avec Bun, même s'il est installé globalement via npm
# Ce script est une solution de contournement au problème de PATH de Bun

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║       DÉVELOPPEMENT NEXT.JS AVEC DÉTECTION DE BUN          ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Fonction pour détecter le chemin de Bun dans différents emplacements
find_bun_path() {
  # 1. Vérifier dans le PATH standard
  if command -v bun &> /dev/null; then
    echo "$(which bun)"
    return 0
  # 2. Vérifier l'installation globale via npm
  elif [ -f "$HOME/.npm-global/bin/bun" ]; then
    echo "$HOME/.npm-global/bin/bun"
    return 0
  # 3. Vérifier l'installation automatique par curl
  elif [ -f "$HOME/.bun/bin/bun" ]; then
    echo "$HOME/.bun/bin/bun"
    return 0
  # 4. Vérifier dans /usr/local/bin
  elif [ -f "/usr/local/bin/bun" ]; then
    echo "/usr/local/bin/bun"
    return 0
  # 5. Vérifier dans le lien symbolique local
  elif [ -f "$HOME/.local/bin/bun" ]; then
    echo "$HOME/.local/bin/bun"
    return 0
  else
    return 1
  fi
}

# Récupérer le chemin de Bun
BUN_PATH=$(find_bun_path)
BUN_FOUND=$?

# Si Bun est trouvé, l'utiliser directement sans passer par notre système universel
if [ $BUN_FOUND -eq 0 ]; then
  echo -e "${GREEN}Bun trouvé à : ${BUN_PATH}${NC}"
  
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
  
  # Nettoyer le cache si demandé
  if [ "$2" = "clean" ]; then
    echo -e "${BLUE}Nettoyage des caches...${NC}"
    if [ -d ".next/cache" ]; then
      rm -rf .next/cache/webpack
      rm -rf .next/cache/swc
    fi
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
    echo "// Fichier de type généré automatiquement" > .next/types/cache-life.d.ts
    echo "export {};" >> .next/types/cache-life.d.ts
  fi
  
  # Définir les variables d'environnement
  export NODE_ENV=$ENV_VALUE
  export NODE_OPTIONS="--max-old-space-size=4096"
  export NEXT_TELEMETRY_DISABLED=1
  
  # Exécuter avec dotenv
  if command -v dotenv &> /dev/null; then
    echo -e "${GREEN}Démarrage de Next.js avec Bun et dotenv global...${NC}"
    dotenv -e $ENV_FILE -- $BUN_PATH --bun next dev
  elif [ -f "node_modules/.bin/dotenv" ]; then
    echo -e "${GREEN}Démarrage de Next.js avec Bun et dotenv local...${NC}"
    ./node_modules/.bin/dotenv -e $ENV_FILE -- $BUN_PATH --bun next dev
  else
    echo -e "${GREEN}Démarrage de Next.js avec Bun et npx dotenv...${NC}"
    npx dotenv-cli -e $ENV_FILE -- $BUN_PATH --bun next dev
  fi
else
  # Si Bun n'est pas trouvé, utiliser le script universel qui essaiera avec d'autres gestionnaires
  echo -e "${YELLOW}Bun non trouvé, utilisation du script universel...${NC}"
  ./scripts/dev-universal.sh "$@"
fi
