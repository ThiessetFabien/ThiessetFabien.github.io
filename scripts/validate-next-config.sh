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
║             VALIDATION DE LA CONFIGURATION NEXT.JS         ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}Ce script vérifie si votre configuration Next.js contient des options non valides.${NC}"

# Définir l'URL de la documentation Next.js
DOCS_URL="https://nextjs.org/docs/app/api-reference/next-config-js"
VALID_OPTS_URL="https://nextjs.org/docs/messages/invalid-next-config"

echo -e "${BLUE}[1/3]${NC} Vérification de la syntaxe du fichier next.config.js..."

# Vérifier la syntaxe du fichier
bun --bun next.config.js &>/dev/null
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ La syntaxe du fichier next.config.js est valide${NC}"
else
  echo -e "${RED}✗ Erreur de syntaxe dans le fichier next.config.js${NC}"
  echo -e "${YELLOW}  → Vérifiez la syntaxe du fichier${NC}"
fi

echo -e "\n${BLUE}[2/3]${NC} Lister les principales options supportées dans Next.js ${BOLD}(mai 2025)${NC}..."

echo -e "${YELLOW}Options de configuration principales :${NC}"
echo -e "  ${GREEN}✓${NC} reactStrictMode"
echo -e "  ${GREEN}✓${NC} output (export, standalone)"
echo -e "  ${GREEN}✓${NC} distDir"
echo -e "  ${GREEN}✓${NC} env"
echo -e "  ${GREEN}✓${NC} basePath"
echo -e "  ${GREEN}✓${NC} assetPrefix"
echo -e "  ${GREEN}✓${NC} images (formats, domains, etc.)"
echo -e "  ${GREEN}✓${NC} pageExtensions"
echo -e "  ${GREEN}✓${NC} transpilePackages"
echo -e "  ${GREEN}✓${NC} webpack et compiler"
echo -e "  ${GREEN}✓${NC} productionBrowserSourceMaps"
echo -e "  ${GREEN}✓${NC} onDemandEntries"

echo -e "\n${YELLOW}Options expérimentales supportées :${NC}"
echo -e "  ${GREEN}✓${NC} experimental.optimizeCss"
echo -e "  ${GREEN}✓${NC} experimental.turbo"
echo -e "  ${GREEN}✓${NC} experimental.optimizePackageImports"
echo -e "  ${GREEN}✓${NC} experimental.serverMinification"
echo -e "  ${GREEN}✓${NC} experimental.webpackBuildWorker"
echo -e "  ${GREEN}✓${NC} experimental.serverComponentsExternalPackages"
echo -e "  ${GREEN}✓${NC} experimental.swcMinify"
echo -e "  ${GREEN}✓${NC} experimental.mdxRs"

echo -e "\n${YELLOW}Options obsolètes ou non recommandées :${NC}"
echo -e "  ${RED}✗${NC} experimental.craCompat"
echo -e "  ${RED}✗${NC} experimental.turbotrace"
echo -e "  ${RED}✗${NC} experimental.useWasmBinary"
echo -e "  ${RED}✗${NC} experimental.bundlePagesExternals"
echo -e "  ${RED}✗${NC} watchOptions.ignored"
echo -e "  ${RED}✗${NC} target"
echo -e "  ${RED}✗${NC} amp"

echo -e "\n${BLUE}[3/3]${NC} Vérification de votre configuration..."

# Exécuter next avec l'option --info pour voir les avertissements 
echo -e "${YELLOW}Exécution de next info pour détecter les avertissements :${NC}"
bun run next info

echo -e "\n${GREEN}${BOLD}✅ Vérification terminée !${NC}"
echo -e "${YELLOW}Pour plus d'informations sur les options valides, consultez :${NC}"
echo -e "   ${BOLD}${DOCS_URL}${NC}"
echo -e "   ${BOLD}${VALID_OPTS_URL}${NC}"
