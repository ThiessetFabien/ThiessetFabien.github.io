#!/bin/bash
# Script d'optimisation unifié
# Combine plusieurs scripts d'optimisation en un seul
# Usage: ./optimize.sh [options]
#   Options:
#     --cache           - Optimise uniquement le cache
#     --images          - Optimise uniquement les images
#     --responsive      - Génère uniquement les images responsives
#     --all             - Effectue toutes les optimisations (par défaut)
#     --help            - Affiche ce message d'aide

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Valeurs par défaut (tout optimiser par défaut)
OPTIMIZE_CACHE=false
OPTIMIZE_IMAGES=false
GENERATE_RESPONSIVE=false
ALL=true

# Fonction d'aide
show_help() {
  echo -e "${BLUE}${BOLD}Usage:${NC} ./optimize.sh [options]"
  echo -e "${BOLD}Options:${NC}"
  echo -e "  --cache           - Optimise uniquement le cache"
  echo -e "  --images          - Optimise uniquement les images"
  echo -e "  --responsive      - Génère uniquement les images responsives"
  echo -e "  --all             - Effectue toutes les optimisations (par défaut)"
  echo -e "  --help            - Affiche ce message d'aide"
  exit 0
}

# Analyse des arguments
for arg in "$@"; do
  case $arg in
    --cache)
      OPTIMIZE_CACHE=true
      ALL=false
      ;;
    --images)
      OPTIMIZE_IMAGES=true
      ALL=false
      ;;
    --responsive)
      GENERATE_RESPONSIVE=true
      ALL=false
      ;;
    --all)
      ALL=true
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

# Si aucune option spécifique n'est fournie, tout optimiser
if [ "$ALL" = true ]; then
  OPTIMIZE_CACHE=true
  OPTIMIZE_IMAGES=true
  GENERATE_RESPONSIVE=true
fi

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                   OPTIMISATION PROJET                      ║
╚════════════════════════════════════════════════════════════╝
${NC}"
echo -e "${YELLOW}Optimisations activées:${NC}"
echo -e "  Cache: ${BOLD}$OPTIMIZE_CACHE${NC}"
echo -e "  Images: ${BOLD}$OPTIMIZE_IMAGES${NC}"
echo -e "  Images responsives: ${BOLD}$GENERATE_RESPONSIVE${NC}"

# Optimiser le cache si demandé
if [ "$OPTIMIZE_CACHE" = true ]; then
  echo -e "${GREEN}Optimisation du cache...${NC}"
  bash ./scripts/optimize-cache.sh
fi

# Optimiser les images si demandé
if [ "$OPTIMIZE_IMAGES" = true ]; then
  echo -e "${GREEN}Optimisation des images...${NC}"
  bun run scripts/optimize-images.js
fi

# Générer les images responsives si demandé
if [ "$GENERATE_RESPONSIVE" = true ]; then
  echo -e "${GREEN}Génération des images responsives...${NC}"
  bun run scripts/generate-responsive-images.js
fi

echo -e "${GREEN}${BOLD}Optimisations terminées!${NC}"
