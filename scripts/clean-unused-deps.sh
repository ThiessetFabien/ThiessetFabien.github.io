#!/bin/bash

# Script pour supprimer les dépendances inutilisées
# Basé sur les résultats de depcheck

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║           SUPPRESSION DES DÉPENDANCES INUTILISÉES          ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}Liste des dépendances inutilisées à supprimer :${NC}"
echo -e " ${BLUE}•${NC} @types/dompurify"
echo -e " ${BLUE}•${NC} critters"
echo -e " ${BLUE}•${NC} dompurify"
echo -e " ${BLUE}•${NC} embla-carousel-autoplay"
echo -e " ${BLUE}•${NC} isomorphic-dompurify"
echo -e " ${BLUE}•${NC} jsdom"
echo -e " ${BLUE}•${NC} nodemailer"
echo -e " ${BLUE}•${NC} @netlify/plugin-nextjs"
echo -e " ${BLUE}•${NC} @tailwindcss/postcss"
echo -e " ${BLUE}•${NC} eslint-plugin-next"
echo -e " ${BLUE}•${NC} eslint-plugin-prettier"
echo -e " ${BLUE}•${NC} prettier-plugin-tailwindcss"
echo -e " ${BLUE}•${NC} source-map-loader"

# Remarque concernant les dépendances de PostCSS et CSS
echo -e "${YELLOW}Note importante concernant les dépendances suivantes :${NC}"
echo -e " ${BLUE}•${NC} autoprefixer, css-loader, cssnano, cssnano-preset-default, postcss, postcss-import, postcss-loader, style-loader"
echo -e "  ${YELLOW}Ces packages sont utilisés dans next.config.js et sont nécessaires au fonctionnement de la configuration webpack personnalisée.${NC}"

# Demander confirmation
echo -e "${YELLOW}Voulez-vous procéder à la suppression des dépendances inutilisées ? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo -e "${BLUE}Suppression des dépendances...${NC}"
    
    # Suppression des dépendances principales
    bun remove @types/dompurify critters dompurify embla-carousel-autoplay isomorphic-dompurify jsdom nodemailer
    
    # Suppression des dépendances de développement
    bun remove @netlify/plugin-nextjs @tailwindcss/postcss eslint-plugin-next eslint-plugin-prettier prettier-plugin-tailwindcss source-map-loader
    
    echo -e "${GREEN}${BOLD}✅ Dépendances inutilisées supprimées avec succès !${NC}"
else
    echo -e "${RED}Opération annulée.${NC}"
    exit 0
fi

echo -e "${GREEN}Opération terminée.${NC}"
