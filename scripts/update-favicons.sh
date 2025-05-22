#!/bin/zsh

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🎨 Génération des favicons avec la couleur primaire du thème...${NC}"

# Sauvegarder les favicons existants
echo -e "${BLUE}📦 Sauvegarde des favicons existants...${NC}"
mkdir -p backups/favicons
cp public/favicon* backups/favicons/ 2>/dev/null || true
cp public/android-chrome* backups/favicons/ 2>/dev/null || true
cp public/apple-touch-icon* backups/favicons/ 2>/dev/null || true

# Générer les nouveaux favicons
node scripts/generate-favicons.js

echo -e "${GREEN}✨ Les favicons ont été mis à jour avec succès !${NC}"
echo -e "${BLUE}ℹ️  Les anciens favicons ont été sauvegardés dans backups/favicons/${NC}"
