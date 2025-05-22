# Guide de dépannage pour le projet Portfolio

## Erreurs courantes et solutions

### 1. Erreur "command not found: bun"

**Problème** : Bun n'est pas installé ou n'est pas dans votre PATH.

**Solutions** :

1. **Utiliser NPM directement** :

   ```bash
   npm run dev:npm  # Pour démarrer le serveur de développement avec NPM
   ```

2. **Installer Bun localement** (méthode recommandée) :

   ```bash
   ./scripts/install-bun.sh
   # Puis redémarrer votre terminal ou exécuter :
   source ~/.zshrc  # ou source ~/.bashrc si vous utilisez bash
   ```

3. **Utiliser le script de développement Node.js** :

   ```bash
   ./scripts/dev-node.sh
   ```

4. **Fixer les problèmes d'accès à Bun** (Si installé via npm global) :

   ```bash
   # Exécuter le script de correction d'accès à Bun
   ./scripts/fix-bun-access.sh
   # ou utiliser npm
   npm run fix:bun

   # Puis redémarrer votre terminal ou exécuter :
   source ~/.zshrc  # ou source ~/.bashrc si vous utilisez bash
   ```

   Ce script va créer des liens symboliques et configurer les alias nécessaires pour que Bun soit accessible partout.

### 2. Erreur "command not found: dotenv"

**Problème** : La dépendance `dotenv-cli` n'est pas installée ou n'est pas accessible dans le PATH.

**Solutions** :

1. **Installer les dépendances manquantes** :

   ```bash
   ./scripts/install-deps.sh
   ```

   Ce script détectera et installera automatiquement toutes les dépendances manquantes.

2. **Installer dotenv-cli manuellement** :

   ```bash
   npm install --save-dev dotenv-cli
   # ou avec Bun
   bun add -d dotenv-cli
   ```

3. **Utiliser npx** :

   ```bash
   npx dotenv-cli -e .env.development -- bun --bun next dev
   ```

4. **Utiliser le script de développement Node.js** :
   ```bash
   ./scripts/dev-node.sh
   ```

### 1a. Erreurs d'installation de Netlify CLI

**Problème** : L'installation de `netlify-cli` échoue avec des erreurs liées à `sharp` ou `vips`.

**Solutions** :

1. **Utiliser notre script d'installation dédié** :

   ```bash
   npm run install:netlify
   ```

   Ce script guidera l'installation et résoudra les problèmes de dépendances système automatiquement.

2. **Installer les dépendances système manuellement** :

   ```bash
   # Pour Arch Linux
   sudo pacman -S --needed libvips gcc make pkgconf

   # Pour Debian/Ubuntu
   sudo apt-get install -y libvips-dev build-essential
   ```

3. **Plus d'informations** :
   Consultez notre documentation détaillée dans [docs/netlify-cli-install.md](netlify-cli-install.md).

### 2. Erreur "EACCES: permission denied" lors de l'installation de Bun

**Problème** : Tentative d'installation globale de Bun avec npm sans les droits suffisants.

**Solutions** :

1. **Utiliser l'installateur officiel de Bun** (recommandé) :

   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

   Ceci installera Bun dans votre répertoire utilisateur (~/.bun) sans nécessiter de droits root.

2. **Avec sudo** (non recommandé, mais fonctionnel) :
   ```bash
   sudo npm install -g bun
   ```

### 3. Avertissements "Unknown project config" de NPM

**Problème** : Votre fichier .npmrc contient des configurations obsolètes.

**Solution** :

```bash
./scripts/fix-npm-config.sh
```

Ce script mettra à jour votre fichier .npmrc pour utiliser des configurations compatibles avec les nouvelles versions de NPM.

### 4. Erreurs "Fichier '/home/fabien/Projets/Portfolio/.next/types/cache-life.d.ts' introuvable"

**Problème** : Fichiers de types manquants dans le dossier .next/types.

**Solution** :

```bash
./scripts/fix-typescript.sh
```

Ce script nettoie les caches TypeScript et régénère les fichiers de types nécessaires.

### 5. Erreurs de configuration Next.js

**Problème** : Options de configuration invalides dans next.config.js.

**Solution** :

```bash
./scripts/validate-next-config.sh
```

Ce script vérifie votre configuration Next.js et signale les options invalides.

## Problèmes spécifiques à Bun

### 1. Bun installé via npm global n'est pas accessible

**Problème** : Vous avez installé Bun globalement avec `npm install -g bun` mais les scripts ne peuvent pas y accéder.

**Solutions** :

1. **Exécuter le script de correction d'accès à Bun** :

   ```bash
   ./scripts/fix-bun-access.sh
   # ou
   npm run fix:bun
   # ou
   ./scripts/run fix:bun  # méthode robuste qui fonctionne même si bun n'est pas dans le PATH
   ```

   Ce script va :

   - Identifier toutes les installations de Bun sur votre système
   - Créer des liens symboliques dans `~/.local/bin`
   - Ajouter des alias dans vos fichiers de configuration shell
   - Mettre à jour votre PATH

2. **Utiliser le script de démarrage robuste** qui détecte Bun n'importe où :

   ```bash
   npm run dev:bun
   # ou pour l'environnement de production
   npm run dev:bun:prod
   ```

3. **Utiliser une méthode d'installation alternative** :
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
   L'installation directe via le script officiel est plus fiable que l'installation via npm.

## Commandes utiles pour le développement

### Démarrer le serveur de développement

```bash
# Avec Bun (si installé)
bun run dev

# Avec Bun (méthode robuste qui détecte Bun n'importe où)
npm run dev:bun

# Avec NPM
npm run dev:npm

# Version universelle (détecte automatiquement le gestionnaire disponible)
./scripts/run dev

# Mode stable (sans options expérimentales)
./scripts/dev-stable.sh
```

### Nettoyer les caches

```bash
# Nettoyer les caches TypeScript
./scripts/fix-typescript.sh

# Nettoyer le cache Next.js
bun run dev:clean  # ou npm run dev:npm:clean
```

### Afficher l'aide

```bash
./scripts/help.sh
```

Ce guide couvre les problèmes les plus courants que vous pourriez rencontrer lors du développement de ce projet.
