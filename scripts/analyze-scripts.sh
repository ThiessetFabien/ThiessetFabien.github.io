#!/bin/bash
# Script pour analyser les scripts existants, identifier les redondances
# et proposer des optimisations
# Usage: ./analyze-scripts.sh

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Fonction pour nettoyer en cas d'interruption
cleanup() {
  echo -e "\n${RED}Script interrompu${NC}"
  exit 1
}

# Gestion des interruptions
trap cleanup SIGINT SIGTERM

SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPTS_DIR/.." && pwd)"

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                 ANALYSE DES SCRIPTS                        ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Analyse des scripts dans le répertoire scripts/
echo -e "${YELLOW}${BOLD}Analyse du répertoire scripts/${NC}"
echo -e "${CYAN}=================================${NC}"

# Compte le nombre total de scripts
TOTAL_SCRIPTS=$(find "$SCRIPTS_DIR" -type f -name "*.sh" -o -name "*.js" | wc -l)
echo -e "${GREEN}Nombre total de scripts: ${BOLD}$TOTAL_SCRIPTS${NC}"

# Liste les scripts qui semblent obsolètes (non utilisés dans package.json)
echo -e "\n${YELLOW}${BOLD}Scripts potentiellement inutilisés:${NC}"
echo -e "${CYAN}=================================${NC}"

POTENTIAL_OBSOLETE=0
for script in $(find "$SCRIPTS_DIR" -type f -name "*.sh" -o -name "*.js"); do
  SCRIPT_NAME=$(basename "$script")
  
  # Ignore certains scripts utilitaires courants
  if [[ "$SCRIPT_NAME" == "run" || "$SCRIPT_NAME" == "run-script.sh" || "$SCRIPT_NAME" == "analyze-scripts.sh" ]]; then
    continue
  fi
  
  # Vérifie si le script est utilisé dans package.json
  if ! grep -q "$SCRIPT_NAME" "$REPO_ROOT/package.json"; then
    echo -e "- ${RED}$SCRIPT_NAME${NC}"
    ((POTENTIAL_OBSOLETE++))
  fi
done

if [ $POTENTIAL_OBSOLETE -eq 0 ]; then
  echo -e "${GREEN}Aucun script inutilisé trouvé.${NC}"
fi

# Identifie les groupes de scripts similaires
echo -e "\n${YELLOW}${BOLD}Groupes de scripts à fonctionnalités similaires:${NC}"
echo -e "${CYAN}=============================================${NC}"

# Groupe: Scripts de développement
echo -e "${BOLD}Groupe de développement:${NC}"
find "$SCRIPTS_DIR" -type f -name "*dev*.sh" | sed 's|.*/||' | sort

# Groupe: Scripts de build
echo -e "\n${BOLD}Groupe de build:${NC}"
find "$SCRIPTS_DIR" -type f -name "*build*.sh" | sed 's|.*/||' | sort

# Groupe: Scripts de correction
echo -e "\n${BOLD}Groupe de correction:${NC}"
find "$SCRIPTS_DIR" -type f -name "*fix*.sh" | sed 's|.*/||' | sort

# Groupe: Scripts d'optimisation
echo -e "\n${BOLD}Groupe d'optimisation:${NC}"
find "$SCRIPTS_DIR" -type f -name "*optimize*.sh" -o -name "*cache*.sh" | sed 's|.*/||' | sort

# Groupe: Scripts de vérification
echo -e "\n${BOLD}Groupe de vérification:${NC}"
find "$SCRIPTS_DIR" -type f -name "*check*.sh" | sed 's|.*/||' | sort

# Analyse des scripts dans package.json
echo -e "\n${YELLOW}${BOLD}Analyse des scripts dans package.json:${NC}"
echo -e "${CYAN}====================================${NC}"

# Extrait et compte les scripts par catégorie
DEV_SCRIPTS=$(grep -c "\"dev" "$REPO_ROOT/package.json")
BUILD_SCRIPTS=$(grep -c "\"build" "$REPO_ROOT/package.json")
CLEAN_SCRIPTS=$(grep -c "\"clean" "$REPO_ROOT/package.json")
FIX_SCRIPTS=$(grep -c "\"fix" "$REPO_ROOT/package.json")
OPTIMIZE_SCRIPTS=$(grep -c "\"optimize" "$REPO_ROOT/package.json")

echo -e "${GREEN}Scripts de développement: ${BOLD}$DEV_SCRIPTS${NC}"
echo -e "${GREEN}Scripts de build: ${BOLD}$BUILD_SCRIPTS${NC}"
echo -e "${GREEN}Scripts de nettoyage: ${BOLD}$CLEAN_SCRIPTS${NC}"
echo -e "${GREEN}Scripts de correction: ${BOLD}$FIX_SCRIPTS${NC}"
echo -e "${GREEN}Scripts d'optimisation: ${BOLD}$OPTIMIZE_SCRIPTS${NC}"

# Recommandations pour l'optimisation
echo -e "\n${YELLOW}${BOLD}Recommandations pour l'optimisation:${NC}"
echo -e "${CYAN}=====================================${NC}"

echo -e "1. ${GREEN}Fusionner les scripts de développement${NC} en utilisant des paramètres (dev.sh)"
echo -e "2. ${GREEN}Uniformiser les scripts de build${NC} avec build-unified.sh"
echo -e "3. ${GREEN}Grouper les scripts fix:*${NC} dans un script fix.sh paramétrable"
echo -e "4. ${GREEN}Centraliser les scripts d'optimisation${NC} dans optimize.sh"
echo -e "5. ${GREEN}Rassembler les vérifications${NC} dans check.sh"
echo -e "6. ${GREEN}Mettre à jour la documentation${NC} dans scripts/README.md"

# Recommandations spécifiques pour scripts à fusionner
if [ $(find "$SCRIPTS_DIR" -type f -name "*dev*.sh" | wc -l) -gt 3 ]; then
  echo -e "\n${BOLD}Scripts de développement à fusionner:${NC}"
  find "$SCRIPTS_DIR" -type f -name "*dev*.sh" | sed 's|.*/||' | sort
fi

if [ $(find "$SCRIPTS_DIR" -type f -name "*build*.sh" | wc -l) -gt 2 ]; then
  echo -e "\n${BOLD}Scripts de build à fusionner:${NC}"
  find "$SCRIPTS_DIR" -type f -name "*build*.sh" | sed 's|.*/||' | sort
fi

if [ $(find "$SCRIPTS_DIR" -type f -name "*fix*.sh" | wc -l) -gt 3 ]; then
  echo -e "\n${BOLD}Scripts de correction à fusionner:${NC}"
  find "$SCRIPTS_DIR" -type f -name "*fix*.sh" | sed 's|.*/||' | sort
fi

echo -e "\n${GREEN}${BOLD}Analyse terminée !${NC}"
echo -e "${YELLOW}Pour une analyse complète des scripts, consultez la documentation dans scripts/README.md${NC}"
