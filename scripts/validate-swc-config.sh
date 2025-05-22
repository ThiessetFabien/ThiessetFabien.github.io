#!/bin/bash
# Script pour valider et maintenir la configuration SWC
# Usage: ./validate-swc-config.sh

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SWC_CONFIG="$REPO_ROOT/.swcrc"

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║            VALIDATION DE LA CONFIGURATION SWC              ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Vérifier si le fichier .swcrc existe
if [ ! -f "$SWC_CONFIG" ]; then
  echo -e "${RED}Erreur: Le fichier .swcrc n'existe pas.${NC}"
  exit 1
fi

# Vérifier la syntaxe JSON du fichier .swcrc
echo -e "${YELLOW}Vérification de la syntaxe JSON...${NC}"
if ! jq . "$SWC_CONFIG" > /dev/null 2>&1; then
  echo -e "${RED}Erreur: Le fichier .swcrc contient une syntaxe JSON invalide.${NC}"
  exit 1
else
  echo -e "${GREEN}✓ Syntaxe JSON valide${NC}"
fi

# Vérifier l'absence de $schema qui pourrait causer des problèmes
echo -e "${YELLOW}Vérification des références de schéma...${NC}"
if grep -q '"\$schema"' "$SWC_CONFIG"; then
  echo -e "${YELLOW}⚠️  Attention: Le fichier contient une référence à un schéma externe.${NC}"
  echo -e "${YELLOW}   Considérez retirer cette référence si elle cause des problèmes.${NC}"
else
  echo -e "${GREEN}✓ Aucune référence de schéma trouvée${NC}"
fi

# Vérifier les chemins alias pour s'assurer qu'ils correspondent à la structure du projet
echo -e "${YELLOW}Vérification des chemins alias...${NC}"
PATHS_COUNT=$(jq '.jsc.paths | length' "$SWC_CONFIG" 2>/dev/null || echo "0")
if [ "$PATHS_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✓ $PATHS_COUNT chemins alias configurés${NC}"
  
  # Vérifier si les dossiers référencés existent
  MISSING_PATHS=0
  while read -r path_key; do
    # Extraire le chemin de base (supprime les caractères spéciaux comme "*" et retirer les guillemets)
    BASE_DIR=$(echo "$path_key" | sed -E 's/.*\[(.*)\].*/\1/' | sed 's/"//g' | sed 's/\*//g' | sed 's/^src\///' | head -1)
    if [ ! -z "$BASE_DIR" ] && [ ! -d "$REPO_ROOT/src/$BASE_DIR" ] && [[ "$BASE_DIR" != "." ]]; then
      echo -e "${YELLOW}   - Le dossier pour l'alias $path_key n'existe pas: src/$BASE_DIR${NC}"
      ((MISSING_PATHS++))
    fi
  done < <(jq -r '.jsc.paths | to_entries[] | .value[]' "$SWC_CONFIG" 2>/dev/null)
  
  if [ "$MISSING_PATHS" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $MISSING_PATHS chemins alias référencent des dossiers inexistants${NC}"
  else
    echo -e "${GREEN}✓ Tous les chemins alias référencent des dossiers existants${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  Aucun chemin alias configuré${NC}"
fi

# Vérifier si le fichier contient des commentaires (ce qui n'est pas standard en JSON)
echo -e "${YELLOW}Vérification des commentaires...${NC}"
if grep -q '//' "$SWC_CONFIG" || grep -q '/\*' "$SWC_CONFIG"; then
  echo -e "${YELLOW}⚠️  Le fichier contient des commentaires, ce qui n'est pas standard JSON.${NC}"
  echo -e "${YELLOW}   Cela fonctionne avec SWC mais pourrait causer des problèmes avec d'autres outils.${NC}"
else
  echo -e "${GREEN}✓ Aucun commentaire détecté${NC}"
fi

# Backup et nettoyer le fichier si nécessaire
read -p "Souhaitez-vous créer une version propre du fichier .swcrc sans commentaires? (o/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
  # Créer un backup
  cp "$SWC_CONFIG" "$SWC_CONFIG.backup"
  echo -e "${GREEN}Backup créé: .swcrc.backup${NC}"
  
  # Créer une version propre
  jq . "$SWC_CONFIG" > "$SWC_CONFIG.clean"
  echo -e "${GREEN}Version propre créée: .swcrc.clean${NC}"
  
  read -p "Remplacer le fichier existant par la version propre? (o/N) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Oo]$ ]]; then
    mv "$SWC_CONFIG.clean" "$SWC_CONFIG"
    echo -e "${GREEN}Fichier .swcrc remplacé par la version propre${NC}"
  fi
fi

echo -e "\n${GREEN}${BOLD}Validation terminée !${NC}"
