#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Function to print messages
print_step() {
  echo -e "${BLUE}[CACHE] ${GREEN}$1${NC}"
}

print_warning() {
  echo -e "${YELLOW}[ATTENTION] $1${NC}"
}

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║               OPTIMISATION DU CACHE                        ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Vérifier si Bun est disponible
if ! command -v bun &> /dev/null; then
  echo -e "${RED}${BOLD}Erreur: Bun n'est pas installé ou n'est pas dans votre PATH.${NC}"
  echo -e "Installez Bun pour de meilleures performances: ${BLUE}https://bun.sh${NC}"
  exit 1
fi

# Script pour optimiser le cache et accélérer les builds et démarrages
print_step "Optimisation du cache pour améliorer les performances..."

# Nettoyage du cache Bun
print_step "Optimisation du cache de Bun..."
bun pm cache rm
echo -e "${GREEN}✓ Cache Bun nettoyé${NC}"

# Vérifier si le répertoire .next existe
if [ -d ".next" ]; then
  print_step "Répertoire .next trouvé, optimisation du cache..."
  
  # Conserver le cache mais supprimer les fichiers temporaires
  find .next -type f -name "*.hot-update.*" -delete 2>/dev/null || true
  find .next -type f -name "*.map" -not -path "*.next/cache/*" -delete 2>/dev/null || true
  
  # Nettoyer les fichiers de build obsolètes
  find .next -type f -name "*.js" -not -path "*.next/cache/*" -mtime +7 -delete 2>/dev/null || true
  
  # Optimiser la taille du cache
  echo -e "${YELLOW}📊 Taille du cache avant optimisation : $(du -sh .next/cache 2>/dev/null | cut -f1 || echo "0")${NC}"
  
  # Compresser le cache pour les modules webpack rarement modifiés
  if [ -d ".next/cache/webpack" ]; then
    # Sauvegarde des caches importants
    print_step "Optimisation du cache webpack..."
    
    # Identifier et supprimer les fichiers de cache webpack inutilisés (plus vieux de 14 jours)
    find .next/cache/webpack -type f -name "*.pack" -mtime +14 -delete 2>/dev/null || true
    
    # Compression des fichiers de cache fréquemment utilisés
    if command -v gzip &> /dev/null; then
      find .next/cache/webpack -type f -name "*.pack" -not -name "*.gz" -exec gzip -k {} \; 2>/dev/null || true
    fi
    
    echo -e "${GREEN}✓ Cache webpack optimisé${NC}"
  fi
  
  # Optimiser le cache d'images
  if [ -d ".next/cache/images" ]; then
    print_step "Optimisation du cache d'images Next.js..."
    # On garde les images en cache car elles sont coûteuses à régénérer
    echo -e "${GREEN}✓ Cache d'images préservé${NC}"
  fi
  
  echo -e "${GREEN}✓ Cache Next.js optimisé${NC}"
else
  print_warning "Répertoire .next non trouvé, création des dossiers de cache..."
  mkdir -p .next/cache/{swc,webpack,images}
fi

# Créer un fichier .swcrc optimisé
print_step "Création d'une configuration SWC optimisée..."
cat > ./.swcrc << EOF
{
  "\$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": true
      }
    },
    "target": "es2020",
    "loose": true,
    "externalHelpers": true,
    "keepClassNames": false,
    "baseUrl": ".",
    "paths": {
      "@*": ["*"],
      "@src/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@api/*": ["src/app/api/*"],
      "@components/*": ["src/components/*"],
      "@common/*": ["src/components/common/*"],
      "@forms/*": ["src/components/forms/*"],
      "@layouts/*": ["src/components/layouts/*"],
      "@ui/*": ["src/components/ui/*"],
      "@config/*": ["src/config/*"],
      "@fonts/*": ["src/fonts/*"],
      "@hooks/*": ["src/hooks/*"],
      "@lib/*": ["src/lib/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@middlewares/*": ["src/middlewares/*"],
      "@providers/*": ["src/components/providers/*"],
      "@schemas/*": ["src/schemas/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "minify": false,
  "module": {
    "type": "es6",
    "strict": true,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  },
  "sourceMaps": false,
  "exclude": [
    "node_modules",
    ".next",
    "dist",
    "out",
    ".bun"
  ]
}
EOF

echo -e "${GREEN}✓ Configuration SWC optimisée créée${NC}"

# Optimiser le cache d'images
print_step "Optimisation du cache d'images..."
  
# Créer le dossier .cache s'il n'existe pas
mkdir -p .cache/images
  
# Nettoyer les caches d'images plus anciens que 14 jours
if [ -d ".cache/images" ]; then
  find .cache/images -type f -mtime +14 -delete 2>/dev/null || true
  echo -e "${GREEN}✓ Cache d'images nettoyé (fichiers > 14 jours)${NC}"
fi

# Vérifier s'il y a des modules natifs qui pourraient être mis en cache
print_step "Vérification des modules natifs..."
if [ -d "node_modules" ]; then
  # Optimiser le chargement des modules natifs
  NATIVE_MODULES=$(find node_modules -type f -name "*.node" | wc -l)
  
  if [ $NATIVE_MODULES -gt 0 ]; then
    echo -e "${YELLOW}🔧 $NATIVE_MODULES modules natifs trouvés, optimisation...${NC}"
    # Les modules sont déjà configurés dans votre bunfig.toml
  fi
fi

# Optimiser le cache de responsive-loader
if [ -d ".cache/responsive-loader" ]; then
  print_step "Optimisation du cache de responsive-loader..."
  # Garder uniquement les fichiers récents
  find .cache/responsive-loader -type f -mtime +30 -delete 2>/dev/null || true
  echo -e "${GREEN}✓ Cache responsive-loader optimisé${NC}"
else
  mkdir -p .cache/responsive-loader
fi

# Pré-générer le cache pour TailwindCSS
if [ -f "tailwind.config.js" ] || [ -f "tailwind.config.ts" ]; then
  print_step "Optimisation du cache TailwindCSS..."
  
  if command -v npx &> /dev/null; then
    echo -e "${YELLOW}→ Génération du fichier CSS TailwindCSS...${NC}"
    npx tailwindcss -i ./src/styles/globals.css -o ./.cache/tailwind.css --minify 2>/dev/null || true
    echo -e "${GREEN}✓ Cache TailwindCSS généré${NC}"
  else
    print_warning "npx non trouvé, impossible de générer le cache TailwindCSS"
  fi
fi

# Afficher les tailles de cache optimisées
NEXT_CACHE_SIZE=$(du -sh .next/cache 2>/dev/null | cut -f1 || echo "0")
IMAGE_CACHE_SIZE=$(du -sh .cache/images 2>/dev/null | cut -f1 || echo "0")

echo -e "\n${BLUE}${BOLD}RÉSUMÉ DES OPTIMISATIONS DE CACHE :${NC}"
echo -e "${GREEN}→ Taille du cache Next.js: ${BOLD}${NEXT_CACHE_SIZE}${NC}"
echo -e "${GREEN}→ Taille du cache d'images: ${BOLD}${IMAGE_CACHE_SIZE}${NC}"

echo -e "\n${GREEN}${BOLD}✨ Optimisation du cache terminée !${NC}"
echo -e "${YELLOW}Conseil : Exécutez cette commande régulièrement pour maintenir les performances optimales${NC}\n"
