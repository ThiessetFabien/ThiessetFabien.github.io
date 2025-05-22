#!/bin/bash

# Couleurs pour la console
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${RED}${BOLD}
╔════════════════════════════════════════════════════════════╗
║          RÉINITIALISATION COMPLÈTE DE L'ENVIRONNEMENT      ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}${BOLD}ATTENTION:${NC} Cette commande va supprimer tous les fichiers générés et réinitialiser l'environnement de développement."
echo -e "Appuyez sur CTRL+C pour annuler, ou sur ENTRÉE pour continuer..."
read -r

echo -e "\n${BLUE}[1/7]${NC} Suppression du dossier .next..."
if [ -d ".next" ]; then
  rm -rf .next
  echo -e "${GREEN}✓ Dossier .next supprimé${NC}"
else
  echo -e "${YELLOW}Le dossier .next n'existe pas${NC}"
fi

echo -e "\n${BLUE}[2/7]${NC} Suppression du cache Bun..."
if command -v bun &> /dev/null; then
  bun pm cache rm
  echo -e "${GREEN}✓ Cache Bun supprimé${NC}"
else
  echo -e "${RED}✗ Bun n'est pas installé${NC}"
fi

echo -e "\n${BLUE}[3/7]${NC} Suppression du dossier .cache..."
if [ -d ".cache" ]; then
  rm -rf .cache
  mkdir -p .cache
  echo -e "${GREEN}✓ Dossier .cache supprimé et recréé${NC}"
else
  mkdir -p .cache
  echo -e "${YELLOW}Dossier .cache créé${NC}"
fi

echo -e "\n${BLUE}[4/7]${NC} Nettoyage du dossier public/images/responsive..."
if [ -d "public/images/responsive" ]; then
  rm -rf public/images/responsive
  mkdir -p public/images/responsive
  echo -e "${GREEN}✓ Images responsives supprimées${NC}"
else
  mkdir -p public/images/responsive
  echo -e "${YELLOW}Dossier d'images responsives créé${NC}"
fi

echo -e "\n${BLUE}[5/7]${NC} Restauration des images originales..."
# Trouver toutes les images de sauvegarde et les restaurer
RESTORED_COUNT=0
find public -name "*.original*" | while read -r original_file; do
  target_file="${original_file%.original*}"
  extension="${original_file##*.}"
  
  if [[ "$extension" == "original" ]]; then
    # Cas où l'extension est .original
    target_file="${original_file%.original}"
  else
    # Cas où l'extension est .original.webp ou similaire
    target_file="${original_file%.original.*}.${extension}"
  fi
  
  cp -f "$original_file" "$target_file"
  RESTORED_COUNT=$((RESTORED_COUNT+1))
  echo -e "${GREEN}✓ Restauré: ${target_file}${NC}"
done

if [ $RESTORED_COUNT -eq 0 ]; then
  echo -e "${YELLOW}Aucune image originale trouvée à restaurer${NC}"
else
  echo -e "${GREEN}✓ ${RESTORED_COUNT} images restaurées${NC}"
fi

echo -e "\n${BLUE}[6/7]${NC} Nettoyage des fichiers temporaires..."
find . -type f -name "*.temp" -delete
find . -type f -name "*.tmp" -delete
find . -type f -name "*.log" -delete
echo -e "${GREEN}✓ Fichiers temporaires supprimés${NC}"

echo -e "\n${BLUE}[7/7]${NC} Nettoyage des dossiers vides..."
bun run scripts/remove-empty-dirs.js

echo -e "\n${GREEN}${BOLD}✅ Réinitialisation terminée !${NC}"
echo -e "${YELLOW}Pour redémarrer le développement :${NC}"
echo -e "1. ${BOLD}bun install${NC} - Installer les dépendances"
echo -e "2. ${BOLD}bun run dev:fast${NC} - Démarrer le serveur de développement"
