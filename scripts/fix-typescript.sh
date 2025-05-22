#!/bin/bash

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             RÉPARATION DES ERREURS TYPESCRIPT              ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}Ce script va nettoyer les caches TypeScript qui peuvent causer des erreurs de parsing.${NC}"

# Supprimer le fichier tsbuildinfo
if [ -f "tsconfig.tsbuildinfo" ]; then
  echo -e "${BLUE}[1/4]${NC} Suppression du fichier tsconfig.tsbuildinfo..."
  rm -f tsconfig.tsbuildinfo
  echo -e "${GREEN}✓ Fichier tsconfig.tsbuildinfo supprimé${NC}"
else
  echo -e "${YELLOW}Fichier tsconfig.tsbuildinfo non trouvé${NC}"
fi

# Supprimer le cache TypeScript de Next.js
if [ -d ".next/cache/typescript" ]; then
  echo -e "${BLUE}[2/4]${NC} Suppression du cache TypeScript de Next.js..."
  rm -rf .next/cache/typescript
  echo -e "${GREEN}✓ Cache TypeScript supprimé${NC}"
else
  echo -e "${YELLOW}Dossier .next/cache/typescript non trouvé${NC}"
fi

# Nettoyer le répertoire des types générés de Bun
if [ -d "node_modules/.bun-types" ]; then
  echo -e "${BLUE}[3/5]${NC} Nettoyage des types générés par Bun..."
  rm -rf node_modules/.bun-types
  echo -e "${GREEN}✓ Types générés nettoyés${NC}"
else
  echo -e "${YELLOW}Dossier node_modules/.bun-types non trouvé${NC}"
fi

# Nettoyer le cache turbo
if [ -d ".turbo" ]; then
  echo -e "${BLUE}[4/5]${NC} Nettoyage du cache Turbopack..."
  rm -rf .turbo
  echo -e "${GREEN}✓ Cache Turbopack supprimé${NC}"
else
  echo -e "${YELLOW}Dossier .turbo non trouvé${NC}"
fi

# Régénérer les fichiers de types Next.js manquants
echo -e "${BLUE}[5/5]${NC} Vérification et régénération des fichiers de types Next.js manquants..."
mkdir -p .next/types
touch .next/types/cache-life.d.ts
echo "// Fichier de type généré automatiquement
export {};" > .next/types/cache-life.d.ts

# Vérifier également d'autres fichiers de types souvent manquants
touch .next/types/app.d.ts
echo "// Type d'application généré automatiquement
export {};" > .next/types/app.d.ts

echo -e "${GREEN}✓ Fichiers de types régénérés${NC}"

# Exécuter tsc pour régénérer les types
echo -e "${BLUE}[5/5]${NC} Régénération des types avec TypeScript..."
if command -v bun &> /dev/null; then
  bun tsc --noEmit
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Types régénérés avec succès${NC}"
  else
    echo -e "${RED}✗ Des erreurs de type ont été détectées, mais le cache a été nettoyé${NC}"
  fi
else
  echo -e "${RED}✗ Bun n'est pas installé, impossible de régénérer les types${NC}"
fi

echo -e "\n${GREEN}${BOLD}✅ Nettoyage terminé !${NC}"
echo -e "${YELLOW}Vous pouvez maintenant relancer le serveur de développement avec :${NC}"
echo -e "   ${BOLD}bun run dev:fast${NC}"
echo -e "ou ${BOLD}bun run dev:clean${NC} pour un démarrage avec cache nettoyé"
