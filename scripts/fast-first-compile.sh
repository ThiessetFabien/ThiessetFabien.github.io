#!/bin/bash

# Couleurs pour la console
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║         OPTIMISATION DE LA PREMIÈRE COMPILATION            ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Vérifier si bun est installé
if ! command -v bun &> /dev/null; then
  echo -e "${RED}${BOLD}Erreur: Bun n'est pas installé ou n'est pas dans votre PATH.${NC}"
  echo -e "Installez Bun pour de meilleures performances: ${BLUE}https://bun.sh${NC}"
  exit 1
fi

# Créer le dossier de rapports s'il n'existe pas
mkdir -p ./reports/performance

# 1. Nettoyage des caches existants
echo -e "${YELLOW}[1/5]${NC} Nettoyage des caches existants..."
rm -rf .next/cache 2>/dev/null || true
bun pm cache rm 2>/dev/null || true
echo -e "${GREEN}✓ Caches nettoyés${NC}"

# 2. Application des optimisations de configuration
echo -e "\n${YELLOW}[2/5]${NC} Application des optimisations de configuration..."

# Vérifier si esbuild est disponible
if ! bun x esbuild --version &> /dev/null; then
  echo -e "${YELLOW}→ Installation d'esbuild pour les optimisations...${NC}"
  bun add -d esbuild
fi

# Exécution du script d'optimisation du cache
bash ./scripts/optimize-cache.sh
echo -e "${GREEN}✓ Optimisations de configuration appliquées${NC}"

# 3. Préchauffage du cache
echo -e "\n${YELLOW}[3/5]${NC} Préchauffage du cache..."
bash ./scripts/preheat-cache.sh
echo -e "${GREEN}✓ Cache préchauffé${NC}"

# 4. Configuration des variables d'environnement pour optimisation
echo -e "\n${YELLOW}[4/5]${NC} Configuration des variables d'environnement..."
export NEXT_TELEMETRY_DISABLED=1
export OPTIMIZE_FIRST_COMPILATION=true
export NEXT_RUNTIME="edge"
export DISABLE_ESLINT_PLUGIN=true
export NEXT_DISABLE_SOURCEMAPS=true
export NODE_OPTIONS="--max_old_space_size=4096"
echo -e "${GREEN}✓ Variables d'environnement configurées${NC}"

# 5. Lancement du serveur de développement optimisé
echo -e "\n${YELLOW}[5/5]${NC} Démarrage en mode optimisé..."
echo -e "${BOLD}${BLUE}Le serveur de développement va démarrer avec optimisations de première compilation${NC}"
echo -e "${YELLOW}La première compilation sera optimisée pour la vitesse, les fonctionnalités complètes seront restaurées après.${NC}\n"

# Ajouter un délai pour permettre à l'utilisateur de lire les messages
sleep 2

START_TIME=$(date +%s%3N)
echo -e "${BLUE}→ Démarrage de la compilation à $(date +"%H:%M:%S")${NC}"

# Démarrer en mode turbo pour une compilation plus rapide
bun --bun next dev --turbo 

END_TIME=$(date +%s%3N)
COMPILE_TIME=$((END_TIME - START_TIME))
echo -e "\n${GREEN}→ Temps de première compilation: ${BOLD}$((COMPILE_TIME / 1000)).$((COMPILE_TIME % 1000))s${NC}"

# Enregistrer les métriques
METRICS_FILE="./reports/performance/first-compile-$(date +"%Y%m%d").txt"
echo "Compilation du $(date +"%Y-%m-%d %H:%M:%S"): $((COMPILE_TIME / 1000)).$((COMPILE_TIME % 1000))s" >> "$METRICS_FILE"

# Désactiver les optimisations
export OPTIMIZE_FIRST_COMPILATION=false
echo -e "\n${GREEN}${BOLD}✓ Optimisations de première compilation désactivées.${NC}"
echo -e "${BLUE}Les compilations suivantes auront un comportement normal.${NC}"
