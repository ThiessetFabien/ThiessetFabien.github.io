#!/bin/bash

# Script pour améliorer les performances de la première compilation
# Ce script prépare l'environnement de développement pour une compilation plus rapide

# Définir les couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Démarrage rapide du projet Portfolio${NC}"
echo -e "${YELLOW}Préparation de l'environnement pour une compilation plus rapide...${NC}"

# 1. Préchauffer le cache
echo -e "${BLUE}Étape 1/4: Préchauffage du cache${NC}"
./scripts/preheat-cache.sh

# 2. Optimiser la configuration Bun pour la première compilation
echo -e "${BLUE}Étape 2/4: Optimisation de la configuration de compilation${NC}"
echo '{ "debug": false, "minify": false, "target": "browser" }' > ./.swcrc.dev

# 3. Créer un .env minimal pour accélérer la compilation
echo -e "${BLUE}Étape 3/4: Création d'un environnement minimal${NC}"
if [ ! -f .env.development ]; then
  echo "NODE_ENV=development" > .env.development
  echo "SKIP_PREFLIGHT_CHECK=true" >> .env.development
  echo "DISABLE_ESLINT_PLUGIN=true" >> .env.development
  echo "FAST_REFRESH=true" >> .env.development
fi

# 4. Démarrer le projet en mode développement rapide
echo -e "${BLUE}Étape 4/4: Démarrage du projet en mode rapide${NC}"
echo -e "${GREEN}Démarrage de Next.js en mode rapide (première compilation optimisée)${NC}"

# Utilisez Bun pour exécuter Next.js avec les optimisations de première compilation
export NEXT_RUNTIME="edge"
export NEXT_TELEMETRY_DISABLED=1
export NEXT_DISABLE_SOURCEMAPS=true
export NEXT_PRIVATE_PREBUNDLED_REACT=1
export DISABLE_ESLINT_PLUGIN=true

# Lancer avec les options optimisées pour la première compilation
echo -e "${YELLOW}Cette première compilation sera optimisée pour la vitesse. Les compilations suivantes utiliseront la configuration normale.${NC}"
NODE_OPTIONS="--max_old_space_size=4096" bun --bun next dev --turbo
