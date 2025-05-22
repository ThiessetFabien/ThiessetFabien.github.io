#!/bin/bash

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Installer Bun globalement
echo -e "${BLUE}${BOLD}🔧 Installation de Bun...${NC}"
npm install -g bun
bun --version

# Installer les dépendances avec Bun
echo -e "${BLUE}${BOLD}📦 Installation des dépendances avec Bun...${NC}"
bun install

# Optimiser le cache avant le build
echo -e "${BLUE}${BOLD}🧹 Optimisation du cache...${NC}"
./scripts/optimize-cache.sh

# Optimiser les images
echo -e "${BLUE}${BOLD}🖼️ Optimisation des images...${NC}"
bun run optimize-images

# Générer les images responsives
echo -e "${BLUE}${BOLD}📱 Génération des images responsives...${NC}"
# On utilise & pour exécuter en arrière-plan et continuer le build
bun run generate-responsive &

# Exécuter le build avec Bun
echo -e "${BLUE}${BOLD}🏗️ Construction avec Bun...${NC}"

# Définir les options de Node pour augmenter la mémoire disponible
export NODE_OPTIONS=--max-old-space-size=4096

# S'assurer que NODE_ENV est correctement défini
export NODE_ENV=production

# Utiliser le script de build optimisé
./scripts/build.sh

echo -e "${GREEN}${BOLD}✅ Build terminé avec succès !${NC}"

# Afficher la taille du bundle
echo -e "${YELLOW}Taille du bundle généré :${NC}"
du -sh .next || du -sh out
