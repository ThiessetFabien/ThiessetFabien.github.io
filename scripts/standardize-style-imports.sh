#!/bin/bash
# Script pour standardiser les imports de styles

echo "Standardisation des imports de styles..."

# Remplacer @src/styles par @styles dans tous les fichiers TypeScript et TSX
grep -l "from '@src/styles/" --include="*.ts*" -r /home/fabien/Projets/Portfolio/src | while read -r file; do
  echo "Traitement de $file"
  sed -i "s|from '@src/styles/|from '@styles/|g" "$file"
done

echo "Terminé!"
