#!/bin/bash
# Script de build unifié
# Remplace plusieurs scripts individuels dans un seul script paramétrable
# Usage: ./build.sh [options]
#   Options:
#     --optimize        - Optimise les images et génère des versions responsives
#     --analyze         - Active l'analyse du bundle
#     --fast            - Utilise les options les plus rapides pour le build
#     --help            - Affiche ce message d'aide

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Valeurs par défaut
OPTIMIZE=false
ANALYZE=false
FAST=false

# Fonction d'aide
show_help() {
  echo -e "${BLUE}${BOLD}Usage:${NC} ./build.sh [options]"
  echo -e "${BOLD}Options:${NC}"
  echo -e "  --optimize        - Optimise les images et génère des versions responsives"
  echo -e "  --analyze         - Active l'analyse du bundle"
  echo -e "  --fast            - Utilise les options les plus rapides pour le build"
  echo -e "  --help            - Affiche ce message d'aide"
  exit 0
}

# Analyse des arguments
for arg in "$@"; do
  case $arg in
    --optimize)
      OPTIMIZE=true
      ;;
    --analyze)
      ANALYZE=true
      ;;
    --fast)
      FAST=true
      ;;
    --help)
      show_help
      ;;
    *)
      echo -e "${RED}Option non reconnue: $arg${NC}"
      show_help
      ;;
  esac
done

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                      BUILD NEXT.JS                         ║
╚════════════════════════════════════════════════════════════╝
${NC}"
echo -e "${YELLOW}Configuration:${NC}"
echo -e "  Optimisation des images: ${BOLD}$OPTIMIZE${NC}"
echo -e "  Analyse du bundle: ${BOLD}$ANALYZE${NC}"
echo -e "  Mode rapide: ${BOLD}$FAST${NC}"

# Préparer le dossier public pour Leaflet
if [ ! -d "public/images/leaflet" ] || [ -z "$(ls -A public/images/leaflet 2>/dev/null)" ]; then
  echo -e "${YELLOW}Copie des images Leaflet...${NC}"
  mkdir -p public/images/leaflet
  cp -r node_modules/leaflet/dist/images/* public/images/leaflet/
else
  echo -e "${YELLOW}Images Leaflet déjà présentes, ignorées.${NC}"
fi

# Optimiser les images si demandé
if [ "$OPTIMIZE" = true ]; then
  echo -e "${YELLOW}Optimisation des images...${NC}"
  bun run scripts/optimize-images.js
  echo -e "${YELLOW}Génération des images responsives...${NC}"
  bun run scripts/generate-responsive-images.js
fi

# Définir les options de build
BUILD_OPTS="NODE_ENV=production dotenv -e .env.production -- "

if [ "$FAST" = true ]; then
  echo -e "${GREEN}Build en mode rapide${NC}"
  export NODE_OPTIONS="--max-old-space-size=4096 --turbo"
  BUILD_CMD="bun --bun next build"
else
  echo -e "${GREEN}Build en mode standard${NC}"
  BUILD_CMD="NODE_OPTIONS=--max-old-space-size=4096 bun --bun next build"
fi

# Ajouter l'analyse si demandée
if [ "$ANALYZE" = true ]; then
  export ANALYZE=true
  echo -e "${YELLOW}Analyse du bundle activée${NC}"
fi

# Construire et exécuter la commande finale
FINAL_COMMAND="$BUILD_OPTS $BUILD_CMD"
echo -e "${GREEN}Exécution de: ${BOLD}$FINAL_COMMAND${NC}"
eval "$FINAL_COMMAND"
