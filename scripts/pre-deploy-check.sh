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
║            VÉRIFICATION PRÉ-DÉPLOIEMENT NETLIFY            ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Vérifier les fichiers essentiels
echo -e "${YELLOW}[1/5]${NC} Vérification des fichiers de configuration..."

MISSING_FILES=0

# Liste des fichiers requis
REQUIRED_FILES=(
  "netlify.toml"
  "netlify/build.sh"
  "netlify/plugins/bun-installer.js"
  "next.config.js"
  "package.json"
  "bunfig.toml"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓ ${file}${NC}"
  else
    echo -e "${RED}✗ ${file} manquant${NC}"
    MISSING_FILES=$((MISSING_FILES+1))
  fi
done

if [ $MISSING_FILES -gt 0 ]; then
  echo -e "${RED}⚠️ ${MISSING_FILES} fichiers requis manquants${NC}"
else
  echo -e "${GREEN}✓ Tous les fichiers de configuration sont présents${NC}"
fi

# Vérifier les variables d'environnement
echo -e "\n${YELLOW}[2/5]${NC} Vérification des variables d'environnement..."

# Vérifier si le fichier .env.production existe
if [ -f ".env.production" ]; then
  echo -e "${GREEN}✓ .env.production trouvé${NC}"
  
  # Vérifier les variables essentielles
  ESSENTIAL_VARS=(
    "NEXT_PUBLIC_API_URL"
    "NODE_ENV"
  )
  
  MISSING_VARS=0
  
  for var in "${ESSENTIAL_VARS[@]}"; do
    if grep -q "$var=" .env.production; then
      echo -e "${GREEN}  ✓ ${var}${NC}"
    else
      echo -e "${YELLOW}  ⚠️ ${var} non défini${NC}"
      MISSING_VARS=$((MISSING_VARS+1))
    fi
  done
  
  if [ $MISSING_VARS -gt 0 ]; then
    echo -e "${YELLOW}⚠️ Certaines variables d'environnement recommandées ne sont pas définies${NC}"
  else
    echo -e "${GREEN}✓ Toutes les variables d'environnement essentielles sont définies${NC}"
  fi
else
  echo -e "${RED}✗ .env.production manquant${NC}"
  echo -e "${YELLOW}  → Créez un fichier .env.production avec les variables requises${NC}"
fi

# Vérifier la configuration Netlify
echo -e "\n${YELLOW}[3/5]${NC} Vérification de la configuration Netlify..."

if [ -f "netlify.toml" ]; then
  # Vérifier les paramètres essentiels
  if grep -q "\[build\]" netlify.toml && grep -q "command" netlify.toml; then
    echo -e "${GREEN}✓ Configuration de build Netlify correcte${NC}"
  else
    echo -e "${RED}✗ Configuration de build Netlify incorrecte ou manquante${NC}"
  fi
  
  # Vérifier les plugins
  if grep -q "\[\[plugins\]\]" netlify.toml; then
    echo -e "${GREEN}✓ Plugins Netlify configurés${NC}"
  else
    echo -e "${YELLOW}⚠️ Aucun plugin Netlify configuré${NC}"
  fi
else
  echo -e "${RED}✗ netlify.toml manquant${NC}"
fi

# Vérifier les optimisations
echo -e "\n${YELLOW}[4/5]${NC} Vérification des optimisations..."

# Vérifier si next.config.js contient des optimisations
if [ -f "next.config.js" ]; then
  if grep -q "optimizeCss: true" next.config.js; then
    echo -e "${GREEN}✓ Optimisation CSS activée${NC}"
  else
    echo -e "${YELLOW}⚠️ Optimisation CSS non activée${NC}"
  fi
  
  if grep -q "output:" next.config.js; then
    echo -e "${GREEN}✓ Configuration de sortie définie${NC}"
  else
    echo -e "${YELLOW}⚠️ Configuration de sortie non définie${NC}"
  fi
else
  echo -e "${RED}✗ next.config.js manquant${NC}"
fi

# Vérifier les scripts d'optimisation
if [ -f "scripts/optimize-images.js" ]; then
  echo -e "${GREEN}✓ Script d'optimisation d'images présent${NC}"
else
  echo -e "${YELLOW}⚠️ Script d'optimisation d'images manquant${NC}"
fi

if [ -f "scripts/optimize-cache.sh" ]; then
  echo -e "${GREEN}✓ Script d'optimisation de cache présent${NC}"
else
  echo -e "${YELLOW}⚠️ Script d'optimisation de cache manquant${NC}"
fi

# Vérifier les images
echo -e "\n${YELLOW}[5/5]${NC} Vérification des images..."

# Compter les images en formats modernes
WEBP_COUNT=$(find public -name "*.webp" | wc -l)
AVIF_COUNT=$(find public -name "*.avif" | wc -l)
LEGACY_COUNT=$(find public \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | wc -l)

echo -e "${GREEN}✓ ${WEBP_COUNT} images WebP${NC}"
echo -e "${GREEN}✓ ${AVIF_COUNT} images AVIF${NC}"
echo -e "${YELLOW}✓ ${LEGACY_COUNT} images anciennes (JPG/PNG)${NC}"

if [ $WEBP_COUNT -eq 0 ] && [ $LEGACY_COUNT -gt 0 ]; then
  echo -e "${YELLOW}⚠️ Aucune image WebP trouvée. Envisagez d'optimiser vos images avec 'bun run optimize-images'${NC}"
fi

# Résumé et recommandations
echo -e "\n${BLUE}${BOLD}RÉSUMÉ DE LA VÉRIFICATION PRÉ-DÉPLOIEMENT:${NC}"

if [ $MISSING_FILES -eq 0 ]; then
  echo -e "${GREEN}✓ Configuration: PRÊT${NC}"
else
  echo -e "${RED}✗ Configuration: NON PRÊT - Fichiers manquants${NC}"
fi

# Recommandations finales
echo -e "\n${YELLOW}${BOLD}RECOMMANDATIONS AVANT DÉPLOIEMENT:${NC}"
echo -e "1. Exécuter ${BOLD}bun run optimize-cache${NC} pour optimiser le cache"
echo -e "2. Exécuter ${BOLD}bun run optimize-images${NC} pour optimiser les images"
echo -e "3. Exécuter ${BOLD}bun run build:optimized${NC} pour un build optimal"
echo -e "4. Vérifier les variables d'environnement dans Netlify"

echo -e "\n${GREEN}${BOLD}Pour déployer:${NC} bun run deploy"
