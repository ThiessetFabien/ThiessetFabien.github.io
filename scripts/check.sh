#!/bin/bash
# Script de vérification unifié
# Combine plusieurs scripts de vérification en un seul
# Usage: ./check.sh [options]
#   Options:
#     --health          - Vérifie uniquement la santé du projet
#     --code            - Vérifie uniquement la qualité du code
#     --perf            - Vérifie uniquement les performances
#     --config          - Vérifie uniquement la configuration Next.js
#     --lint            - Vérifie uniquement les erreurs de linting
#     --all             - Effectue toutes les vérifications (par défaut)
#     --help            - Affiche ce message d'aide

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Valeurs par défaut
CHECK_HEALTH=false
CHECK_CODE=false
CHECK_PERF=false
CHECK_CONFIG=false
CHECK_LINT=false
ALL=true

# Fonction d'aide
show_help() {
  echo -e "${BLUE}${BOLD}Usage:${NC} ./check.sh [options]"
  echo -e "${BOLD}Options:${NC}"
  echo -e "  --health          - Vérifie uniquement la santé du projet"
  echo -e "  --code            - Vérifie uniquement la qualité du code"
  echo -e "  --perf            - Vérifie uniquement les performances"
  echo -e "  --config          - Vérifie uniquement la configuration Next.js"
  echo -e "  --lint            - Vérifie uniquement les erreurs de linting"
  echo -e "  --all             - Effectue toutes les vérifications (par défaut)"
  echo -e "  --help            - Affiche ce message d'aide"
  exit 0
}

# Analyse des arguments
for arg in "$@"; do
  case $arg in
    --health)
      CHECK_HEALTH=true
      ALL=false
      ;;
    --code)
      CHECK_CODE=true
      ALL=false
      ;;
    --perf)
      CHECK_PERF=true
      ALL=false
      ;;
    --config)
      CHECK_CONFIG=true
      ALL=false
      ;;
    --lint)
      CHECK_LINT=true
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

# Si aucune option spécifique n'est fournie, effectuer toutes les vérifications
if [ "$ALL" = true ]; then
  CHECK_HEALTH=true
  CHECK_CODE=true
  CHECK_PERF=true
  CHECK_CONFIG=true
  CHECK_LINT=true
fi

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                VÉRIFICATION DU PROJET                      ║
╚════════════════════════════════════════════════════════════╝
${NC}"
echo -e "${YELLOW}Vérifications activées:${NC}"
echo -e "  Santé du projet: ${BOLD}$CHECK_HEALTH${NC}"
echo -e "  Qualité du code: ${BOLD}$CHECK_CODE${NC}"
echo -e "  Performances: ${BOLD}$CHECK_PERF${NC}"
echo -e "  Configuration Next.js: ${BOLD}$CHECK_CONFIG${NC}"
echo -e "  Erreurs de linting: ${BOLD}$CHECK_LINT${NC}"

# Vérifier la santé du projet si demandé
if [ "$CHECK_HEALTH" = true ]; then
  echo -e "${GREEN}Vérification de la santé du projet...${NC}"
  bash ./scripts/check-health.sh
fi

# Vérifier la qualité du code si demandé
if [ "$CHECK_CODE" = true ]; then
  echo -e "${GREEN}Vérification de la qualité du code...${NC}"
  bash ./scripts/check-code-quality.sh
fi

# Vérifier les performances si demandé
if [ "$CHECK_PERF" = true ]; then
  echo -e "${GREEN}Vérification des performances...${NC}"
  bash ./scripts/analyze-performance.sh
fi

# Vérifier la configuration Next.js si demandé
if [ "$CHECK_CONFIG" = true ]; then
  echo -e "${GREEN}Vérification de la configuration Next.js...${NC}"
  bash ./scripts/validate-next-config.sh
fi

# Vérifier les erreurs de linting si demandé
if [ "$CHECK_LINT" = true ]; then
  echo -e "${GREEN}Vérification des erreurs de linting...${NC}"
  bash ./scripts/check-lint-errors.sh
fi

echo -e "${GREEN}${BOLD}Vérifications terminées!${NC}"
