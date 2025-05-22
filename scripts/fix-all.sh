#!/bin/bash
# Script pour corriger tous les problèmes courants de code
# Auteur: Fabien Thiesset

# Définir les couleurs pour une meilleure lisibilité
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==== Correction automatique des problèmes de code ====${NC}"
echo -e "${YELLOW}Ce script exécutera plusieurs outils pour corriger les problèmes courants.${NC}\n"

# Vérifier si l'utilisateur veut continuer
read -p "Continuer ? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Opération annulée.${NC}"
    exit 1
fi

# Créer un répertoire pour les sauvegardes
echo -e "\n${BLUE}Création d'un point de sauvegarde...${NC}"
BACKUP_DIR=".backups/auto-fix-$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Sauvegarder les fichiers importants
echo -e "${YELLOW}Sauvegarde des fichiers importants...${NC}"
cp -r src "$BACKUP_DIR/"
echo -e "${GREEN}Sauvegarde créée dans $BACKUP_DIR${NC}\n"

# Étape 1: Corriger les clés React
echo -e "${BLUE}Étape 1: Correction des clés React${NC}"
./scripts/fix-react-keys.sh
echo -e "${GREEN}Étape 1 terminée.${NC}\n"

# Étape 2: Corriger les contextes React
echo -e "${BLUE}Étape 2: Optimisation des contextes React${NC}"
./scripts/fix-react-contexts.sh
echo -e "${GREEN}Étape 2 terminée.${NC}\n"

# Étape 3: Corriger le formatage et le linting
echo -e "${BLUE}Étape 3: Correction du formatage et du linting${NC}"
./scripts/fix-lint-format.sh
echo -e "${GREEN}Étape 3 terminée.${NC}\n"

# Étape 4: Vérification finale
echo -e "${BLUE}Étape 4: Vérification finale${NC}"
LINT_ERRORS=$(./scripts/check-lint-errors.sh 2>&1 | grep -c "error")

if [ "$LINT_ERRORS" -eq "0" ]; then
  echo -e "${GREEN}✓ Aucune erreur détectée !${NC}"
else
  echo -e "${YELLOW}Il reste encore $LINT_ERRORS erreurs à corriger manuellement.${NC}"
  echo -e "${YELLOW}Exécutez 'bun run lint:check' pour voir les détails.${NC}"
fi

echo -e "\n${GREEN}==== Opération terminée ! ====${NC}"
echo -e "${BLUE}Un backup de vos fichiers avant correction a été créé dans :${NC}"
echo -e "${GREEN}$BACKUP_DIR${NC}"
echo -e "\n${YELLOW}Si vous rencontrez des problèmes avec les modifications automatiques,${NC}"
echo -e "${YELLOW}vous pouvez restaurer cette sauvegarde.${NC}"
