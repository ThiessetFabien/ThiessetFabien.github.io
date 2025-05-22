#!/bin/bash
# Script pour convertir les imports relatifs en imports avec alias
# Usage: ./fix-relative-imports.sh [options]
#   Options:
#     --dry-run    - Afficher les changements sans les appliquer
#     --help       - Afficher ce message d'aide

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Valeurs par défaut
DRY_RUN=false

# Analyser les arguments
for arg in "$@"
do
  case $arg in
    --dry-run)
    DRY_RUN=true
    shift
    ;;
    --help)
    echo "Usage: ./fix-relative-imports.sh [options]"
    echo "  Options:"
    echo "    --dry-run    - Afficher les changements sans les appliquer"
    echo "    --help       - Afficher ce message d'aide"
    exit 0
    ;;
    *)
    # Argument inconnu
    echo -e "${RED}Argument inconnu: $arg${NC}"
    echo "Utilisez --help pour voir les options disponibles."
    exit 1
    ;;
  esac
done

echo -e "${BLUE}${BOLD}Conversion des imports relatifs en imports avec alias${NC}"
echo -e "${YELLOW}Recherche des fichiers avec des imports relatifs...${NC}"

# Liste des alias et leurs chemins correspondants
declare -A ALIAS_PATHS
ALIAS_PATHS["@src"]="src"
ALIAS_PATHS["@app"]="src/app"
ALIAS_PATHS["@api"]="src/app/api"
ALIAS_PATHS["@components"]="src/components"
ALIAS_PATHS["@common"]="src/components/common"
ALIAS_PATHS["@forms"]="src/components/forms"
ALIAS_PATHS["@layouts"]="src/components/layouts"
ALIAS_PATHS["@ui"]="src/components/ui"
ALIAS_PATHS["@config"]="src/config"
ALIAS_PATHS["@fonts"]="src/fonts"
ALIAS_PATHS["@hooks"]="src/hooks"
ALIAS_PATHS["@lib"]="src/lib"
ALIAS_PATHS["@services"]="src/services"
ALIAS_PATHS["@utils"]="src/utils"
ALIAS_PATHS["@middlewares"]="src/middlewares"
ALIAS_PATHS["@providers"]="src/components/providers"
ALIAS_PATHS["@schemas"]="src/schemas"
ALIAS_PATHS["@styles"]="src/styles"
ALIAS_PATHS["@types"]="src/types"

# Trouver tous les fichiers TypeScript et TSX dans le projet
FILES=$(find /home/fabien/Projets/Portfolio/src -type f -name "*.ts*" -not -path "*/node_modules/*" -not -path "*/.next/*")

# Nombre total de fichiers à traiter
TOTAL=$(echo "$FILES" | wc -l)
echo -e "${GREEN}Fichiers à analyser: $TOTAL${NC}"

# Compteur pour suivre la progression
COUNT=0
MODIFIED=0

# Parcourir chaque fichier
for file in $FILES; do
  COUNT=$((COUNT + 1))
  
  # Récupérer le chemin relatif du fichier par rapport à la racine du projet
  REL_PATH=$(realpath --relative-to=/home/fabien/Projets/Portfolio "$file")
  
  # Obtenir le répertoire du fichier
  FILE_DIR=$(dirname "$REL_PATH")
  
  # Fichier temporaire pour les modifications
  TEMP_FILE=$(mktemp)
  
  # Indicateur si le fichier a été modifié
  FILE_MODIFIED=false
  
  # Lire le fichier ligne par ligne
  while IFS= read -r line; do
    # Vérifier si la ligne contient un import relatif (commence par './' ou '../')
    if [[ $line =~ ^[[:space:]]*import[[:space:]]+.*from[[:space:]]+[\'\"]\.\./.*[\'\"] ]]; then
      # Obtenir le chemin d'import relatif
      IMPORT_PATH=$(echo "$line" | sed -E "s/^[[:space:]]*import[[:space:]]+.*from[[:space:]]+[\'\"](\.\.\/.*)[\'\"]/\1/")
      
      # Obtenir le chemin absolu de l'import relatif
      ABS_IMPORT_PATH=$(realpath --relative-to=/home/fabien/Projets/Portfolio "$FILE_DIR/$IMPORT_PATH")
      
      # Vérifier chaque alias pour trouver le meilleur match
      BEST_MATCH=""
      BEST_MATCH_LENGTH=0
      BEST_ALIAS=""
      
      for alias in "${!ALIAS_PATHS[@]}"; do
        path="${ALIAS_PATHS[$alias]}"
        
        # Vérifier si le chemin d'import commence par ce path
        if [[ $ABS_IMPORT_PATH == $path/* ]]; then
          # Obtenir la longueur du match
          MATCH_LENGTH=${#path}
          
          # Mettre à jour le meilleur match si nécessaire
          if [[ $MATCH_LENGTH -gt $BEST_MATCH_LENGTH ]]; then
            BEST_MATCH_LENGTH=$MATCH_LENGTH
            BEST_MATCH=$path
            BEST_ALIAS=$alias
          fi
        fi
      done
      
      # Si un match a été trouvé, remplacer le chemin relatif par l'alias
      if [[ -n $BEST_MATCH ]]; then
        # Obtenir le reste du chemin après le match
        REMAINDER=${ABS_IMPORT_PATH#$BEST_MATCH/}
        
        # Créer le nouvel import avec l'alias
        NEW_IMPORT=$(echo "$line" | sed -E "s/(from[[:space:]]+[\'\"])\.\.\/.*[\'\"]/\1$BEST_ALIAS\/$REMAINDER\"/")
        
        echo -e "  ${YELLOW}[$COUNT/$TOTAL] $file${NC}"
        echo -e "    ${RED}- $line${NC}"
        echo -e "    ${GREEN}+ $NEW_IMPORT${NC}"
        
        # Écrire la ligne modifiée
        echo "$NEW_IMPORT" >> "$TEMP_FILE"
        
        FILE_MODIFIED=true
      else
        # Aucun match trouvé, conserver la ligne originale
        echo "$line" >> "$TEMP_FILE"
      fi
    else
      # Ligne sans import relatif, la conserver telle quelle
      echo "$line" >> "$TEMP_FILE"
    fi
  done < "$file"
  
  # Si le fichier a été modifié et que ce n'est pas un dry run, remplacer le fichier original
  if [[ $FILE_MODIFIED == true ]]; then
    MODIFIED=$((MODIFIED + 1))
    
    if [[ $DRY_RUN == false ]]; then
      cp "$TEMP_FILE" "$file"
    fi
  fi
  
  # Supprimer le fichier temporaire
  rm "$TEMP_FILE"
done

echo -e "${GREEN}Analyse terminée!${NC}"
echo -e "${BLUE}${BOLD}Fichiers analysés: $COUNT${NC}"
echo -e "${BLUE}${BOLD}Fichiers à modifier: $MODIFIED${NC}"

if [[ $DRY_RUN == true ]]; then
  echo -e "${YELLOW}Mode dry-run: aucun changement n'a été appliqué.${NC}"
  echo -e "${YELLOW}Exécutez sans --dry-run pour appliquer les changements.${NC}"
else
  echo -e "${GREEN}Les imports relatifs ont été convertis en imports avec alias.${NC}"
fi
