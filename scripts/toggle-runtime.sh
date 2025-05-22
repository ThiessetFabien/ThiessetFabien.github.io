#!/usr/bin/env bash

# Script pour basculer entre Bun et Node.js pour l'exécution de Next.js
# Usage: ./scripts/toggle-runtime.sh [bun|node]

MODE=${1:-toggle}

if [[ ! -f .runtime ]]; then
  echo "bun" > .runtime
  echo "✅ Mode actuel : Bun (par défaut)"
  MODE="bun"
fi

CURRENT_MODE=$(cat .runtime)

case "$MODE" in
  toggle)
    if [[ "$CURRENT_MODE" == "bun" ]]; then
      echo "node" > .runtime
      echo "🔄 Basculé vers Node.js"
    else
      echo "bun" > .runtime
      echo "🔄 Basculé vers Bun"
    fi
    ;;
  bun)
    echo "bun" > .runtime
    echo "✅ Mode défini sur Bun"
    ;;
  node)
    echo "node" > .runtime
    echo "✅ Mode défini sur Node.js"
    ;;
  *)
    echo "❌ Mode non reconnu. Utilisez 'bun', 'node' ou sans argument pour basculer."
    exit 1
    ;;
esac

UPDATED_MODE=$(cat .runtime)
echo "ℹ️ Mode d'exécution actuel : $UPDATED_MODE"

if [[ "$UPDATED_MODE" == "bun" ]]; then
  echo "ℹ️ Pour exécuter Next.js avec Bun, utilisez : bun --bun run dev"
  echo "ℹ️ Pour construire avec Bun : bun --bun run build"
else
  echo "ℹ️ Pour exécuter Next.js avec Node.js, utilisez : npm run dev"
  echo "ℹ️ Pour construire avec Node.js : npm run build"
fi

# Ajout au .gitignore s'il n'est pas déjà présent
if ! grep -q "^.runtime$" .gitignore; then
  echo "" >> .gitignore
  echo "# Runtime toggle file" >> .gitignore
  echo ".runtime" >> .gitignore
  echo "✅ Fichier .runtime ajouté au .gitignore"
fi
