#!/bin/bash
# Script de développement unifié
# Remplace plusieurs scripts individuels dans un seul script paramétrable
# Usage: ./dev.sh [options]
#   Options:
#     --env=dev|prod    - Définit l'environnement (dev par défaut)
#     --runtime=bun|node - Définit le runtime JavaScript (bun par défaut)
#     --mode=normal|fast|turbo|optimized - Mode de démarrage (normal par défaut)
#     --clean           - Nettoie le cache avant de démarrer
#     --analyze         - Active l'analyse du bundle
#     --help            - Affiche ce message d'aide

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Valeurs par défaut
ENV="dev"
RUNTIME="bun"
MODE="normal"
CLEAN=false
ANALYZE=false

# Fonction d'aide
show_help() {
  echo -e "${BLUE}${BOLD}Usage:${NC} ./dev.sh [options]"
  echo -e "${BOLD}Options:${NC}"
  echo -e "  --env=dev|prod    - Définit l'environnement (dev par défaut)"
  echo -e "  --runtime=bun|node - Définit le runtime JavaScript (bun par défaut)"
  echo -e "  --mode=normal|fast|turbo|optimized - Mode de démarrage (normal par défaut)"
  echo -e "  --clean           - Nettoie le cache avant de démarrer"
  echo -e "  --analyze         - Active l'analyse du bundle"
  echo -e "  --help            - Affiche ce message d'aide"
  exit 0
}

# Analyse des arguments
for arg in "$@"; do
  case $arg in
    --env=*)
      ENV="${arg#*=}"
      ;;
    --runtime=*)
      RUNTIME="${arg#*=}"
      ;;
    --mode=*)
      MODE="${arg#*=}"
      ;;
    --clean)
      CLEAN=true
      ;;
    --analyze)
      ANALYZE=true
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
║                 DÉVELOPPEMENT NEXT.JS                      ║
╚════════════════════════════════════════════════════════════╝
${NC}"
echo -e "${YELLOW}Configuration:${NC}"
echo -e "  Environnement: ${BOLD}$ENV${NC}"
echo -e "  Runtime: ${BOLD}$RUNTIME${NC}"
echo -e "  Mode: ${BOLD}$MODE${NC}"
echo -e "  Nettoyage préalable: ${BOLD}$CLEAN${NC}"
echo -e "  Analyse du bundle: ${BOLD}$ANALYZE${NC}"

# Définir le fichier d'environnement
if [ "$ENV" = "prod" ]; then
  ENV_FILE=".env.production"
  ENV_VALUE="development" # Pour mode dev avec vars prod
else
  ENV_FILE=".env.development"
  ENV_VALUE="development"
fi

# Nettoyer le cache si demandé
if [ "$CLEAN" = true ]; then
  echo -e "${YELLOW}Nettoyage du cache...${NC}"
  rm -rf .next
  mkdir -p .next/cache
fi

# Préparer le dossier public pour Leaflet
if [ ! -d "public/images/leaflet" ] || [ -z "$(ls -A public/images/leaflet 2>/dev/null)" ]; then
  echo -e "${YELLOW}Copie des images Leaflet...${NC}"
  mkdir -p public/images/leaflet
  cp -r node_modules/leaflet/dist/images/* public/images/leaflet/
else
  echo -e "${YELLOW}Images Leaflet déjà présentes, ignorées.${NC}"
fi

# Préparer la commande selon le mode
COMMAND_PREFIX="NODE_ENV=$ENV_VALUE dotenv -e $ENV_FILE -- "

if [ "$RUNTIME" = "node" ]; then
  CMD_RUNTIME="NODE_OPTIONS=--max-old-space-size=4096"
else
  CMD_RUNTIME="bun --bun"
fi

# Options selon le mode
case $MODE in
  fast)
    echo -e "${GREEN}Démarrage en mode rapide${NC}"
    export NODE_OPTIONS="--max-old-space-size=4096"
    CMD_OPTS="--turbo"
    ;;
  turbo)
    echo -e "${GREEN}Démarrage en mode turbo${NC}"
    CMD_OPTS="--turbo"
    ;;
  optimized)
    echo -e "${GREEN}Démarrage en mode optimisé${NC}"
    bash ./scripts/optimize-cache.sh
    export OPTIMIZE_FIRST_COMPILATION=true
    CMD_OPTS="--turbo"
    ;;
  *)
    echo -e "${GREEN}Démarrage en mode normal${NC}"
    CMD_OPTS=""
    ;;
esac

# Ajouter l'analyse si demandée
if [ "$ANALYZE" = true ]; then
  export ANALYZE=true
  echo -e "${YELLOW}Analyse du bundle activée${NC}"
fi

# Construire et exécuter la commande finale
FINAL_COMMAND="$COMMAND_PREFIX $CMD_RUNTIME next dev $CMD_OPTS"
echo -e "${GREEN}Exécution de: ${BOLD}$FINAL_COMMAND${NC}"
eval "$FINAL_COMMAND"
