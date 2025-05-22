#!/bin/sh
# Script pour corriger les problèmes de favicon

# Afficher les informations sur les fichiers favicon actuels
echo "Vérification des fichiers favicon actuels..."
ls -la public/favicon*

# Vérifier si les fichiers existent
if [ ! -f "public/favicon.ico" ]; then
  echo "Erreur: public/favicon.ico n'existe pas!"
  exit 1
fi

# Réparer les permissions
echo "Réparation des permissions des fichiers favicon..."
chmod 644 public/favicon.ico
chmod 644 public/favicon-16x16.png
chmod 644 public/favicon-32x32.png
chmod 644 public/apple-touch-icon.png

# Vérifier la taille et l'intégrité des fichiers
echo "Vérification de l'intégrité des fichiers..."
file public/favicon.ico
file public/favicon-16x16.png
file public/favicon-32x32.png

# Créer une copie de sauvegarde au cas où
echo "Création d'une copie de sauvegarde des favicons..."
mkdir -p backups/favicons
cp public/favicon.ico backups/favicons/
cp public/favicon-16x16.png backups/favicons/
cp public/favicon-32x32.png backups/favicons/
cp public/apple-touch-icon.png backups/favicons/

echo "Processus de réparation terminé!"
