#!/bin/bash

# Script pour corriger les avertissements de configuration NPM

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             CORRECTION DE LA CONFIGURATION NPM             ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}Ce script corrige les avertissements 'Unknown project config' de NPM${NC}"

# Vérifier si le fichier .npmrc existe
if [ -f ".npmrc" ]; then
  echo -e "${BLUE}[1/3]${NC} Sauvegarde du fichier .npmrc existant..."
  cp .npmrc .npmrc.bak
  echo -e "${GREEN}✓ Fichier .npmrc sauvegardé dans .npmrc.bak${NC}"
  
  # Supprimer les configurations qui ne sont plus supportées dans les nouvelles versions de NPM
  echo -e "${BLUE}[2/3]${NC} Mise à jour du fichier .npmrc..."
  
  # Créer un nouvel .npmrc sans les lignes problématiques
  grep -v "resolution-mode" .npmrc | grep -v "network-timeout" > .npmrc.new
  
  # Ajouter des commentaires explicatifs
  echo "" >> .npmrc.new
  echo "# Note: Les configurations suivantes ont été retirées car obsolètes avec npm 11+" >> .npmrc.new
  echo "# resolution-mode=highest (anciennement)" >> .npmrc.new
  echo "# network-timeout=100000 (anciennement)" >> .npmrc.new
  
  # Remplacer l'ancien fichier par le nouveau
  mv .npmrc.new .npmrc
  echo -e "${GREEN}✓ Fichier .npmrc mis à jour${NC}"
else
  echo -e "${BLUE}[1/3]${NC} Création d'un nouveau fichier .npmrc..."
  
  # Créer un nouveau fichier .npmrc avec des configurations modernes
  cat > .npmrc << EOF
registry=https://registry.npmjs.org/
access=public
engine-strict=true

# Configurations modernes pour NPM 11+
prefer-highest=true
fetch-timeout=100000
EOF
  
  echo -e "${GREEN}✓ Fichier .npmrc créé${NC}"
fi

echo -e "${BLUE}[3/3]${NC} Vérification de la configuration NPM..."
npm config list
echo -e "${GREEN}${BOLD}✅ Configuration NPM mise à jour avec succès !${NC}"
