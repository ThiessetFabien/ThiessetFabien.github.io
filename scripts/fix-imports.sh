#!/bin/bash
# Script pour corriger les imports utilisant @src/components/ui/ en @ui/

echo "Correction des imports dans les fichiers TypeScript et TSX..."

# Utiliser grep pour trouver tous les fichiers avec des imports @src/components/ui/
FILES=$(grep -l "from '@src/components/ui/" --include="*.ts*" -r /home/fabien/Projets/Portfolio/src)

# Nombre total de fichiers à traiter
TOTAL=$(echo "$FILES" | wc -l)
echo "Fichiers à traiter: $TOTAL"

# Compteur pour suivre la progression
COUNT=0

# Parcourir chaque fichier et effectuer le remplacement
for file in $FILES; do
  COUNT=$((COUNT + 1))
  echo "[$COUNT/$TOTAL] Traitement de $file"
  
  # Remplacer les imports @src/components/ui/ par @ui/
  sed -i "s|from '@src/components/ui/|from '@ui/|g" "$file"
done

echo "Correction terminée! $COUNT fichiers ont été mis à jour."

# Vérification des erreurs TypeScript après les modifications
echo "Vérification des erreurs TypeScript..."
cd /home/fabien/Projets/Portfolio && npx tsc --noEmit

echo "Script terminé!"
