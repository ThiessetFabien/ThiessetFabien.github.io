#!/bin/bash
# Script de menu principal pour faciliter l'accès à tous les scripts du projet
# Permet de centraliser tous les scripts dans un menu interactif

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

clear

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                PORTFOLIO - MENU PRINCIPAL                  ║
╚════════════════════════════════════════════════════════════╝
${NC}"

echo -e "${YELLOW}Sélectionnez une catégorie de scripts :${NC}\n"
echo -e "${BOLD}1)${NC} Scripts de développement"
echo -e "${BOLD}2)${NC} Scripts de build"
echo -e "${BOLD}3)${NC} Scripts d'optimisation"
echo -e "${BOLD}4)${NC} Scripts de correction"
echo -e "${BOLD}5)${NC} Scripts de vérification"
echo -e "${BOLD}6)${NC} Scripts d'installation"
echo -e "${BOLD}7)${NC} Scripts de nettoyage"
echo -e "${BOLD}8)${NC} Tests et validation"
echo -e "${BOLD}9)${NC} Déploiement"
echo -e "${BOLD}0)${NC} Quitter"

echo -e "\n${YELLOW}Votre choix :${NC} "
read -r choice

case $choice in
  1)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║              SCRIPTS DE DÉVELOPPEMENT                      ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Développement standard (bun + env dev)"
    echo -e "${BOLD}2)${NC} Développement avec variables prod (bun + env prod)"
    echo -e "${BOLD}3)${NC} Développement avec turbo (plus rapide)"
    echo -e "${BOLD}4)${NC} Développement avec le script universel"
    echo -e "${BOLD}5)${NC} Développement optimisé (cache préchauffé)"
    echo -e "${BOLD}6)${NC} Développement avec Node.js"
    echo -e "${BOLD}7)${NC} Développement avec analyse du bundle"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r dev_choice
    
    case $dev_choice in
      1) bun run dev ;;
      2) bun run dev:prod ;;
      3) bun run dev:turbo ;;
      4) ./scripts/dev.sh ;;
      5) bun run dev:optimized ;;
      6) bun run dev:node ;;
      7) bun run dev:analyze ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  2)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                   SCRIPTS DE BUILD                         ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Build standard"
    echo -e "${BOLD}2)${NC} Build optimisé (images optimisées)"
    echo -e "${BOLD}3)${NC} Build rapide"
    echo -e "${BOLD}4)${NC} Build avec analyse du bundle"
    echo -e "${BOLD}5)${NC} Build avec script unifié"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r build_choice
    
    case $build_choice in
      1) bun run build ;;
      2) bun run build:optimized ;;
      3) bun run build:fast ;;
      4) bun run build:analyze ;;
      5) ./scripts/build-unified.sh ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  3)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                SCRIPTS D'OPTIMISATION                      ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Optimisation globale (tout)"
    echo -e "${BOLD}2)${NC} Optimisation du cache"
    echo -e "${BOLD}3)${NC} Optimisation des images"
    echo -e "${BOLD}4)${NC} Génération d'images responsives"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r optimize_choice
    
    case $optimize_choice in
      1) bun run optimize ;;
      2) bun run optimize:cache ;;
      3) bun run optimize:images ;;
      4) bun run optimize:responsive ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  4)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                SCRIPTS DE CORRECTION                       ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Correction globale (tout)"
    echo -e "${BOLD}2)${NC} Correction du linting"
    echo -e "${BOLD}3)${NC} Correction du formatage"
    echo -e "${BOLD}4)${NC} Correction TypeScript"
    echo -e "${BOLD}5)${NC} Correction React"
    echo -e "${BOLD}6)${NC} Correction configuration Bun"
    echo -e "${BOLD}7)${NC} Correction configuration NPM"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r fix_choice
    
    case $fix_choice in
      1) bun run fix ;;
      2) bun run fix:lint ;;
      3) bun run fix:format ;;
      4) bun run fix:ts ;;
      5) bun run fix:react ;;
      6) bun run fix:bun ;;
      7) bun run fix:npm ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  5)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                SCRIPTS DE VÉRIFICATION                     ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Vérification globale (tout)"
    echo -e "${BOLD}2)${NC} Vérification de la santé du projet"
    echo -e "${BOLD}3)${NC} Vérification de la qualité du code"
    echo -e "${BOLD}4)${NC} Vérification des performances"
    echo -e "${BOLD}5)${NC} Vérification de la configuration Next.js"
    echo -e "${BOLD}6)${NC} Vérification des erreurs de linting"
    echo -e "${BOLD}7)${NC} Vérification de la configuration SWC"
    echo -e "${BOLD}8)${NC} Analyse des scripts"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r check_choice
    
    case $check_choice in
      1) bun run check ;;
      2) bun run check:health ;;
      3) bun run check:code ;;
      4) bun run check:perf ;;
      5) bun run check:config ;;
      6) bun run check:lint ;;
      7) bun run check:swc ;;
      8) bun run analyze:scripts ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  6)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                SCRIPTS D'INSTALLATION                      ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Installation de Bun"
    echo -e "${BOLD}2)${NC} Installation des dépendances"
    echo -e "${BOLD}3)${NC} Installation de Netlify CLI"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r install_choice
    
    case $install_choice in
      1) bun run install:bun ;;
      2) bun run install:deps ;;
      3) bun run install:netlify ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  7)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                SCRIPTS DE NETTOYAGE                        ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Nettoyage du dossier .next"
    echo -e "${BOLD}2)${NC} Nettoyage des node_modules"
    echo -e "${BOLD}3)${NC} Nettoyage complet (.next et node_modules)"
    echo -e "${BOLD}4)${NC} Suppression des dossiers vides"
    echo -e "${BOLD}5)${NC} Nettoyage des fichiers temporaires"
    echo -e "${BOLD}6)${NC} Réinitialisation de l'environnement"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r clean_choice
    
    case $clean_choice in
      1) bun run clean:.next ;;
      2) bun run clean:node_modules ;;
      3) bun run clean:all ;;
      4) bun run clean:empty ;;
      5) bun run clean:temp ;;
      6) bun run reset ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  8)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                SCRIPTS DE TESTS ET VALIDATION              ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Test du composant Leaflet"
    echo -e "${BOLD}2)${NC} Tests unitaires"
    echo -e "${BOLD}3)${NC} Tests d'intégration"
    echo -e "${BOLD}4)${NC} Tests de compatibilité"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r test_choice
    
    case $test_choice in
      1) bash scripts/test-leaflet-component.sh ;;
      2) bun run test:unit ;;
      3) bun run test:integration ;;
      4) bun run test:compatibility ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
  
  9)
    clear
    echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║                 SCRIPTS DE DÉPLOIEMENT                     ║
╚════════════════════════════════════════════════════════════╝
${NC}"
    echo -e "${YELLOW}Sélectionnez un script :${NC}\n"
    echo -e "${BOLD}1)${NC} Déploiement standard"
    echo -e "${BOLD}2)${NC} Déploiement complet (optimisé)"
    echo -e "${BOLD}3)${NC} Production uniquement (sans build)"
    echo -e "${BOLD}0)${NC} Retour au menu principal"
    
    echo -e "\n${YELLOW}Votre choix :${NC} "
    read -r deploy_choice
    
    case $deploy_choice in
      1) bun run deploy ;;
      2) bun run deploy:full ;;
      3) bun run prod ;;
      0) exec $0 ;;
      *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    ;;
    
  0)
    echo -e "${GREEN}Au revoir !${NC}"
    exit 0
    ;;
    
  *)
    echo -e "${RED}Choix invalide${NC}"
    exec $0
    ;;
esac
