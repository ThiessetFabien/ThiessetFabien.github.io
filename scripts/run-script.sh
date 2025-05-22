#!/bin/bash

# Script pour exécuter n'importe quel script NPM avec le bon gestionnaire de paquets
# Auteur: GitHub Copilot

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Vérifier si un argument a été fourni
if [ $# -eq 0 ]; then
  echo -e "${RED}Erreur : Aucun script spécifié${NC}"
  echo -e "${YELLOW}Usage : $0 <nom-du-script> [arguments]${NC}"
  echo -e "${YELLOW}Exemple : $0 dev${NC}"
  exit 1
fi

SCRIPT_NAME=$1
shift # Enlever le premier argument

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                EXÉCUTEUR DE SCRIPT UNIVERSEL               ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}Tentative d'exécution du script : ${BOLD}$SCRIPT_NAME${NC}"

# Vérifier les gestionnaires de paquets disponibles
if command -v bun &> /dev/null; then
  echo -e "${GREEN}✓ Utilisation de Bun${NC}"
  bun run $SCRIPT_NAME "$@"
elif command -v pnpm &> /dev/null; then
  echo -e "${YELLOW}✓ Utilisation de PNPM (Bun non disponible)${NC}"
  pnpm run $SCRIPT_NAME "$@"
elif command -v yarn &> /dev/null; then
  echo -e "${YELLOW}✓ Utilisation de Yarn (Bun et PNPM non disponibles)${NC}"
  yarn run $SCRIPT_NAME "$@"
elif command -v npm &> /dev/null; then
  echo -e "${YELLOW}✓ Utilisation de NPM (Bun, PNPM et Yarn non disponibles)${NC}"
  npm run $SCRIPT_NAME "$@"
else
  echo -e "${RED}Erreur : Aucun gestionnaire de paquets trouvé.${NC}"
  echo -e "${YELLOW}Veuillez installer l'un des suivants : Bun, PNPM, Yarn ou NPM.${NC}"
  exit 1
fi

# Capturer le code de sortie
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "\n${GREEN}${BOLD}✅ Script exécuté avec succès !${NC}"
else
  echo -e "\n${RED}${BOLD}❌ Échec de l'exécution du script (code d'erreur : $EXIT_CODE)${NC}"
  echo -e "${YELLOW}Pour plus d'informations, consultez les logs ci-dessus.${NC}"
fi

exit $EXIT_CODE
