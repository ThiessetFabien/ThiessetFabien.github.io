#!/bin/bash
# Script pour remplacer les références aux anciennes constantes de style
# par les nouvelles constantes centralisées

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}Remplacement des références aux anciennes constantes de style${NC}"
echo -e "${YELLOW}Ce script va remplacer les références aux constantes de css-classes.ts par les nouvelles constantes de style centralisées.${NC}"
echo -e "${YELLOW}Une sauvegarde des fichiers modifiés sera créée avant les modifications.${NC}"

# Créer un dossier pour les sauvegardes
mkdir -p /home/fabien/Projets/Portfolio/backups/styles-migration

# Mappings des anciennes constantes vers les nouvelles
declare -A REPLACEMENTS=(
  ["TEXT_CLASSES.CENTERED_TEXT"]="cnCenteredText"
  ["TEXT_CLASSES.RESPONSIVE_PADDING"]="cnResponsiveTextPadding"
  ["TEXT_CLASSES.INTERACTIVE_LINK"]="cnInteractiveLink"
  ["CONTAINER_CLASSES.FLEX_CARD"]="cnFlexCard"
  ["CONTAINER_CLASSES.SMALL_GAP"]="cnSmallGap"
  ["CONTAINER_CLASSES.MEDIUM_GAP"]="cnMediumGap"
  ["CONTAINER_CLASSES.LARGE_GAP"]="cnLargeGap"
)

# Compteurs pour les statistiques
TOTAL_FILES=0
MODIFIED_FILES=0
TOTAL_REPLACEMENTS=0

# Trouver les fichiers qui importent css-classes.ts
CSS_CLASSES_IMPORTS=$(grep -l "css-classes" --include="*.ts*" -r /home/fabien/Projets/Portfolio/src)

# Si des fichiers importent css-classes.ts
if [ -n "$CSS_CLASSES_IMPORTS" ]; then
  echo -e "${YELLOW}Fichiers qui importent css-classes.ts:${NC}"
  echo "$CSS_CLASSES_IMPORTS"
  
  # Pour chaque fichier qui importe css-classes.ts
  for file in $CSS_CLASSES_IMPORTS; do
    TOTAL_FILES=$((TOTAL_FILES + 1))
    echo -e "${GREEN}Traitement de $file${NC}"
    
    # Créer une sauvegarde du fichier
    cp "$file" "/home/fabien/Projets/Portfolio/backups/styles-migration/$(basename "$file")"
    
    # Indicateur si le fichier a été modifié
    FILE_MODIFIED=false
    
    # Remplacer les importations de css-classes.ts par les importations des fichiers de style
    if grep -q "import.*from ['\"]@.*config/css-classes['\"]" "$file"; then
      sed -i "s|import.*from ['\"]@.*config/css-classes['\"]|import { cnCenteredText, cnResponsiveTextPadding, cnInteractiveLink, cnFlexCard, cnSmallGap, cnMediumGap, cnLargeGap } from '@styles';|" "$file"
      echo -e "  ${YELLOW}Import de css-classes.ts remplacé par import depuis @styles${NC}"
      FILE_MODIFIED=true
      TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + 1))
    fi
    
    # Pour chaque mapping de remplacement
    for old_const in "${!REPLACEMENTS[@]}"; do
      new_const="${REPLACEMENTS[$old_const]}"
      
      # Compter les occurrences de l'ancienne constante
      occurrences=$(grep -c "$old_const" "$file" || true)
      
      # Si l'ancienne constante est utilisée
      if [ "$occurrences" -gt 0 ]; then
        echo -e "  ${YELLOW}Remplacement de $old_const par $new_const ($occurrences occurrences)${NC}"
        sed -i "s|$old_const|$new_const|g" "$file"
        FILE_MODIFIED=true
        TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + occurrences))
      fi
    done
    
    # Si le fichier a été modifié
    if [ "$FILE_MODIFIED" = true ]; then
      MODIFIED_FILES=$((MODIFIED_FILES + 1))
    else
      echo -e "  ${YELLOW}Aucune modification nécessaire${NC}"
    fi
  done
else
  echo -e "${GREEN}Aucun fichier n'importe css-classes.ts${NC}"
fi

# Afficher les statistiques
echo -e "${BLUE}${BOLD}Statistiques${NC}"
echo -e "${GREEN}Fichiers traités: $TOTAL_FILES${NC}"
echo -e "${GREEN}Fichiers modifiés: $MODIFIED_FILES${NC}"
echo -e "${GREEN}Remplacements effectués: $TOTAL_REPLACEMENTS${NC}"

# Créer la documentation pour la migration
cat > /home/fabien/Projets/Portfolio/docs/styles-migration.md << EOF
# Migration des Styles CSS

## Résumé
Cette documentation décrit la migration des constantes de style depuis \`css-classes.ts\` vers les fichiers de styles centralisés.

## Statistiques
- Fichiers traités: $TOTAL_FILES
- Fichiers modifiés: $MODIFIED_FILES
- Remplacements effectués: $TOTAL_REPLACEMENTS

## Constantes migrées
| Ancienne constante | Nouvelle constante |
|--------------------|-------------------|
| \`TEXT_CLASSES.CENTERED_TEXT\` | \`cnCenteredText\` |
| \`TEXT_CLASSES.RESPONSIVE_PADDING\` | \`cnResponsiveTextPadding\` |
| \`TEXT_CLASSES.INTERACTIVE_LINK\` | \`cnInteractiveLink\` |
| \`CONTAINER_CLASSES.FLEX_CARD\` | \`cnFlexCard\` |
| \`CONTAINER_CLASSES.SMALL_GAP\` | \`cnSmallGap\` |
| \`CONTAINER_CLASSES.MEDIUM_GAP\` | \`cnMediumGap\` |
| \`CONTAINER_CLASSES.LARGE_GAP\` | \`cnLargeGap\` |

## Avantages
1. **Cohérence** : Tous les styles suivent maintenant la même convention de nommage (\`cn\` prefix)
2. **Centralisation** : Tous les styles sont définis dans le dossier \`styles\`
3. **Organisation** : Les styles sont regroupés logiquement par fonctionnalité
4. **Maintenabilité** : Les modifications futures sont plus faciles à gérer

## Fichiers créés ou modifiés
- Nouveau fichier: \`src/styles/text.style.ts\`
- Modifié: \`src/styles/flex.style.ts\`
- Modifié: \`src/styles/boxModel.style.ts\`
- Modifié: \`src/styles/index.ts\`

## Prochaines étapes
1. Vérifier que toutes les références ont été correctement migrées
2. Supprimer le fichier \`css-classes.ts\` une fois les tests validés
3. Mettre à jour la documentation si nécessaire
EOF

echo -e "${GREEN}Documentation créée: /home/fabien/Projets/Portfolio/docs/styles-migration.md${NC}"

# Demander s'il faut supprimer css-classes.ts
echo -e "${YELLOW}Le fichier css-classes.ts a été sauvegardé dans backups/config/${NC}"
echo -e "${YELLOW}Voulez-vous le supprimer maintenant? (y/n)${NC}"
echo -e "${YELLOW}Pour le supprimer plus tard, utilisez: rm /home/fabien/Projets/Portfolio/src/config/css-classes.ts${NC}"
