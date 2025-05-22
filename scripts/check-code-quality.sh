#!/bin/bash
# filepath: /home/fabien/Projets/Portfolio/scripts/check-code-quality.sh

# Ce script vérifie la qualité du code avant le déploiement

set -e
echo "🔎 Vérification de la qualité du code..."

# Vérification des types TypeScript
echo "🔄 Vérification TypeScript..."
bun run type-check

# Vérification du formatage avec Prettier (sans modifier les fichiers)
echo "💅 Vérification du formatage..."
bun run format:check

# Vérification ESLint (aucun warning autorisé)
echo "🛠️ Vérification ESLint stricte..."
bun run lint:strict

echo "✅ Tout est bon ! Votre code est prêt pour le déploiement."
