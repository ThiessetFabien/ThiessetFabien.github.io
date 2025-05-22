#!/bin/bash

# Script pour restaurer la configuration SWC originale après utilisation de Turbopack

# Définir le dossier de travail
cd "$(dirname "$0")/.." || exit 1

# Restaurer la configuration originale
if [ -f .swcrc.original ]; then
  echo "🔄 Restauration de la configuration SWC originale"
  cp .swcrc.original .swcrc
  rm .swcrc.original
  echo "✅ Configuration restaurée"
else
  echo "❌ Aucune sauvegarde trouvée, impossible de restaurer"
fi

# Supprimer les autres fichiers temporaires
if [ -f .swcrc.bak.turbo ]; then
  rm .swcrc.bak.turbo
fi
