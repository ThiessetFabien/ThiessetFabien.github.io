#!/bin/zsh

# Script pour installer des dépendances globales avec détection du gestionnaire
# Installe des outils globaux comme dotenv-cli de manière compatible avec différents gestionnaires

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║         INSTALLATION DES DÉPENDANCES GLOBALES              ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Fonction pour vérifier et installer les dépendances système
check_system_dependencies() {
  echo -e "${BLUE}Vérification des dépendances système requises...${NC}"
  
  # Vérifier si nous sommes sur Linux
  if [[ "$(uname)" != "Linux" ]]; then
    echo -e "${YELLOW}Système non Linux détecté. La vérification automatique des dépendances système n'est pas prise en charge.${NC}"
    return 0
  fi
  
  # Identifier la distribution Linux
  if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO=$ID
  elif command -v lsb_release &> /dev/null; then
    DISTRO=$(lsb_release -si | tr '[:upper:]' '[:lower:]')
  else
    DISTRO="unknown"
  fi
  
  echo -e "${BLUE}Distribution Linux détectée : ${DISTRO}${NC}"
  
  # Liste des dépendances système requises pour sharp/libvips
  case $DISTRO in
    arch|manjaro|endeavouros)
      DEPS=("libvips" "gcc" "make" "pkgconf" "python")
      INSTALL_CMD="sudo pacman -S --needed"
      ;;
    debian|ubuntu|linuxmint|pop)
      DEPS=("libvips-dev" "build-essential" "python3")
      INSTALL_CMD="sudo apt-get update && sudo apt-get install -y"
      ;;
    fedora|centos|rhel)
      DEPS=("vips-devel" "gcc" "gcc-c++" "make" "python3")
      INSTALL_CMD="sudo dnf install -y"
      ;;
    opensuse|suse)
      DEPS=("libvips-devel" "gcc" "make" "python3")
      INSTALL_CMD="sudo zypper install -y"
      ;;
    *)
      echo -e "${YELLOW}Distribution non reconnue. Impossible de vérifier automatiquement les dépendances système.${NC}"
      echo -e "${YELLOW}Vous devrez installer manuellement libvips et les outils de compilation.${NC}"
      echo -e "${YELLOW}Par exemple : sudo apt-get install libvips-dev build-essential${NC}"
      return 0
      ;;
  esac
  
  # Vérifier et installer les dépendances manquantes
  MISSING_DEPS=()
  for dep in "${DEPS[@]}"; do
    if ! command -v $dep &> /dev/null && ! pacman -Q $dep &> /dev/null 2>/dev/null && ! dpkg -l | grep -q $dep 2>/dev/null && ! rpm -q $dep &> /dev/null 2>/dev/null; then
      MISSING_DEPS+=("$dep")
    fi
  done
  
  if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
    echo -e "${YELLOW}Dépendances système manquantes : ${MISSING_DEPS[*]}${NC}"
    echo -e "${YELLOW}Installation des dépendances système...${NC}"
    
    echo -e "${BLUE}Commande : $INSTALL_CMD ${MISSING_DEPS[*]}${NC}"
    echo -e "${YELLOW}Voulez-vous installer ces dépendances ? (o/n)${NC}"
    read -r response
    
    if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
      eval "$INSTALL_CMD ${MISSING_DEPS[*]}"
      if [ $? -eq 0 ]; then
        echo -e "${GREEN}Dépendances système installées avec succès${NC}"
      else
        echo -e "${RED}Échec de l'installation des dépendances système${NC}"
        echo -e "${YELLOW}Vous devrez peut-être les installer manuellement : $INSTALL_CMD ${MISSING_DEPS[*]}${NC}"
      fi
    else
      echo -e "${YELLOW}Installation des dépendances système ignorée. Certains paquets npm pourraient échouer à l'installation.${NC}"
    fi
  else
    echo -e "${GREEN}Toutes les dépendances système requises sont déjà installées${NC}"
  fi
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

# Liste des dépendances globales à installer
GLOBAL_DEPS=(
  "dotenv-cli"
)

# Liste des dépendances optionnelles (peuvent échouer mais ne bloqueront pas le script)
OPTIONAL_DEPS=(
  "netlify-cli"
)

# Liste des dépendances avec des modules natifs qui peuvent nécessiter des dépendances système
NATIVE_DEPS=(
  "netlify-cli:sharp" # Format: paquet:dépendance_native
)

# Vérifier les dépendances système avant de commencer
check_system_dependencies

# Détecter le gestionnaire de paquets
PACKAGE_MANAGER=$(detect_package_manager)

if [ "$PACKAGE_MANAGER" = "none" ]; then
  echo -e "${RED}Aucun gestionnaire de paquets trouvé. Impossible d'installer les dépendances globales.${NC}"
  exit 1
fi

echo -e "${GREEN}Gestionnaire de paquets détecté : $PACKAGE_MANAGER${NC}"

# Fonction pour vérifier si un paquet est installé globalement
is_package_installed() {
  local package=$1
  
  case $PACKAGE_MANAGER in
    bun)
      bun pm ls -g | grep -q $package
      ;;
    npm)
      npm list -g $package --depth=0 2>/dev/null | grep -q $package
      ;;
    pnpm)
      pnpm list -g | grep -q $package
      ;;
    yarn)
      yarn global list | grep -q $package
      ;;
  esac
  
  return $?
}

# Installer chaque dépendance
for package in "${GLOBAL_DEPS[@]}"; do
  echo -e "${BLUE}Vérification de $package...${NC}"
  
  # Vérifier si le paquet a des dépendances natives
  HAS_NATIVE_DEPS=false
  for native_dep in "${NATIVE_DEPS[@]}"; do
    IFS=':' read -r pkg_name native_pkg <<< "$native_dep"
    if [ "$pkg_name" = "$package" ]; then
      HAS_NATIVE_DEPS=true
      echo -e "${YELLOW}$package contient des modules natifs ($native_pkg) qui peuvent nécessiter des dépendances système${NC}"
      break
    fi
  done
  
  if is_package_installed $package; then
    echo -e "${GREEN}$package est déjà installé globalement${NC}"
  else
    echo -e "${YELLOW}Installation de $package globalement...${NC}"
    
    # Définir les options npm pour les paquets avec deps natives
    NPM_OPTS=""
    if [ "$HAS_NATIVE_DEPS" = true ]; then
      # Pour sharp, on peut essayer d'utiliser des binaires précompilés
      if [[ "$package" == *"netlify"* ]]; then
        if [ "$PACKAGE_MANAGER" = "npm" ]; then
          NPM_OPTS="--ignore-scripts"
          echo -e "${YELLOW}Utilisation des options npm spéciales pour $package: $NPM_OPTS${NC}"
        fi
      fi
    fi
    
    # Installation avec le gestionnaire détecté
    case $PACKAGE_MANAGER in
      bun)
        if [ -n "$NPM_OPTS" ]; then
          bun add -g $package $NPM_OPTS
        else
          bun add -g $package
        fi
        ;;
      npm)
        if [ -n "$NPM_OPTS" ]; then
          npm install -g $package $NPM_OPTS
        else
          npm install -g $package
        fi
        ;;
      pnpm)
        if [ -n "$NPM_OPTS" ]; then
          pnpm add -g $package $NPM_OPTS
        else
          pnpm add -g $package
        fi
        ;;
      yarn)
        if [ -n "$NPM_OPTS" ]; then
          yarn global add $package $NPM_OPTS
        else
          yarn global add $package
        fi
        ;;
    esac
    
    # Vérifier le résultat de l'installation
    INSTALL_RESULT=$?
    
    if [ $INSTALL_RESULT -eq 0 ]; then
      echo -e "${GREEN}$package a été installé avec succès${NC}"
    else
      echo -e "${RED}Échec de l'installation de $package (code: $INSTALL_RESULT)${NC}"
      
      # Vérifier si l'erreur est liée à des dépendances natives manquantes
      if [ "$HAS_NATIVE_DEPS" = true ]; then
        echo -e "${YELLOW}L'erreur peut être liée à des dépendances système manquantes pour les modules natifs.${NC}"
        
        # Suggestions spécifiques pour différents paquets
        if [[ "$package" == *"netlify"* ]]; then
          echo -e "${YELLOW}Pour netlify-cli (qui dépend de sharp), essayez :${NC}"
          
          if command -v apt-get &> /dev/null; then
            echo -e "${BLUE}sudo apt-get install -y libvips-dev build-essential${NC}"
          elif command -v pacman &> /dev/null; then
            echo -e "${BLUE}sudo pacman -S --needed libvips gcc make pkgconf${NC}"
          elif command -v dnf &> /dev/null; then
            echo -e "${BLUE}sudo dnf install -y vips-devel gcc-c++ make${NC}"
          fi
          
          # Si prebuild-install manque, suggérer de l'installer
          if [[ "$INSTALL_RESULT" == *"prebuild-install: command not found"* ]]; then
            echo -e "${YELLOW}prebuild-install manque, essayez :${NC}"
            echo -e "${BLUE}${PACKAGE_MANAGER} install -g prebuild-install${NC}"
          fi
          
          # Option alternative : Passer à @netlify/cli
          echo -e "${YELLOW}Ou essayez d'installer @netlify/cli au lieu de netlify-cli :${NC}"
          echo -e "${BLUE}${PACKAGE_MANAGER} install -g @netlify/cli${NC}"
          
          echo -e "${YELLOW}Voulez-vous essayer d'installer @netlify/cli à la place ? (o/n)${NC}"
          read -r response
          
          if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
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
            
            if [ $? -eq 0 ]; then
              echo -e "${GREEN}@netlify/cli a été installé avec succès comme alternative${NC}"
              continue
            else
              echo -e "${RED}Échec de l'installation de @netlify/cli${NC}"
            fi
          fi
        fi
      fi
      case $PACKAGE_MANAGER in
        bun)
          sudo bun add -g $package
          ;;
        npm)
          sudo npm install -g $package
          ;;
        pnpm)
          sudo pnpm add -g $package
          ;;
        yarn)
          sudo yarn global add $package
          ;;
      esac
      
      if [ $? -eq 0 ]; then
        echo -e "${GREEN}$package a été installé avec succès (via sudo)${NC}"
      else
        echo -e "${RED}Échec de l'installation de $package même avec sudo${NC}"
        echo -e "${YELLOW}Essayez d'installer manuellement : sudo $PACKAGE_MANAGER install -g $package${NC}"
      fi
    fi
  fi
done

echo -e "${GREEN}${BOLD}Installation des dépendances globales terminée${NC}"

# Gestion des dépendances optionnelles
if [ ${#OPTIONAL_DEPS[@]} -gt 0 ]; then
  echo -e "${YELLOW}Certaines dépendances nécessitent des configurations spéciales. Voulez-vous les installer ? (o/n)${NC}"
  read -r response
  
  if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
    for package in "${OPTIONAL_DEPS[@]}"; do
      echo -e "${YELLOW}Installation de $package (optionnel)...${NC}"
      
      if [[ "$package" == "netlify-cli" ]]; then
        echo -e "${YELLOW}Pour installer Netlify CLI, utilisez plutôt le script dédié :${NC}"
        echo -e "${BLUE}./scripts/install-netlify.sh${NC}"
        echo -e "${YELLOW}Ce script gérera les dépendances système requises.${NC}"
      else
        # Installer les autres paquets optionnels ici
        case $PACKAGE_MANAGER in
          bun)
            bun add -g $package
            ;;
          npm)
            npm install -g $package
            ;;
          pnpm)
            pnpm add -g $package
            ;;
          yarn)
            yarn global add $package
            ;;
        esac
      fi
    done
  fi
fi

echo -e "${YELLOW}Assurez-vous que les binaires sont accessibles dans votre PATH${NC}"

# Conseils pour les problèmes de PATH
case $PACKAGE_MANAGER in
  npm)
    echo -e "${YELLOW}Si les commandes ne sont pas accessibles, ajoutez ceci à votre ~/.zshrc :${NC}"
    echo -e "${BLUE}export PATH=\"\$HOME/.npm-global/bin:\$PATH\"${NC}"
    ;;
  bun)
    echo -e "${YELLOW}Si les commandes Bun ne sont pas accessibles, lancez :${NC}"
    echo -e "${BLUE}./scripts/fix-bun-access.sh${NC}"
    ;;
  yarn)
    echo -e "${YELLOW}Si les commandes yarn globales ne sont pas accessibles, vérifiez votre ~/.yarnrc${NC}"
    ;;
esac
