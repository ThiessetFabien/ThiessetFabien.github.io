#!/bin/bash
# Script pour simplifier les imports de styles multiples en un seul import

echo "Simplification des imports de styles multiples..."

# Trouver tous les fichiers TypeScript et TSX dans le projet
FILES=$(find /home/fabien/Projets/Portfolio/src -type f -name "*.ts*" -not -path "*/node_modules/*" -not -path "*/.next/*")

# Nombre total de fichiers à traiter
TOTAL=$(echo "$FILES" | wc -l)
echo "Fichiers à analyser: $TOTAL"

# Compteur pour suivre la progression
COUNT=0
MODIFIED=0

# Parcourir chaque fichier
for file in $FILES; do
  COUNT=$((COUNT + 1))
  
  # Vérifier si le fichier a plusieurs imports de styles
  STYLE_IMPORTS=$(grep -c "from '@styles/" "$file")
  
  if [ "$STYLE_IMPORTS" -gt 1 ]; then
    echo "[$COUNT/$TOTAL] Traitement de $file (a $STYLE_IMPORTS imports de styles)"
    
    # Créer un fichier temporaire
    TEMP_FILE=$(mktemp)
    
    # Variables pour suivre les imports
    IMPORTS_TO_REPLACE=()
    IMPORTED_SYMBOLS=()
    
    # Extraire tous les imports de styles
    while IFS= read -r line; do
      if [[ $line =~ import[[:space:]]+\{([^}]+)\}[[:space:]]+from[[:space:]]+\'@styles/[^\']+\' ]]; then
        IMPORTS_TO_REPLACE+=("$line")
        
        # Extraire les symboles importés
        SYMBOLS=$(echo "$line" | sed -E "s/import[[:space:]]+\{([^}]+)\}[[:space:]]+from.*/\1/")
        
        # Ajouter chaque symbole à la liste
        for symbol in $(echo "$SYMBOLS" | sed 's/,/ /g'); do
          IMPORTED_SYMBOLS+=("$(echo "$symbol" | xargs)")
        done
      fi
    done < <(grep "from '@styles/" "$file")
    
    # Si des imports ont été trouvés
    if [ ${#IMPORTS_TO_REPLACE[@]} -gt 0 ]; then
      MODIFIED=$((MODIFIED + 1))
      
      # Créer le nouvel import
      NEW_IMPORT="import { $(echo "${IMPORTED_SYMBOLS[@]}" | sed 's/ /, /g') } from '@styles';"
      
      # Créer le contenu modifié du fichier
      awk -v new_import="$NEW_IMPORT" -v file="$file" '
        BEGIN {
          print_import = 1
          replaced = 0
        }
        
        # Si la ligne correspond à un import de styles
        /import[[:space:]]+\{[^}]+\}[[:space:]]+from[[:space:]]+\'@styles\/[^\']+\'/ {
          # Si c\'est le premier import de styles
          if (print_import) {
            print new_import
            print_import = 0
            replaced = 1
          }
          next
        }
        
        # Imprimer toutes les autres lignes
        { print }
        
        # Si aucun import n\'a été remplacé, ajouter le nouvel import au début du fichier
        END {
          if (!replaced) {
            system("echo \"" new_import "\" | cat - \"" file "\" > \"" file ".tmp\" && mv \"" file ".tmp\" \"" file "\"")
          }
        }
      ' "$file" > "$TEMP_FILE"
      
      # Remplacer le fichier original
      mv "$TEMP_FILE" "$file"
    fi
  fi
done

echo "Simplification terminée!"
echo "Fichiers analysés: $COUNT"
echo "Fichiers modifiés: $MODIFIED"
