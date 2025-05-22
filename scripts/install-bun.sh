#!/bin/bash

# Script pour installer Bun de manière robuste

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             INSTALLATION DE BUN RUNTIME                    ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Vérifier si Bun est déjà installé
if command -v bun &> /dev/null; then
    BUN_VERSION=$(bun --version)
    echo -e "${GREEN}Bun est déjà installé (version $BUN_VERSION)${NC}"
    
    # Vérifier si une mise à jour est disponible
    echo -e "${BLUE}Vérification des mises à jour...${NC}"
    if command -v bunx &> /dev/null; then
        LATEST_VERSION=$(curl -s https://api.github.com/repos/oven-sh/bun/releases/latest | grep -o '"tag_name": "[^"]*' | sed 's/"tag_name": "//g')
        if [ "$BUN_VERSION" != "$LATEST_VERSION" ]; then
            echo -e "${YELLOW}Une nouvelle version de Bun est disponible : $LATEST_VERSION (version actuelle : $BUN_VERSION)${NC}"
            echo -e "${YELLOW}Voulez-vous mettre à jour Bun ? (o/n)${NC}"
            read -r response
            if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
                echo -e "${BLUE}Mise à jour de Bun...${NC}"
                curl -fsSL https://bun.sh/install | bash
                echo -e "${GREEN}Bun a été mis à jour avec succès !${NC}"
            else
                echo -e "${YELLOW}Mise à jour ignorée.${NC}"
            fi
        else
            echo -e "${GREEN}Vous utilisez déjà la dernière version de Bun !${NC}"
        fi
    else
        echo -e "${YELLOW}Impossible de vérifier les mises à jour (bunx non disponible)${NC}"
    fi
    
    exit 0
fi

# Bun n'est pas installé, vérifier les prérequis
echo -e "${YELLOW}Bun n'est pas installé. Vérification des prérequis...${NC}"

# Vérifier curl
if ! command -v curl &> /dev/null; then
    echo -e "${RED}curl n'est pas installé ! Il est nécessaire pour installer Bun.${NC}"
    echo -e "${YELLOW}Voulez-vous l'installer automatiquement ? (o/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
        if command -v apt &> /dev/null; then
            sudo apt update && sudo apt install -y curl
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y curl
        elif command -v pacman &> /dev/null; then
            sudo pacman -S --noconfirm curl
        elif command -v zypper &> /dev/null; then
            sudo zypper install -y curl
        elif command -v brew &> /dev/null; then
            brew install curl
        else
            echo -e "${RED}Impossible d'installer curl automatiquement. Veuillez l'installer manuellement.${NC}"
            exit 1
        fi
    else
        echo -e "${RED}curl est nécessaire pour installer Bun. Installation annulée.${NC}"
        exit 1
    fi
fi

# Installer Bun
echo -e "${BLUE}Installation de Bun...${NC}"
echo -e "${YELLOW}IMPORTANT: Nous allons utiliser l'installateur officiel de Bun, qui sera installé dans votre répertoire personnel.${NC}"
echo -e "${YELLOW}Cette méthode évite les problèmes de permissions avec npm/sudo.${NC}"

# Créer un répertoire temporaire pour télécharger l'installateur
mkdir -p /tmp/bun-install

# Télécharger et exécuter l'installateur de Bun
curl -fsSL https://bun.sh/install | bash

# Vérifier si l'installation a réussi
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Bun a été installé avec succès !${NC}"
    echo -e "${YELLOW}Pour commencer à utiliser Bun, vous devrez redémarrer votre terminal ou exécuter :${NC}"
    echo -e "  ${BLUE}source ~/.bashrc${NC} (si vous utilisez bash)"
    echo -e "  ${BLUE}source ~/.zshrc${NC} (si vous utilisez zsh)"
    
    # Mise à jour automatique du PATH pour la session en cours
    if [ -f "$HOME/.bun/bin/bun" ]; then
        export PATH="$HOME/.bun/bin:$PATH"
        echo -e "${GREEN}Le PATH a été mis à jour pour la session en cours. Vous pouvez utiliser Bun dès maintenant !${NC}"
        echo -e "${YELLOW}Bun a été installé dans : $HOME/.bun/bin/bun${NC}"
    fi
    
    # Afficher un message de réussite
    echo -e "${GREEN}${BOLD}Installation terminée avec succès !${NC}"
    echo -e "${YELLOW}Vous pouvez maintenant exécuter 'bun --help' pour voir les commandes disponibles.${NC}"
else
    echo -e "${RED}${BOLD}L'installation de Bun a échoué.${NC}"
    echo -e "${YELLOW}Veuillez visiter https://bun.sh pour des instructions d'installation manuelles.${NC}"
    exit 1
fi
