#!/bin/bash
# Script pour corriger les contextes React mal construits
# Auteur: Fabien Thiesset

# Définir les couleurs pour une meilleure lisibilité
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==== Optimisation des valeurs de contexte React ====${NC}"

# Trouver tous les fichiers contenant potentiellement des problèmes de contexte
echo -e "${YELLOW}Recherche des fichiers avec des contextes React...${NC}"
AFFECTED_FILES=$(grep -r --include="*.tsx" -E "(Context\.Provider|createContext)" src/ | cut -d':' -f1 | sort | uniq)

if [ -z "$AFFECTED_FILES" ]; then
  echo -e "${GREEN}Aucun fichier avec des contextes React n'a été trouvé.${NC}"
  exit 0
fi

echo -e "${YELLOW}Fichiers de contexte trouvés :${NC}"
echo "$AFFECTED_FILES"

# Créer un répertoire pour les sauvegardes si nécessaire
mkdir -p .backups

# Traiter chaque fichier
for FILE in $AFFECTED_FILES; do
  echo -e "\n${BLUE}Analyse du fichier : ${FILE}${NC}"
  
  # Créer une sauvegarde du fichier
  BACKUP_FILE=".backups/$(basename "$FILE").backup-$(date +%Y%m%d%H%M%S)"
  cp "$FILE" "$BACKUP_FILE"
  echo -e "${GREEN}Sauvegarde créée : ${BACKUP_FILE}${NC}"
  
  # Vérifier si le fichier utilise useCallback ou useMemo
  if ! grep -q "useMemo\|useCallback" "$FILE"; then
    # Ajouter l'import de useMemo s'il n'existe pas déjà
    if ! grep -q "import.*useMemo.*from 'react'" "$FILE"; then
      if grep -q "import.*from 'react'" "$FILE"; then
        # Ajouter useMemo à un import React existant
        sed -i "s/import {/import { useMemo, /" "$FILE"
      else
        # Créer un nouvel import React
        sed -i '1i import { useMemo } from '\''react'\'';' "$FILE"
      fi
      echo -e "${GREEN}Import useMemo ajouté à ${FILE}${NC}"
    fi
  fi
  
  # Chercher les valeurs de Provider non mémorisées
  PROVIDER_LINES=$(grep -n "value={" "$FILE" | grep -v "useMemo" | cut -d':' -f1)
  
  if [ -z "$PROVIDER_LINES" ]; then
    echo -e "${GREEN}Aucune valeur de Provider non mémorisée trouvée dans ce fichier.${NC}"
    continue
  fi
  
  echo -e "${YELLOW}Lignes avec des valeurs de Provider non mémorisées : ${PROVIDER_LINES}${NC}"
  
  # Créer un fichier temporaire pour les modifications
  TEMP_FILE=$(mktemp)
  
  # Traiter ligne par ligne
  LINE_NUM=1
  while IFS= read -r LINE; do
    if echo "$PROVIDER_LINES" | grep -q "$LINE_NUM"; then
      # Ligne avec une valeur de Provider non mémorisée
      if echo "$LINE" | grep -q "value={.*}"; then
        # Extraire la valeur entre les accolades
        VALUE=$(echo "$LINE" | sed -E 's/.*value=\{(.*)\}.*/\1/')
        # Remplacer par une version useMemo
        echo "  const memoizedValue = useMemo(() => ($VALUE), [$VALUE]);" >> "$TEMP_FILE"
        echo "$LINE" | sed "s/value={.*}/value={memoizedValue}/" >> "$TEMP_FILE"
      else
        # Cas plus complexe, juste ajouter un commentaire
        echo "$LINE" >> "$TEMP_FILE"
        echo "  {/* TODO: Utilisez useMemo pour cette valeur de Provider */}" >> "$TEMP_FILE"
      fi
    else
      # Ligne normale
      echo "$LINE" >> "$TEMP_FILE"
    fi
    LINE_NUM=$((LINE_NUM + 1))
  done < "$FILE"
  
  # Remplacer le fichier original
  mv "$TEMP_FILE" "$FILE"
  
  echo -e "${GREEN}Mise à jour réussie pour : ${FILE}${NC}"
done

echo -e "\n${GREEN}==== Terminé ! ====${NC}"
echo -e "${YELLOW}Note : Cette opération a tenté d'optimiser les valeurs de contexte avec useMemo.${NC}"
echo -e "${YELLOW}Veuillez vérifier manuellement chaque fichier modifié pour assurer la correction.${NC}"
echo -e "${YELLOW}Les dépendances du tableau de useMemo peuvent nécessiter des ajustements.${NC}"
echo -e "\n${BLUE}Pour vérifier les erreurs ESLint restantes, exécutez :${NC}"
echo -e "${GREEN}bun run lint:check${NC}"
