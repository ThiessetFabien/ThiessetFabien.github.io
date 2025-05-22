#!/bin/bash

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Fonction pour l'affichage formaté
print_header() {
  echo -e "\n${BLUE}${BOLD}=== $1 ===${NC}\n"
}

print_status() {
  if [ "$2" = "ok" ]; then
    echo -e "${GREEN}✓ $1${NC}"
  elif [ "$2" = "warning" ]; then
    echo -e "${YELLOW}⚠️ $1${NC}"
  else
    echo -e "${RED}✗ $1${NC}"
  fi
}

# Titre
echo -e "${BOLD}📊 RAPPORT DE SANTÉ DU PROJET PORTFOLIO${NC}"
echo -e "${YELLOW}Analyse des performances et configurations actuelles${NC}"

# Vérifier la version de Bun
print_header "ENVIRONNEMENT"

if command -v bun &> /dev/null; then
  BUN_VERSION=$(bun --version)
  print_status "Bun v${BUN_VERSION}" "ok"
else
  print_status "Bun non trouvé, l'installation est requise" "error"
fi

NODE_VERSION=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
  print_status "Node.js ${NODE_VERSION}" "ok"
else
  print_status "Node.js non trouvé" "warning"
fi

# Fichiers de configuration
print_header "CONFIGURATION"

if [ -f "bunfig.toml" ]; then
  print_status "Configuration Bun (bunfig.toml)" "ok"
else
  print_status "Fichier bunfig.toml manquant" "error"
fi

if [ -f "next.config.js" ]; then
  print_status "Configuration Next.js" "ok"
else
  print_status "Configuration Next.js manquante" "error"
fi

if [ -f "netlify.toml" ]; then
  print_status "Configuration Netlify" "ok"
else
  print_status "Configuration Netlify manquante" "warning"
fi

# Structure du projet
print_header "STRUCTURE DU PROJET"

if [ -d "public" ]; then
  IMAGE_COUNT=$(find public -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" -o -name "*.jpeg" -o -name "*.gif" \) | wc -l)
  print_status "Dossier public/ avec ${IMAGE_COUNT} images" "ok"
else
  print_status "Dossier public/ manquant" "error"
fi

if [ -d "src" ]; then
  COMPONENT_COUNT=$(find src -type f -name "*.tsx" | wc -l)
  print_status "Dossier src/ avec ${COMPONENT_COUNT} composants" "ok"
else
  print_status "Dossier src/ manquant" "error"
fi

# Scripts d'optimisation
print_header "SCRIPTS D'OPTIMISATION"

if [ -f "scripts/optimize-cache.sh" ]; then
  print_status "Script d'optimisation de cache" "ok"
else
  print_status "Script d'optimisation de cache manquant" "warning"
fi

if [ -f "scripts/optimize-images.js" ]; then
  print_status "Script d'optimisation d'images" "ok"
else
  print_status "Script d'optimisation d'images manquant" "warning"
fi

if [ -f "scripts/generate-responsive-images.js" ]; then
  print_status "Script de génération d'images responsives" "ok"
else
  print_status "Script de génération d'images responsives manquant" "warning"
fi

# Caches et performance
print_header "CACHES ET PERFORMANCE"

if [ -d ".next/cache" ]; then
  CACHE_SIZE=$(du -sh .next/cache 2>/dev/null | cut -f1)
  print_status "Cache Next.js trouvé (${CACHE_SIZE})" "ok"
else
  print_status "Cache Next.js non initialisé" "warning"
fi

if [ -d ".cache" ]; then
  print_status "Dossier .cache présent" "ok"
else
  print_status "Dossier .cache manquant" "warning"
  mkdir -p .cache
  echo "   > Dossier .cache créé"
fi

# Dépendances et modules
print_header "DÉPENDANCES"

if [ -f "bun.lockb" ] || [ -f "bun.lock" ]; then
  DEPS_COUNT=$(grep -c "dependencies" package.json)
  DEV_DEPS_COUNT=$(grep -c "devDependencies" package.json)
  print_status "Fichier de verrouillage Bun trouvé avec ~${DEPS_COUNT} dépendances" "ok"
else
  print_status "Fichier de verrouillage Bun manquant" "warning"
fi

# Recommandations
print_header "RECOMMANDATIONS"

echo -e "${YELLOW}Pour optimiser les performances de votre projet :${NC}"
echo -e " ${BLUE}•${NC} Exécutez ${BOLD}bun run optimize-cache${NC} avant chaque session de développement"
echo -e " ${BLUE}•${NC} Utilisez ${BOLD}bun run build:optimized${NC} pour un build de production optimisé"
echo -e " ${BLUE}•${NC} Exécutez ${BOLD}bun run optimize-images${NC} après avoir ajouté de nouvelles images"
echo -e " ${BLUE}•${NC} Utilisez ${BOLD}bun run dev:fast${NC} pour un développement ultra-rapide"

echo -e "\n${GREEN}${BOLD}✨ Analyse terminée !${NC}"
