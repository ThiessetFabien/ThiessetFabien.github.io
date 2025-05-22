#!/bin/zsh

# Script d'aide pour démarrer le projet sans Bun

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║            COMMENT UTILISER CE PROJET SANS BUN             ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}${BOLD}Gestionnaires de paquets disponibles sur votre système :${NC}"

# Vérifier la disponibilité des gestionnaires de paquets
if command -v bun &> /dev/null; then
  echo -e "  ${GREEN}✓${NC} Bun est installé"
  HAS_BUN=true
else
  echo -e "  ${RED}✗${NC} Bun n'est pas installé"
  HAS_BUN=false
fi

if command -v pnpm &> /dev/null; then
  echo -e "  ${GREEN}✓${NC} PNPM est installé"
  HAS_PNPM=true
else
  echo -e "  ${RED}✗${NC} PNPM n'est pas installé"
  HAS_PNPM=false
fi

if command -v yarn &> /dev/null; then
  echo -e "  ${GREEN}✓${NC} Yarn est installé"
  HAS_YARN=true
else
  echo -e "  ${RED}✗${NC} Yarn n'est pas installé"
  HAS_YARN=false
fi

if command -v npm &> /dev/null; then
  echo -e "  ${GREEN}✓${NC} NPM est installé"
  HAS_NPM=true
else
  echo -e "  ${RED}✗${NC} NPM n'est pas installé"
  HAS_NPM=false
fi

if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  echo -e "  ${GREEN}✓${NC} Node.js est installé (version $NODE_VERSION)"
  HAS_NODE=true
else
  echo -e "  ${RED}✗${NC} Node.js n'est pas installé"
  HAS_NODE=false
fi

echo -e "\n${YELLOW}${BOLD}Options pour démarrer le serveur de développement :${NC}"

echo -e "\n${BLUE}1. Utiliser le script universel (recommandé) :${NC}"
echo -e "   ${GREEN}./scripts/run dev${NC}"
echo -e "   Ce script détectera automatiquement le gestionnaire de paquets disponible."

if $HAS_NPM; then
  echo -e "\n${BLUE}2. Utiliser NPM directement :${NC}"
  echo -e "   ${GREEN}npm run dev:npm${NC} ou ${GREEN}npm run dev:node${NC}"
fi

if $HAS_YARN; then
  echo -e "\n${BLUE}3. Utiliser Yarn directement :${NC}"
  echo -e "   ${GREEN}yarn dev:npm${NC} ou ${GREEN}yarn dev:node${NC}"
fi

if $HAS_PNPM; then
  echo -e "\n${BLUE}4. Utiliser PNPM directement :${NC}"
  echo -e "   ${GREEN}pnpm dev:npm${NC} ou ${GREEN}pnpm dev:node${NC}"
fi

if $HAS_BUN; then
  echo -e "\n${BLUE}5. Utiliser Bun directement :${NC}"
  echo -e "   ${GREEN}bun run dev${NC} ou ${GREEN}bun run dev:fast${NC}"
fi

if ! $HAS_BUN; then
  echo -e "\n${YELLOW}${BOLD}Installation de Bun (optionnel) :${NC}"
  echo -e "Si vous souhaitez installer Bun, vous pouvez exécuter :"
  echo -e "   ${GREEN}./scripts/install-bun.sh${NC}"
  echo -e "ou directement :"
  echo -e "   ${GREEN}curl -fsSL https://bun.sh/install | bash${NC}"
  echo -e "Puis redémarrez votre terminal ou exécutez : ${GREEN}source ~/.zshrc${NC}"
fi

echo -e "\n${YELLOW}${BOLD}Nota bene :${NC}"
echo -e "Ce projet a été conçu pour fonctionner avec Bun, mais tous les scripts"
echo -e "et commandes ont des alternatives compatibles avec NPM/Node.js standard."
echo -e "Si vous rencontrez des problèmes, consultez : "
echo -e "  • ${BLUE}docs/migration-pnpm-to-bun.md${NC} - Pour comprendre la migration"
echo -e "  • ${BLUE}docs/troubleshooting.md${NC} - Pour résoudre les problèmes courants"

echo -e "\n${GREEN}${BOLD}Bonne programmation ! 🚀${NC}"
