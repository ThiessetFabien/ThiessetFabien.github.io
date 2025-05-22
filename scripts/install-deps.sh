#!/bin/bash

# Script pour installer les dépendances manquantes du projet

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             INSTALLATION DES DÉPENDANCES MANQUANTES        ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}Ce script vérifie et installe les dépendances manquantes pour le projet${NC}"

# Vérifier les gestionnaires de paquets disponibles
if command -v bun &> /dev/null; then
  HAS_BUN=true
  echo -e "${GREEN}✓ Bun est disponible${NC}"
else
  HAS_BUN=false
  echo -e "${RED}✗ Bun n'est pas disponible${NC}"
fi

if command -v npm &> /dev/null; then
  HAS_NPM=true
  echo -e "${GREEN}✓ NPM est disponible${NC}"
else
  HAS_NPM=false
  echo -e "${RED}✗ NPM n'est pas disponible${NC}"
fi

if command -v pnpm &> /dev/null; then
  HAS_PNPM=true
  echo -e "${GREEN}✓ PNPM est disponible${NC}"
else
  HAS_PNPM=false
  echo -e "${RED}✗ PNPM n'est pas disponible${NC}"
fi

if command -v yarn &> /dev/null; then
  HAS_YARN=true
  echo -e "${GREEN}✓ Yarn est disponible${NC}"
else
  HAS_YARN=false
  echo -e "${RED}✗ Yarn n'est pas disponible${NC}"
fi

# Vérifier les commandes nécessaires
echo -e "\n${BLUE}Vérification des dépendances...${NC}"

MISSING_DEPS=()

# Vérifier dotenv-cli
if command -v dotenv &> /dev/null || [ -f "node_modules/.bin/dotenv" ]; then
  echo -e "${GREEN}✓ dotenv-cli est installé${NC}"
else
  echo -e "${RED}✗ dotenv-cli n'est pas installé${NC}"
  MISSING_DEPS+=("dotenv-cli")
fi

# Installer les dépendances manquantes
if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
  echo -e "\n${YELLOW}${BOLD}Des dépendances sont manquantes. Installation en cours...${NC}"
  
  # Choisir le gestionnaire de paquets à utiliser
  if $HAS_BUN; then
    echo -e "${BLUE}Installation avec Bun...${NC}"
    bun add -d "${MISSING_DEPS[@]}"
  elif $HAS_PNPM; then
    echo -e "${BLUE}Installation avec PNPM...${NC}"
    pnpm add -D "${MISSING_DEPS[@]}"
  elif $HAS_YARN; then
    echo -e "${BLUE}Installation avec Yarn...${NC}"
    yarn add --dev "${MISSING_DEPS[@]}"
  elif $HAS_NPM; then
    echo -e "${BLUE}Installation avec NPM...${NC}"
    npm install --save-dev "${MISSING_DEPS[@]}"
  else
    echo -e "${RED}${BOLD}Erreur : Aucun gestionnaire de paquets disponible.${NC}"
    echo -e "${YELLOW}Veuillez installer NPM, Yarn, PNPM ou Bun avant de continuer.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}${BOLD}✅ Installation terminée avec succès !${NC}"
else
  echo -e "\n${GREEN}${BOLD}✅ Toutes les dépendances nécessaires sont installées !${NC}"
fi

echo -e "\n${YELLOW}Vous pouvez maintenant exécuter vos scripts de développement sans problème.${NC}"
echo -e "${BLUE}Par exemple :${NC} ./scripts/dev-fast.sh"
