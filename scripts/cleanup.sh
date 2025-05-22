#!/bin/bash
# Script pour nettoyer les fichiers temporaires et les sauvegardes
# Usage: ./cleanup.sh [--help]

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Afficher l'aide
if [[ "$1" == "--help" ]]; then
  echo -e "${BLUE}${BOLD}Nettoyage des fichiers temporaires${NC}"
  echo -e "${YELLOW}Usage: ./cleanup.sh [--help]${NC}"
  echo -e ""
  echo -e "Ce script effectue un nettoyage complet des fichiers temporaires et de sauvegarde :"
  echo -e "  - Fichiers .bak, .backup, .new, .old"
  echo -e "  - Fichiers temporaires .tmp, .temp, .TMP"
  echo -e "  - Fichiers de swap Vim (.swp, .swo)"
  echo -e "  - Fichiers ESLint redondants (.eslintrc*.fixed, etc.)"
  echo -e "  - Fichiers webpack obsolètes"
  echo -e ""
  echo -e "${GREEN}Options :${NC}"
  echo -e "  ${BOLD}--help${NC}    Affiche ce message d'aide"
  exit 0
fi

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             NETTOYAGE DES FICHIERS TEMPORAIRES             ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Compter les fichiers avant nettoyage
TOTAL_FILES=$(find . -type f -name "*.bak" -o -name "*.backup" -o -name "*.new" -o -name "*.old" -o -name "*.tmp" -o -name "*.temp" -o -name "*.TMP" -o -name "*.swp" -o -name "*.swo" | grep -v "node_modules" | grep -v ".git" | wc -l)
echo -e "${YELLOW}${TOTAL_FILES} fichiers temporaires trouvés${NC}"

# Nettoyer les fichiers .bak, .backup, .new
echo -e "${GREEN}Nettoyage des fichiers de sauvegarde...${NC}"
find . -not -path "*/node_modules/*" -not -path "*/.git/*" -type f -name "*.bak" -o -name "*.backup" -o -name "*.new" -o -name "*.old" -exec rm -v {} \;

# Nettoyer les fichiers temporaires
echo -e "${GREEN}Nettoyage des fichiers temporaires...${NC}"
find . -not -path "*/node_modules/*" -not -path "*/.git/*" -type f -name "*.tmp" -o -name "*.temp" -o -name "*.TMP" -exec rm -v {} \;

# Nettoyer les fichiers de swap Vim
echo -e "${GREEN}Nettoyage des fichiers swap Vim...${NC}"
find . -not -path "*/node_modules/*" -not -path "*/.git/*" -type f -name "*.swp" -o -name "*.swo" -exec rm -v {} \;

# Nettoyer les fichiers .eslintrc* inutiles
echo -e "${GREEN}Nettoyage des fichiers ESLint redondants...${NC}"
find . -not -path "*/node_modules/*" -not -path "*/.git/*" -maxdepth 1 -type f -name ".eslintrc*.fixed*" -o -name ".eslintrc*.new*" -o -name ".eslintrc*.backup*" -exec rm -v {} \;

# Nettoyer les fichiers webpack obsolètes
echo -e "${GREEN}Nettoyage des fichiers webpack obsolètes...${NC}"
find ./dist -type f -name "*.old" -exec rm -v {} \; 2>/dev/null || true
find ./.next -type f -name "*.old" -exec rm -v {} \; 2>/dev/null || true

# Compter les fichiers après nettoyage
REMAINING_FILES=$(find . -type f -name "*.bak" -o -name "*.backup" -o -name "*.new" -o -name "*.old" -o -name "*.tmp" -o -name "*.temp" -o -name "*.TMP" -o -name "*.swp" -o -name "*.swo" | grep -v "node_modules" | grep -v ".git" | wc -l)
echo -e "${YELLOW}${REMAINING_FILES} fichiers temporaires restants${NC}"

echo -e "${GREEN}${BOLD}Nettoyage terminé !${NC}"
