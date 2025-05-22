#!/bin/bash
# Fichier: maintenance-qualite.sh
# Description: Script pour maintenir la qualité du code en continu

# Définition des couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}=== Maintenance de la qualité du code ===${NC}\n"

# Créer un dossier pour les rapports si nécessaire
REPORT_DIR="./reports"
mkdir -p "$REPORT_DIR"

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
REPORT_FILE="$REPORT_DIR/quality-report-$TIMESTAMP.txt"

# Partie 1: Vérification des erreurs ESLint
echo -e "${BLUE}Étape 1/5: Vérification des erreurs ESLint${NC}"
eslint_output=$(bunx eslint "./src/**/*.{ts,tsx}" 2>&1)
eslint_status=$?

if [ $eslint_status -eq 0 ]; then
  echo -e "${GREEN}✓ Aucune erreur ESLint détectée.${NC}\n"
  echo "=== RAPPORT ESLINT ===" > "$REPORT_FILE"
  echo "Aucune erreur ESLint détectée." >> "$REPORT_FILE"
else
  error_count=$(echo "$eslint_output" | grep -c "error")
  warning_count=$(echo "$eslint_output" | grep -c "warning")
  
  echo -e "${YELLOW}⚠ $error_count erreurs et $warning_count avertissements détectés.${NC}\n"
  echo "=== RAPPORT ESLINT ===" > "$REPORT_FILE"
  echo "$eslint_output" >> "$REPORT_FILE"
  echo -e "\nErreurs les plus fréquentes:" >> "$REPORT_FILE"
  echo "$eslint_output" | grep -E "error|warning" | sed -E 's/^.*: (.+)$/\1/' | sort | uniq -c | sort -nr | head -10 >> "$REPORT_FILE"
fi

# Partie 2: Vérification des types TypeScript
echo -e "${BLUE}Étape 2/5: Vérification des types TypeScript${NC}"
typescript_output=$(bun run type-check 2>&1)
typescript_status=$?

if [ $typescript_status -eq 0 ]; then
  echo -e "${GREEN}✓ Aucune erreur TypeScript détectée.${NC}\n"
  echo -e "\n=== RAPPORT TYPESCRIPT ===" >> "$REPORT_FILE"
  echo "Aucune erreur TypeScript détectée." >> "$REPORT_FILE"
else
  echo -e "${YELLOW}⚠ Erreurs TypeScript détectées.${NC}\n"
  echo -e "\n=== RAPPORT TYPESCRIPT ===" >> "$REPORT_FILE"
  echo "$typescript_output" >> "$REPORT_FILE"
fi

# Partie 3: Vérification du formatage
echo -e "${BLUE}Étape 3/5: Vérification du formatage Prettier${NC}"
prettier_output=$(bun run format:check 2>&1)
prettier_status=$?

if [ $prettier_status -eq 0 ]; then
  echo -e "${GREEN}✓ Le formatage est correct.${NC}\n"
  echo -e "\n=== RAPPORT PRETTIER ===" >> "$REPORT_FILE"
  echo "Le formatage est correct." >> "$REPORT_FILE"
else
  echo -e "${YELLOW}⚠ Problèmes de formatage détectés.${NC}\n"
  echo -e "\n=== RAPPORT PRETTIER ===" >> "$REPORT_FILE"
  echo "$prettier_output" >> "$REPORT_FILE"
fi

# Partie 4: Vérification des dépendances obsolètes ou vulnérables
echo -e "${BLUE}Étape 4/5: Vérification des dépendances${NC}"
if command -v bunx --version &> /dev/null; then
  deps_output=$(bunx npm-check 2>&1 || echo "Erreur lors de la vérification des dépendances")
  echo -e "${YELLOW}Résumé des dépendances:${NC}\n"
  echo "$deps_output" | grep -E "Missing|Unused|out of date" || echo "Toutes les dépendances sont à jour."
  echo -e "\n=== RAPPORT DÉPENDANCES ===" >> "$REPORT_FILE"
  echo "$deps_output" >> "$REPORT_FILE"
else
  echo -e "${YELLOW}⚠ npm-check n'est pas installé. Essayez d'installer avec: bunx npm-check${NC}\n"
  echo -e "\n=== RAPPORT DÉPENDANCES ===" >> "$REPORT_FILE"
  echo "npm-check n'est pas installé" >> "$REPORT_FILE"
fi

# Partie 5: Suggestions d'amélioration basées sur les erreurs courantes
echo -e "${BLUE}Étape 5/5: Suggestions d'amélioration${NC}"

# Analyser les problèmes fréquents
common_errors=$(grep -E "error|warning" "$REPORT_FILE" | sed -E 's/^.*: (.+)$/\1/' | sort | uniq -c | sort -nr | head -5)

echo -e "\n=== SUGGESTIONS D'AMÉLIORATION ===" >> "$REPORT_FILE"
if [ -n "$common_errors" ]; then
  echo -e "${YELLOW}Voici quelques suggestions basées sur les problèmes fréquents:${NC}"
  echo "$common_errors" | while read -r line; do
    count=$(echo "$line" | awk '{print $1}')
    error=$(echo "$line" | cut -d' ' -f2-)
    
    case "$error" in
      *"no-nested-ternary"*)
        suggestion="Remplacez les expressions ternaires imbriquées par des instructions if/else ou par des fonctions utilitaires pour améliorer la lisibilité."
        ;;
      *"no-shadow"*)
        suggestion="Évitez de redéclarer des variables dans des scopes imbriqués. Utilisez des noms différents pour éviter la confusion."
        ;;
      *"no-console"*)
        suggestion="Remplacez les console.log par un système de journalisation approprié ou supprimez-les pour la production."
        ;;
      *"react/jsx-no-useless-fragment"*)
        suggestion="Supprimez les fragments React inutiles lorsqu'ils n'encapsulent qu'un seul enfant."
        ;;
      *"react/no-array-index-key"*)
        suggestion="Utilisez des identifiants uniques comme clés React au lieu des indices de tableau."
        ;;
      *)
        suggestion="Consultez la documentation ESLint pour résoudre ce problème: $error"
        ;;
    esac
    
    echo -e "${YELLOW}• $error${NC} ($count occurrences)"
    echo -e "  ${GREEN}Suggestion:${NC} $suggestion\n"
    
    echo "• $error ($count occurrences)" >> "$REPORT_FILE"
    echo "  Suggestion: $suggestion" >> "$REPORT_FILE"
  done
else
  echo -e "${GREEN}✓ Aucun problème récurrent détecté. Continuez votre bon travail !${NC}"
  echo "Aucun problème récurrent détecté." >> "$REPORT_FILE"
fi

# Résumé
echo -e "\n${BLUE}${BOLD}=== Résumé de la qualité du code ===${NC}"
if [ $eslint_status -eq 0 ] && [ $typescript_status -eq 0 ] && [ $prettier_status -eq 0 ]; then
  echo -e "${GREEN}${BOLD}✓ Votre code est de haute qualité !${NC}"
else
  echo -e "${YELLOW}${BOLD}⚠ Votre code a besoin de quelques améliorations.${NC}"
fi

echo -e "${BLUE}Le rapport complet a été enregistré dans:${NC} $REPORT_FILE"
echo -e "\n${BLUE}Pour corriger automatiquement les problèmes:${NC}"
echo -e "  ${BOLD}• ESLint:${NC} bun run fix:code"
echo -e "  ${BOLD}• Prettier:${NC} bun run format"
echo -e "  ${BOLD}• Tout corriger:${NC} bun run fix:all"
