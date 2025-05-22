#!/bin/bash

# Script pour fixer les problèmes d'accessibilité de Bun
# Crée des liens symboliques et met à jour la variable PATH

# Couleurs pour l'affichage terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}
╔════════════════════════════════════════════════════════════╗
║             CORRECTION DE L'ACCÈS À BUN                    ║
╚════════════════════════════════════════════════════════════╝
${NC}"

# Fonction pour trouver toutes les instances de Bun
find_bun_installations() {
  echo -e "${BLUE}Recherche des installations de Bun...${NC}"
  
  local bun_found=false
  local bun_instances=()
  
  # Vérifier les emplacements standard
  if command -v bun &> /dev/null; then
    bun_instances+=("$(which bun)")
    bun_found=true
  fi
  
  # Vérifier l'installation NPM globale
  if [ -f "$HOME/.npm-global/bin/bun" ]; then
    bun_instances+=("$HOME/.npm-global/bin/bun")
    bun_found=true
  fi
  
  # Vérifier l'installation standard de Bun
  if [ -f "$HOME/.bun/bin/bun" ]; then
    bun_instances+=("$HOME/.bun/bin/bun")
    bun_found=true
  fi
  
  # Vérifier dans /usr/local/bin
  if [ -f "/usr/local/bin/bun" ]; then
    bun_instances+=("/usr/local/bin/bun")
    bun_found=true
  fi
  
  # Vérifier dans /usr/bin
  if [ -f "/usr/bin/bun" ]; then
    bun_instances+=("/usr/bin/bun")
    bun_found=true
  fi
  
  # Si aucune installation n'est trouvée
  if [ "$bun_found" = false ]; then
    echo -e "${RED}Aucune installation de Bun n'a été trouvée.${NC}"
    echo -e "${YELLOW}Voulez-vous installer Bun maintenant ? (o/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([oO][uU][iI]|[oO])$ ]]; then
      ./scripts/install-bun.sh
    else
      echo -e "${RED}Installation annulée. Bun est nécessaire pour utiliser certaines fonctionnalités.${NC}"
      exit 1
    fi
  else
    echo -e "${GREEN}Installations de Bun trouvées :${NC}"
    for bun_path in "${bun_instances[@]}"; do
      local version=$(${bun_path} --version 2>/dev/null || echo "Version inconnue")
      echo -e "  ${BLUE}${bun_path}${NC} (${version})"
    done
    
    # Sélectionner l'installation à utiliser
    if [ ${#bun_instances[@]} -gt 1 ]; then
      echo -e "${YELLOW}Plusieurs installations de Bun ont été trouvées. Laquelle souhaitez-vous utiliser ?${NC}"
      select bun_choice in "${bun_instances[@]}"; do
        if [ -n "$bun_choice" ]; then
          selected_bun="$bun_choice"
          break
        fi
      done
    else
      selected_bun="${bun_instances[0]}"
    fi
    
    echo -e "${GREEN}Installation sélectionnée : ${selected_bun}${NC}"
    create_symlinks "$selected_bun"
  fi
}

# Fonction pour créer des liens symboliques
create_symlinks() {
  local bun_path="$1"
  
  echo -e "${BLUE}Création de liens symboliques pour assurer l'accessibilité de Bun...${NC}"
  
  # Créer le répertoire ~/.local/bin s'il n'existe pas
  mkdir -p "$HOME/.local/bin"
  
  # Créer un lien symbolique dans ~/.local/bin
  if [ ! -f "$HOME/.local/bin/bun" ] || [ ! -L "$HOME/.local/bin/bun" ]; then
    echo -e "${YELLOW}Création d'un lien symbolique dans ~/.local/bin/bun...${NC}"
    ln -sf "$bun_path" "$HOME/.local/bin/bun"
  else
    echo -e "${GREEN}Un lien symbolique existe déjà dans ~/.local/bin/bun${NC}"
  fi
  
  # Mise à jour du PATH dans les fichiers de configuration shell
  update_path_in_shell_config
  
  # Créer des alias dans le fichier de configuration shell
  create_shell_aliases "$bun_path"
  
  echo -e "${GREEN}${BOLD}Configuration terminée !${NC}"
  echo -e "${YELLOW}Fermez et rouvrez votre terminal ou exécutez :${NC}"
  echo -e "  ${BLUE}source ~/.bashrc${NC} (si vous utilisez bash)"
  echo -e "  ${BLUE}source ~/.zshrc${NC} (si vous utilisez zsh)"
}

# Fonction pour mettre à jour le PATH dans les fichiers de configuration shell
update_path_in_shell_config() {
  echo -e "${BLUE}Mise à jour du PATH dans les fichiers de configuration shell...${NC}"
  
  # Détecter le shell actuel
  local current_shell=$(basename "$SHELL")
  
  if [ "$current_shell" = "bash" ]; then
    # Bash
    if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$HOME/.bashrc"; then
      echo -e "${YELLOW}Ajout de ~/.local/bin au PATH dans ~/.bashrc...${NC}"
      echo '' >> "$HOME/.bashrc"
      echo '# Ajouté par le script fix-bun-access.sh' >> "$HOME/.bashrc"
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
    else
      echo -e "${GREEN}Le PATH contient déjà ~/.local/bin dans ~/.bashrc${NC}"
    fi
  elif [ "$current_shell" = "zsh" ]; then
    # Zsh
    if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$HOME/.zshrc"; then
      echo -e "${YELLOW}Ajout de ~/.local/bin au PATH dans ~/.zshrc...${NC}"
      echo '' >> "$HOME/.zshrc"
      echo '# Ajouté par le script fix-bun-access.sh' >> "$HOME/.zshrc"
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
    else
      echo -e "${GREEN}Le PATH contient déjà ~/.local/bin dans ~/.zshrc${NC}"
    fi
  else
    echo -e "${YELLOW}Shell non reconnu : $current_shell. Veuillez ajouter manuellement ~/.local/bin à votre PATH.${NC}"
  fi
  
  # Mise à jour du PATH pour la session en cours
  export PATH="$HOME/.local/bin:$PATH"
}

# Fonction pour créer des alias dans les fichiers de configuration shell
create_shell_aliases() {
  local bun_path="$1"
  echo -e "${BLUE}Création d'alias pour Bun...${NC}"
  
  # Détecter le shell actuel
  local current_shell=$(basename "$SHELL")
  local alias_file=""
  
  if [ "$current_shell" = "bash" ]; then
    # Bash
    if [ -f "$HOME/.bash_aliases" ]; then
      alias_file="$HOME/.bash_aliases"
    else
      alias_file="$HOME/.bashrc"
    fi
  elif [ "$current_shell" = "zsh" ]; then
    # Zsh
    alias_file="$HOME/.zshrc"
  else
    echo -e "${YELLOW}Shell non reconnu : $current_shell. Les alias ne seront pas créés.${NC}"
    return
  fi
  
  # Ajouter l'alias
  if ! grep -q "alias bun=" "$alias_file"; then
    echo -e "${YELLOW}Ajout d'un alias pour bun dans ${alias_file}...${NC}"
    echo '' >> "$alias_file"
    echo '# Alias pour Bun (ajouté par le script fix-bun-access.sh)' >> "$alias_file"
    echo "alias bun='$bun_path'" >> "$alias_file"
  else
    echo -e "${GREEN}Un alias pour bun existe déjà dans ${alias_file}${NC}"
  fi
}

# Exécuter la fonction principale
find_bun_installations
