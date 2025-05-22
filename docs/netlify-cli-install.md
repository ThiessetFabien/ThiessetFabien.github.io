# Installation de Netlify CLI

Ce document explique comment installer Netlify CLI correctement et résoudre les problèmes courants liés aux dépendances système.

## Problème courant

Lorsque vous installez Netlify CLI globalement avec `npm install -g netlify-cli` ou `bun add -g netlify-cli`, vous pouvez rencontrer des erreurs liées à la compilation du module natif `sharp`, qui est une dépendance de Netlify CLI :

```
fatal error: vips/vips8: No such file or directory
compilation terminated.
```

Ce problème est causé par le manque de bibliothèques système requises pour la compilation de `sharp`.

## Solutions

### 1. Utiliser notre script automatisé

La méthode la plus simple est d'utiliser notre script d'installation dédié :

```bash
# Via npm script
npm run install:netlify

# ou directement
./scripts/install-netlify.sh
```

Ce script vous guidera à travers différentes options d'installation et installera automatiquement les dépendances système requises.

### 2. Installer manuellement les dépendances système

Selon votre distribution Linux, installez les packages nécessaires :

- **Arch Linux / Manjaro** :

  ```bash
  sudo pacman -S --needed libvips gcc make pkgconf python
  ```

- **Debian / Ubuntu / Mint** :

  ```bash
  sudo apt-get update && sudo apt-get install -y libvips-dev build-essential python3
  ```

- **Fedora / CentOS / RHEL** :

  ```bash
  sudo dnf install -y vips-devel gcc gcc-c++ make python3
  ```

- **OpenSUSE** :
  ```bash
  sudo zypper install -y libvips-devel gcc make python3
  ```

Après avoir installé les dépendances système, vous pouvez installer Netlify CLI :

```bash
npm install -g netlify-cli
# ou
bun add -g netlify-cli
```

### 3. Utiliser l'alternative @netlify/cli

Une alternative est d'utiliser le package `@netlify/cli` qui peut avoir moins de problèmes d'installation :

```bash
npm install -g @netlify/cli
# ou
bun add -g @netlify/cli
```

### 4. Installation locale (recommandée pour les projets)

Pour éviter les problèmes avec les installations globales, vous pouvez installer Netlify CLI localement dans votre projet :

```bash
npm install --save-dev netlify-cli
# ou
bun add -d netlify-cli
```

Puis utiliser via les scripts npm ou npx :

```bash
# Via script npm (ajoutez dans package.json: "scripts": {"netlify": "netlify"})
npm run netlify deploy

# ou via npx
npx netlify deploy
```

## Problèmes spécifiques

### prebuild-install: command not found

Si vous rencontrez cette erreur, installez prebuild-install globalement :

```bash
npm install -g prebuild-install
```

### Problèmes de permissions

Pour éviter les problèmes de permissions, vous pouvez :

1. Utiliser l'option `--unsafe-perm=true` avec npm :

   ```bash
   npm install -g netlify-cli --unsafe-perm=true
   ```

2. Configurer npm pour installer les packages globaux dans votre répertoire utilisateur :
   ```bash
   mkdir -p ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
   source ~/.zshrc
   ```

## Utilisations sans installation

Si vous ne pouvez pas installer Netlify CLI pour une raison quelconque, vous pouvez :

1. Utiliser npx pour une utilisation ponctuelle :

   ```bash
   npx netlify-cli deploy
   ```

2. Utiliser l'interface web de Netlify: https://app.netlify.com

3. Configurer le déploiement via GitHub Actions
