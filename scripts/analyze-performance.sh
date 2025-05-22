#!/bin/bash

# Couleurs pour la console
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                 ANALYSE DES PERFORMANCES                   ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Créer un dossier pour les rapports
mkdir -p ./reports/performance

# Date pour le nom de fichier
DATE=$(date +"%Y%m%d-%H%M%S")
REPORT_FILE="./reports/performance/performance-${DATE}.txt"

# Vider le cache pour mesurer la première compilation
echo -e "${YELLOW}[Préparation]${NC} Nettoyage du cache pour mesurer précisément la performance de première compilation..."
rm -rf .next/cache 2>/dev/null || true
bun pm cache rm 2>/dev/null || true

# Mesurer la performance de compilation initiale
echo -e "${YELLOW}[1/5]${NC} Mesure du temps de première compilation..."
echo "# RAPPORT DE PERFORMANCE - $(date)" > "$REPORT_FILE"
echo "## Première compilation" >> "$REPORT_FILE"

# Mesurer le temps de compilation sans optimisation
echo -e "${BLUE}Test 1: Compilation standard${NC}"
{
  START_TIME=$(date +%s%3N)
  NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS="--max-old-space-size=4096" bun --bun next build --no-lint 2>&1 | grep -i "compiled successfully" || true
  END_TIME=$(date +%s%3N)
  STANDARD_TIME=$((END_TIME - START_TIME))
  echo -e "${GREEN}→ Temps écoulé: ${BOLD}$((STANDARD_TIME / 1000)).$((STANDARD_TIME % 1000))s${NC}"
  echo "### Compilation standard" >> "$REPORT_FILE"
  echo "- Temps: $((STANDARD_TIME / 1000)).$((STANDARD_TIME % 1000))s" >> "$REPORT_FILE"
} || {
  echo -e "${RED}✗ Erreur lors de la compilation standard${NC}"
  echo "- Erreur lors de la compilation standard" >> "$REPORT_FILE"
}

# Nettoyer pour le test optimisé
rm -rf .next 2>/dev/null || true

# Mesurer le temps avec optimisations
echo -e "\n${BLUE}Test 2: Compilation optimisée${NC}"
{
  # Préchauffer le cache
  ./scripts/preheat-cache.sh > /dev/null 2>&1
  
  # Activer les optimisations
  export OPTIMIZE_FIRST_COMPILATION=true
  
  START_TIME=$(date +%s%3N)
  NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS="--max-old-space-size=4096" bun --bun next build --no-lint 2>&1 | grep -i "compiled successfully" || true
  END_TIME=$(date +%s%3N)
  OPTIMIZED_TIME=$((END_TIME - START_TIME))
  echo -e "${GREEN}→ Temps écoulé: ${BOLD}$((OPTIMIZED_TIME / 1000)).$((OPTIMIZED_TIME % 1000))s${NC}"
  echo "### Compilation optimisée" >> "$REPORT_FILE"
  echo "- Temps: $((OPTIMIZED_TIME / 1000)).$((OPTIMIZED_TIME % 1000))s" >> "$REPORT_FILE"
  
  # Désactiver les optimisations
  export OPTIMIZE_FIRST_COMPILATION=false
} || {
  echo -e "${RED}✗ Erreur lors de la compilation optimisée${NC}"
  echo "- Erreur lors de la compilation optimisée" >> "$REPORT_FILE"
}

# Calculer l'amélioration
if [[ $STANDARD_TIME -gt 0 && $OPTIMIZED_TIME -gt 0 ]]; then
  IMPROVEMENT=$(( (STANDARD_TIME - OPTIMIZED_TIME) * 100 / STANDARD_TIME ))
  echo -e "\n${GREEN}${BOLD}↓ Amélioration: ${IMPROVEMENT}% plus rapide${NC}"
  echo "### Amélioration" >> "$REPORT_FILE"
  echo "- ${IMPROVEMENT}% plus rapide" >> "$REPORT_FILE"
fi

# Analyser la taille du bundle
echo -e "\n${YELLOW}[2/5]${NC} Analyse de la taille du build..."
if [ -d ".next" ]; then
  TOTAL_SIZE=$(du -sh .next | cut -f1)
  echo -e "${GREEN}→ Taille totale du build: ${BOLD}${TOTAL_SIZE}${NC}"
  echo "## Taille du build" >> "$REPORT_FILE"
  echo "- Taille totale: ${TOTAL_SIZE}" >> "$REPORT_FILE"
  
  # Analyser les sous-dossiers
  echo -e "\n${BLUE}Taille des sous-dossiers principaux:${NC}"
  du -sh .next/* | sort -hr >> "$REPORT_FILE"
  du -sh .next/* | sort -hr
  
  # Vérifier la taille du cache
  if [ -d ".next/cache" ]; then
    CACHE_SIZE=$(du -sh .next/cache | cut -f1)
    echo -e "\n${BLUE}Taille du cache: ${BOLD}${CACHE_SIZE}${NC}"
    echo "- Taille du cache: ${CACHE_SIZE}" >> "$REPORT_FILE"
  fi
fi

# Analyser les modules importés
echo -e "\n${YELLOW}[3/5]${NC} Analyse des modules importés..."
if command -v bunx &> /dev/null; then
  echo "## Analyse des modules" >> "$REPORT_FILE"
  bunx madge --summary ./src/app/page.tsx >> "$REPORT_FILE" 2>/dev/null || echo "- Outil 'madge' non disponible" >> "$REPORT_FILE"
  echo -e "${GREEN}✓ Analyse des modules terminée${NC}"
fi

# Vérifier les images et leur taille
echo -e "\n${YELLOW}[4/5]${NC} Analyse des images..."
IMAGE_COUNT=$(find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.gif" \) | wc -l)
IMAGE_SIZE=$(du -sh public/images 2>/dev/null | cut -f1 || echo "N/A")

echo -e "${GREEN}→ Nombre d'images: ${BOLD}${IMAGE_COUNT}${NC}"
echo -e "${GREEN}→ Taille totale des images: ${BOLD}${IMAGE_SIZE}${NC}"
echo "## Images" >> "$REPORT_FILE"
echo "- Nombre d'images: ${IMAGE_COUNT}" >> "$REPORT_FILE"
echo "- Taille totale des images: ${IMAGE_SIZE}" >> "$REPORT_FILE"

# Vérifier les gros fichiers
echo -e "\n${BLUE}Top 5 des plus grosses images:${NC}"
find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.gif" \) -exec du -sh {} \; | sort -hr | head -n 5 | tee -a "$REPORT_FILE"

# Vérifier les dépendances
echo -e "\n${YELLOW}[5/5]${NC} Analyse des dépendances du projet..."
echo "## Dépendances" >> "$REPORT_FILE"
NODE_MODULES_SIZE=$(du -sh node_modules 2>/dev/null | cut -f1 || echo "N/A")
DEP_COUNT=$(grep -o '"dependencies":' package.json | wc -l)
DEV_DEP_COUNT=$(grep -o '"devDependencies":' package.json | wc -l)

echo -e "${GREEN}→ Taille des node_modules: ${BOLD}${NODE_MODULES_SIZE}${NC}"
echo -e "${GREEN}→ Nombre de dépendances: ${BOLD}$((DEP_COUNT + DEV_DEP_COUNT))${NC}"
echo "- Taille des node_modules: ${NODE_MODULES_SIZE}" >> "$REPORT_FILE"
echo "- Nombre de dépendances: $((DEP_COUNT + DEV_DEP_COUNT))" >> "$REPORT_FILE"

bun pm ls --prod --depth=0 | grep -v "Packages" | sed 's/^/- /' >> "$REPORT_FILE"
echo -e "${GREEN}✓ Analyse des dépendances terminée${NC}"

# Recommandations finales
echo -e "\n${BLUE}${BOLD}RECOMMANDATIONS POUR AMÉLIORER LES PERFORMANCES:${NC}"
echo "## Recommandations pour optimiser la première compilation" >> "$REPORT_FILE"
echo -e "${YELLOW}1. Utilisez le script de préchauffage${NC} avant la compilation avec 'bun run preheat-cache'"
echo -e "${YELLOW}2. Chargez dynamiquement les composants${NC} non critiques avec 'lazyLoadComponent'"
echo -e "${YELLOW}3. Optimisez les images${NC} avec 'optimizedImageLoader'"
echo -e "${YELLOW}4. Utilisez le script fast-first-compile${NC} pour un démarrage rapide"
echo -e "${YELLOW}5. Envisagez Turbo mode${NC} avec 'next dev --turbo'"

echo "1. Utilisez le script de préchauffage du cache avant la compilation" >> "$REPORT_FILE"
echo "2. Chargez dynamiquement les composants non critiques" >> "$REPORT_FILE"
echo "3. Optimisez le chargement des images avec la fonction optimizedImageLoader" >> "$REPORT_FILE"
echo "4. Utilisez le script fast-first-compile.sh pour un démarrage rapide" >> "$REPORT_FILE"
echo "5. Envisagez l'utilisation du mode turbo avec --turbo" >> "$REPORT_FILE"

echo -e "${GREEN}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             ANALYSE DES PERFORMANCES TERMINÉE              ║
╚════════════════════════════════════════════════════════════╝
${NC}"
echo -e "Rapport complet enregistré dans: ${BOLD}${REPORT_FILE}${NC}\n"
