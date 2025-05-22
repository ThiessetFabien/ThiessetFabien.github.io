#!/bin/bash
# Script pour corriger les utilisations d'index dans les clés React
# Auteur: Fabien Thiesset

# Définir les couleurs pour une meilleure lisibilité
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==== Correction des problèmes d'index dans les clés React ====${NC}"

# Trouver tous les fichiers contenant potentiellement des problèmes d'index dans les clés
echo -e "${YELLOW}Recherche des fichiers avec des problèmes d'utilisation d'index dans les clés...${NC}"
AFFECTED_FILES=$(grep -r --include="*.tsx" "key={\(i\|index\)}" src/ | cut -d':' -f1 | sort | uniq)

if [ -z "$AFFECTED_FILES" ]; then
  echo -e "${GREEN}Aucun fichier avec des problèmes d'index dans les clés n'a été trouvé.${NC}"
  exit 0
fi

echo -e "${YELLOW}Fichiers affectés trouvés :${NC}"
echo "$AFFECTED_FILES"

# Créer un répertoire pour les sauvegardes si nécessaire
mkdir -p .backups

# Traiter chaque fichier
for FILE in $AFFECTED_FILES; do
  echo -e "\n${BLUE}Traitement du fichier : ${FILE}${NC}"
  
  # Créer une sauvegarde du fichier
  BACKUP_FILE=".backups/$(basename "$FILE").backup-$(date +%Y%m%d%H%M%S)"
  cp "$FILE" "$BACKUP_FILE"
  echo -e "${GREEN}Sauvegarde créée : ${BACKUP_FILE}${NC}"
  
  # Analyser le fichier pour déterminer les variables à utiliser comme clés
  ARRAYS=$(grep -o "[a-zA-Z0-9]*\.\(map\|filter\|forEach\)" "$FILE" | cut -d'.' -f1 | sort | uniq)
  
  if [ -z "$ARRAYS" ]; then
    echo -e "${YELLOW}Aucun tableau à mapper trouvé dans ce fichier.${NC}"
    continue
  fi
  
  echo -e "${YELLOW}Tableaux identifiés : ${ARRAYS}${NC}"
  
  # Mise à jour du fichier pour utiliser des identifiants uniques
  sed -i 's/key={i}/key={`${item.id || item.name || item.title || "item"}-${i}`}/g' "$FILE"
  sed -i 's/key={index}/key={`${item.id || item.name || item.title || "item"}-${index}`}/g' "$FILE"
  
  echo -e "${GREEN}Mise à jour réussie pour : ${FILE}${NC}"
done

echo -e "\n${GREEN}==== Terminé ! ====${NC}"
echo -e "${YELLOW}Note : Cette opération a effectué une mise à jour automatique des clés React.${NC}"
echo -e "${YELLOW}Veuillez vérifier que chaque composant mappé a bien un identifiant unique approprié.${NC}"
echo -e "${YELLOW}Dans certains cas, vous devrez peut-être ajuster manuellement les clés pour assurer l'unicité.${NC}"
echo -e "\n${BLUE}Pour vérifier les erreurs ESLint restantes, exécutez :${NC}"
echo -e "${GREEN}bun run lint:check${NC}"
