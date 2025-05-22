#!/bin/bash
# Script de correction unifié
# Combine plusieurs scripts de correction en un seul
# Usage: ./fix.sh [options]
#   Options:
#     --lint            - Corrige uniquement les erreurs de linting
#     --format          - Corrige uniquement le formatage
#     --ts              - Corrige uniquement les erreurs TypeScript
#     --react           - Corrige uniquement les problèmes React (keys, contexts)
#     --bun             - Corrige uniquement les problèmes liés à Bun
#     --npm             - Corrige uniquement les problèmes de configuration NPM
#     --all             - Effectue toutes les corrections (par défaut)
#     --help            - Affiche ce message d'aide

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Valeurs par défaut
FIX_LINT=false
FIX_FORMAT=false
FIX_TS=false
FIX_REACT=false
FIX_BUN=false
FIX_NPM=false
FIX_STYLES=false
ALL=true

# Fonction de sauvegarde
backup_files() {
  echo -e "${YELLOW}Création d'une sauvegarde des fichiers...${NC}"
  BACKUP_DIR=".backups/fix-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$BACKUP_DIR"
  cp -r src "$BACKUP_DIR/"
  cp -r app "$BACKUP_DIR/" 2>/dev/null || true
  cp -r components "$BACKUP_DIR/" 2>/dev/null || true
  cp -r pages "$BACKUP_DIR/" 2>/dev/null || true
  cp -r styles "$BACKUP_DIR/" 2>/dev/null || true
  cp -r lib "$BACKUP_DIR/" 2>/dev/null || true
  cp -r hooks "$BACKUP_DIR/" 2>/dev/null || true
  cp -r utils "$BACKUP_DIR/" 2>/dev/null || true
  echo -e "${GREEN}Sauvegarde créée dans $BACKUP_DIR${NC}"
}

# Fonction d'aide
show_help() {
  echo -e "${BLUE}${BOLD}Usage:${NC} ./fix.sh [options]"
  echo -e "${BOLD}Options:${NC}"
  echo -e "  --lint            - Corrige uniquement les erreurs de linting"
  echo -e "  --format          - Corrige uniquement le formatage"
  echo -e "  --ts              - Corrige uniquement les erreurs TypeScript"
  echo -e "  --react           - Corrige uniquement les problèmes React (keys, contexts)"
  echo -e "  --styles          - Centralise les styles et migre les anciennes constantes"
  echo -e "  --bun             - Corrige uniquement les problèmes liés à Bun"
  echo -e "  --npm             - Corrige uniquement les problèmes de configuration NPM"
  echo -e "  --all             - Effectue toutes les corrections (par défaut)"
  echo -e "  --help            - Affiche ce message d'aide"
  exit 0
}

# Analyse des arguments
for arg in "$@"; do
  case $arg in
    --lint)
      FIX_LINT=true
      ALL=false
      ;;
    --format)
      FIX_FORMAT=true
      ALL=false
      ;;
    --ts)
      FIX_TS=true
      ALL=false
      ;;
    --react)
      FIX_REACT=true
      ALL=false
      ;;
    --styles)
      FIX_STYLES=true
      ALL=false
      ;;
    --bun)
      FIX_BUN=true
      ALL=false
      ;;
    --npm)
      FIX_NPM=true
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

# Si aucune option spécifique n'est fournie, effectuer toutes les corrections
if [ "$ALL" = true ]; then
  FIX_LINT=true
  FIX_FORMAT=true
  FIX_TS=true
  FIX_REACT=true
  FIX_BUN=true
  FIX_NPM=true
fi

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                CORRECTION AUTOMATIQUE                      ║
╚════════════════════════════════════════════════════════════╝
${NC}"
echo -e "${YELLOW}Corrections activées:${NC}"
echo -e "  Linting: ${BOLD}$FIX_LINT${NC}"
echo -e "  Formatage: ${BOLD}$FIX_FORMAT${NC}"
echo -e "  TypeScript: ${BOLD}$FIX_TS${NC}"
echo -e "  React: ${BOLD}$FIX_REACT${NC}"
echo -e "  Bun: ${BOLD}$FIX_BUN${NC}"
echo -e "  NPM: ${BOLD}$FIX_NPM${NC}"

# Créer une sauvegarde avant modifications
backup_files

# Corriger le linting si demandé
if [ "$FIX_LINT" = true ]; then
  echo -e "${GREEN}Correction des erreurs de linting...${NC}"
  bun --bun next lint --fix
fi

# Corriger le formatage si demandé
if [ "$FIX_FORMAT" = true ]; then
  echo -e "${GREEN}Correction du formatage...${NC}"
  npx prettier --write --ignore-path .gitignore .
fi

# Corriger les problèmes TypeScript si demandé
if [ "$FIX_TS" = true ]; then
  echo -e "${GREEN}Correction des erreurs TypeScript...${NC}"
  bash ./scripts/fix-typescript.sh
  
  echo -e "${GREEN}Correction des imports...${NC}"
  bash ./scripts/fix-imports.sh
  
  echo -e "${GREEN}Correction des imports relatifs...${NC}"
  bash ./scripts/fix-relative-imports.sh
  
  echo -e "${GREEN}Standardisation des imports de styles...${NC}"
  bash ./scripts/standardize-style-imports.sh
  
  echo -e "${GREEN}Simplification des imports de styles multiples...${NC}"
  bash ./scripts/simplify-style-imports.sh
fi

# Corriger les problèmes React si demandé
if [ "$FIX_REACT" = true ]; then
  echo -e "${GREEN}Correction des problèmes React...${NC}"
  bash ./scripts/fix-react-keys.sh
  bash ./scripts/fix-react-contexts.sh
fi

# Centraliser les styles si demandé
if [ "$FIX_STYLES" = true ]; then
  echo -e "${GREEN}Centralisation des styles...${NC}"
  bash ./scripts/standardize-style-imports.sh
  bash ./scripts/simplify-style-imports.sh
  bash ./scripts/document-styles-centralisation.sh
  bash ./scripts/migrate-styles.sh
fi

# Corriger les problèmes Bun si demandé
if [ "$FIX_BUN" = true ]; then
  echo -e "${GREEN}Correction des problèmes liés à Bun...${NC}"
  bash ./scripts/fix-bun-access.sh
  bash ./scripts/fix-bun-lock.sh
fi

# Corriger les problèmes NPM si demandé
if [ "$FIX_NPM" = true ]; then
  echo -e "${GREEN}Correction des problèmes de configuration NPM...${NC}"
  bash ./scripts/fix-npm-config.sh
fi

echo -e "${GREEN}${BOLD}Corrections terminées!${NC}"
echo -e "${YELLOW}N'oubliez pas de vérifier les changements avant de les valider.${NC}"
