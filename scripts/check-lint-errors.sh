#!/bin/bash

# Script pour vérifier et répertorier les erreurs ESLint persistantes
# Auteur: Fabien Thiesset

echo "==== Vérification des erreurs ESLint ===="
echo "Lancement de ESLint avec les règles mises à jour..."

# Définir les couleurs pour une meilleure lisibilité
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérifier si nous sommes dans l'environnement Bun
if command -v bun &> /dev/null; then
  echo -e "${BLUE}Utilisation de Bun pour exécuter ESLint...${NC}"
  RESULT=$(bun --bun next lint --max-warnings=0 2>&1)
  EXIT_CODE=$?
else
  echo -e "${YELLOW}Bun non détecté, utilisation de NPX...${NC}"
  RESULT=$(npx eslint './src/**/*.{ts,tsx}' --max-warnings=0 2>&1)
  EXIT_CODE=$?
fi

# Afficher le nombre d'erreurs et d'avertissements
ERRORS=$(echo "$RESULT" | grep -c "error")
WARNINGS=$(echo "$RESULT" | grep -c "warning")

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}✓ Aucune erreur détectée !${NC}"
else
  echo -e "${RED}✗ Problèmes détectés :${NC}"
  echo -e "${RED}$ERRORS erreurs${NC} et ${YELLOW}$WARNINGS avertissements${NC}"
  
  # Afficher un résumé des erreurs par fichier
  echo -e "\n${BLUE}=== Résumé des problèmes par fichier ===${NC}"
  echo "$RESULT" | grep -E "\.tsx?:" | sed -E 's/^.*src\/(.+):[0-9]+:[0-9]+:(.+)$/\1:\2/' | sort | uniq -c | sort -nr
  
  # Afficher les erreurs les plus fréquentes
  echo -e "\n${BLUE}=== Erreurs les plus fréquentes ===${NC}"
  echo "$RESULT" | grep -E "error|warning" | sed -E 's/^.*: (.+)$/\1/' | sort | uniq -c | sort -nr | head -10
fi

echo -e "\n${BLUE}Pour résoudre automatiquement les problèmes corrigeables, exécutez :${NC}"
echo -e "${GREEN}bun run fix:code${NC}"

exit $EXIT_CODE
