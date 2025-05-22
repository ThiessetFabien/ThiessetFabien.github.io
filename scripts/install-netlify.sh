#!/bin/zsh

# Script pour installer netlify-cli avec une gestion robuste des dépendances système
# Spécialement conçu pour résoudre les problèmes avec sharp et ses dépendances natives

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║            INSTALLATION DE NETLIFY CLI                     ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Fonction pour détecter la distribution Linux
detect_linux_distro() {
  if [ -f /etc/os-release ]; then
    . /etc/os-release
    echo $ID
  elif command -v lsb_release &> /dev/null; then
    lsb_release -si | tr '[:upper:]' '[:lower:]'
  else
    echo "unknown"
  fi
}

# Fonction pour installer les dépendances système pour sharp/libvips
install_system_deps() {
  local DISTRO=$(detect_linux_distro)
  echo -e "${BLUE}Distribution Linux détectée : $DISTRO${NC}"
  
  case $DISTRO in
    arch|manjaro|endeavouros)
      echo -e "${YELLOW}Installation des dépendances système pour Arch Linux...${NC}"
      sudo pacman -S --needed libvips gcc make pkgconf python
      ;;
    debian|ubuntu|linuxmint|pop)
      echo -e "${YELLOW}Installation des dépendances système pour Debian/Ubuntu...${NC}"
      sudo apt-get update && sudo apt-get install -y libvips-dev build-essential python3
      ;;
    fedora|centos|rhel)
      echo -e "${YELLOW}Installation des dépendances système pour Fedora/CentOS...${NC}"
      sudo dnf install -y vips-devel gcc gcc-c++ make python3
      ;;
    opensuse|suse)
      echo -e "${YELLOW}Installation des dépendances système pour OpenSUSE...${NC}"
      sudo zypper install -y libvips-devel gcc make python3
      ;;
    *)
      echo -e "${RED}Distribution non reconnue : $DISTRO${NC}"
      echo -e "${YELLOW}Vous devrez installer manuellement les dépendances pour votre distribution :${NC}"
      echo -e "${BLUE}- libvips (ou libvips-dev)${NC}"
      echo -e "${BLUE}- gcc et outils de compilation${NC}"
      echo -e "${BLUE}- python3${NC}"
      return 1
      ;;
  esac
  
  return $?
}

# Fonction pour détecter les gestionnaires de paquets disponibles
detect_package_manager() {
  if command -v bun &> /dev/null; then
    echo "bun"
    return
  fi
  
  if command -v pnpm &> /dev/null; then
    echo "pnpm"
    return
  fi
  
  if command -v yarn &> /dev/null; then
    echo "yarn"
    return
  fi
  
  if command -v npm &> /dev/null; then
    echo "npm"
    return
  fi
  
  echo "none"
}

# Détecter le gestionnaire de paquets
PACKAGE_MANAGER=$(detect_package_manager)

if [ "$PACKAGE_MANAGER" = "none" ]; then
  echo -e "${RED}Aucun gestionnaire de paquets trouvé. Impossible d'installer netlify-cli.${NC}"
  exit 1
fi

echo -e "${GREEN}Gestionnaire de paquets détecté : $PACKAGE_MANAGER${NC}"

# Vérifier si prebuild-install est présent
if ! command -v prebuild-install &> /dev/null; then
  echo -e "${YELLOW}prebuild-install n'est pas installé, il est nécessaire pour construire certains modules natifs${NC}"
  echo -e "${YELLOW}Installation de prebuild-install...${NC}"
  
  case $PACKAGE_MANAGER in
    bun)
      bun add -g prebuild-install
      ;;
    npm)
      npm install -g prebuild-install
      ;;
    pnpm)
      pnpm add -g prebuild-install
      ;;
    yarn)
      yarn global add prebuild-install
      ;;
  esac
fi

# Présenter les options d'installation
echo -e "${BLUE}Options d'installation de Netlify CLI :${NC}"
echo -e "${BLUE}1. Installer netlify-cli (standard)${NC}"
echo -e "${BLUE}2. Installer @netlify/cli (alternative qui peut avoir moins de problèmes)${NC}"
echo -e "${BLUE}3. Installer localement dans le projet${NC}"
echo -e "${BLUE}4. Installer les dépendances système d'abord, puis netlify-cli${NC}"
echo -e "${YELLOW}Quelle option choisir ? (1-4)${NC}"
read -r option

case $option in
  1)
    # Option 1: Installation standard
    echo -e "${YELLOW}Installation de netlify-cli...${NC}"
    case $PACKAGE_MANAGER in
      bun)
        bun add -g netlify-cli
        ;;
      npm)
        # Avec npm, essayer --unsafe-perm qui peut aider avec certains problèmes de compilation
        npm install -g netlify-cli --unsafe-perm=true
        ;;
      pnpm)
        pnpm add -g netlify-cli
        ;;
      yarn)
        yarn global add netlify-cli
        ;;
    esac
    ;;
  2)
    # Option 2: Alternative @netlify/cli
    echo -e "${YELLOW}Installation de @netlify/cli (alternative)...${NC}"
    case $PACKAGE_MANAGER in
      bun)
        bun add -g @netlify/cli
        ;;
      npm)
        npm install -g @netlify/cli
        ;;
      pnpm)
        pnpm add -g @netlify/cli
        ;;
      yarn)
        yarn global add @netlify/cli
        ;;
    esac
    ;;
  3)
    # Option 3: Installation locale dans le projet
    echo -e "${YELLOW}Installation de netlify-cli localement dans le projet...${NC}"
    case $PACKAGE_MANAGER in
      bun)
        bun add -d netlify-cli
        ;;
      npm)
        npm install --save-dev netlify-cli
        ;;
      pnpm)
        pnpm add -D netlify-cli
        ;;
      yarn)
        yarn add -D netlify-cli
        ;;
    esac
    
    # Ajouter un script au package.json
    if [ -f "package.json" ]; then
      echo -e "${YELLOW}Ajout d'un script 'netlify' dans package.json...${NC}"
      if command -v jq &> /dev/null; then
        # Utiliser jq si disponible
        jq '.scripts.netlify = "netlify"' package.json > package.json.tmp && mv package.json.tmp package.json
      else
        echo -e "${YELLOW}jq n'est pas installé, édition manuelle nécessaire.${NC}"
        echo -e "${YELLOW}Ajoutez la ligne suivante dans la section 'scripts' de package.json :${NC}"
        echo -e "${BLUE}  \"netlify\": \"netlify\"${NC}"
      fi
    fi
    
    echo -e "${GREEN}Netlify CLI installé localement. Vous pouvez l'utiliser avec :${NC}"
    echo -e "${BLUE}${PACKAGE_MANAGER} run netlify${NC}"
    echo -e "${BLUE}ou${NC}"
    echo -e "${BLUE}npx netlify${NC}"
    ;;
  4)
    # Option 4: Installer d'abord les dépendances système
    echo -e "${YELLOW}Installation des dépendances système d'abord...${NC}"
    install_system_deps
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Dépendances système installées avec succès.${NC}"
      echo -e "${YELLOW}Installation de netlify-cli...${NC}"
      
      case $PACKAGE_MANAGER in
        bun)
          bun add -g netlify-cli
          ;;
        npm)
          npm install -g netlify-cli
          ;;
        pnpm)
          pnpm add -g netlify-cli
          ;;
        yarn)
          yarn global add netlify-cli
          ;;
      esac
    else
      echo -e "${RED}Échec de l'installation des dépendances système.${NC}"
      echo -e "${YELLOW}Voulez-vous quand même essayer d'installer netlify-cli ? (o/n)${NC}"
      read -r response
      
      if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
        case $PACKAGE_MANAGER in
          bun)
            bun add -g netlify-cli
            ;;
          npm)
            npm install -g netlify-cli
            ;;
          pnpm)
            pnpm add -g netlify-cli
            ;;
          yarn)
            yarn global add netlify-cli
            ;;
        esac
      else
        echo -e "${YELLOW}Installation annulée.${NC}"
        exit 1
      fi
    fi
    ;;
  *)
    echo -e "${RED}Option invalide.${NC}"
    exit 1
    ;;
esac

# Vérifier si l'installation a réussi
if [ $? -eq 0 ]; then
  echo -e "${GREEN}${BOLD}Installation de Netlify CLI terminée avec succès !${NC}"
  
  # Vérifier que la commande est accessible
  if command -v netlify &> /dev/null; then
    NETLIFY_VERSION=$(netlify --version 2>/dev/null || echo "Version inconnue")
    echo -e "${GREEN}Netlify CLI version : $NETLIFY_VERSION${NC}"
  else
    echo -e "${YELLOW}La commande 'netlify' n'est pas accessible dans le PATH actuel.${NC}"
    echo -e "${YELLOW}Vous devrez peut-être redémarrer votre terminal ou ajouter le bon répertoire à votre PATH.${NC}"
    
    # Suggestions selon le gestionnaire de paquets
    case $PACKAGE_MANAGER in
      npm)
        echo -e "${YELLOW}Pour npm, ajoutez ceci à votre ~/.zshrc :${NC}"
        echo -e "${BLUE}export PATH=\"\$HOME/.npm-global/bin:\$PATH\"${NC}"
        ;;
      bun)
        echo -e "${YELLOW}Pour bun, ajoutez ceci à votre ~/.zshrc :${NC}"
        echo -e "${BLUE}export PATH=\"\$HOME/.bun/bin:\$PATH\"${NC}"
        ;;
      yarn)
        echo -e "${YELLOW}Pour yarn, vérifiez votre configuration ~/.yarnrc${NC}"
        ;;
    esac
  fi
  
  # Conseils d'utilisation
  echo -e "${YELLOW}Pour déployer votre projet sur Netlify :${NC}"
  
  if [ "$option" = "3" ]; then
    # Si installation locale
    echo -e "${BLUE}${PACKAGE_MANAGER} run netlify deploy${NC}"
    echo -e "${BLUE}ou${NC}"
    echo -e "${BLUE}npx netlify deploy${NC}"
  else
    # Si installation globale
    echo -e "${BLUE}netlify deploy${NC}"
  fi
else
  echo -e "${RED}${BOLD}Échec de l'installation de Netlify CLI.${NC}"
  echo -e "${YELLOW}Vous pouvez essayer les alternatives suivantes :${NC}"
  echo -e "${BLUE}1. Utiliser npx sans installation :${NC}"
  echo -e "${BLUE}   npx netlify-cli deploy${NC}"
  echo -e "${BLUE}2. Utiliser l'interface web de Netlify :${NC}"
  echo -e "${BLUE}   https://app.netlify.com${NC}"
  echo -e "${BLUE}3. Utiliser une autre méthode de déploiement comme GitHub Actions${NC}"
fi
