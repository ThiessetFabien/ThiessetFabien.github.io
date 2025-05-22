#!/bin/bash
# Script pour générer un nouveau fichier de verrouillage Bun

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║        GÉNÉRATION DU FICHIER DE VERROUILLAGE BUN          ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Vérifier si bun est installé
if ! command -v bun &> /dev/null; then
    echo -e "${RED}Erreur: Bun n'est pas installé ou n'est pas accessible.${NC}"
    echo -e "${YELLOW}Installez Bun avec la commande: curl -fsSL https://bun.sh/install | bash${NC}"
    echo -e "${YELLOW}Ou exécutez: bun run install:bun${NC}"
    exit 1
fi

# Vérifier si le fichier bun.lockb existe déjà
if [ -f "bun.lockb" ]; then
    echo -e "${YELLOW}Le fichier bun.lockb existe déjà.${NC}"
    echo -e "${YELLOW}Voulez-vous le régénérer? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo -e "${BLUE}Suppression de l'ancien fichier de verrouillage...${NC}"
        rm bun.lockb
    else
        echo -e "${GREEN}Opération annulée.${NC}"
        exit 0
    fi
fi

# Vérifier si le fichier bun.lock existe (ancien format)
if [ -f "bun.lock" ]; then
    echo -e "${YELLOW}Un fichier bun.lock (format JSON) a été détecté.${NC}"
    echo -e "${YELLOW}Bun utilise maintenant un format binaire pour ses fichiers de verrouillage.${NC}"
    echo -e "${YELLOW}Voulez-vous supprimer ce fichier et créer un bun.lockb à la place? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo -e "${BLUE}Suppression de l'ancien fichier de verrouillage JSON...${NC}"
        rm bun.lock
    else
        echo -e "${YELLOW}Le fichier bun.lock sera conservé, mais nous allons quand même générer bun.lockb.${NC}"
    fi
fi

echo -e "${BLUE}Génération du fichier de verrouillage Bun au format binaire...${NC}"

# On force la création d'un lockfile au format binaire
export BUN_LOCKFILE_BINARY=1
# Générer un nouveau fichier de verrouillage
bun install

if [ -f "bun.lockb" ]; then
    echo -e "${GREEN}${BOLD}✅ Fichier de verrouillage Bun (bun.lockb) généré avec succès !${NC}"
else
    echo -e "${RED}${BOLD}❌ Échec de la génération du fichier de verrouillage Bun.${NC}"
    echo -e "${YELLOW}Essayez de résoudre les problèmes de dépendances et réessayez.${NC}"
    exit 1
fi

echo -e "${GREEN}Opération terminée.${NC}"
