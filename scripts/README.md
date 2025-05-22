# Scripts pour le projet Portfolio

Ce répertoire contient plusieurs scripts pour la gestion du projet. Les scripts ont été réorganisés pour réduire la redondance et améliorer l'organisation.

## 🚀 Nouveaux scripts unifiés

Les scripts suivants sont des versions unifiées qui remplacent plusieurs scripts individuels :

### `menu.sh`

Menu interactif pour accéder à tous les scripts du projet.

```bash
# Utilisation
./scripts/menu.sh
# ou
bun run menu
```

### `dev.sh`

Script de développement unifié qui remplace plusieurs scripts individuels.

```bash
# Usage basique
./scripts/dev.sh

# Options disponibles
./scripts/dev.sh --env=dev|prod --runtime=bun|node --mode=normal|fast|turbo|optimized --clean --analyze
```

### `build-unified.sh`

Script de build unifié qui combine plusieurs méthodes de build.

```bash
# Usage basique
./scripts/build-unified.sh

# Options disponibles
./scripts/build-unified.sh --optimize --analyze --fast
```

### `optimize.sh`

Script d'optimisation qui combine tous les scripts d'optimisation.

```bash
# Optimiser tout
./scripts/optimize.sh

# Options disponibles
./scripts/optimize.sh --cache --images --responsive
```

### `fix.sh`

Script de correction unifié qui combine plusieurs scripts de correction.

```bash
# Corriger tout
./scripts/fix.sh

# Options disponibles
./scripts/fix.sh --lint --format --ts --react --bun --npm
```

### `check.sh`

Script de vérification unifié qui combine plusieurs scripts de vérification.

```bash
# Vérifier tout
./scripts/check.sh

# Options disponibles
./scripts/check.sh --health --code --perf --config --lint
```

### `cleanup.sh`

Script de nettoyage qui supprime les fichiers temporaires et redondants.

```bash
# Nettoyer les fichiers temporaires
./scripts/cleanup.sh
```

### `analyze-scripts.sh`

Script d'analyse des scripts pour identifier les redondances et optimisations possibles.

```bash
# Analyser les scripts
./scripts/analyze-scripts.sh
```

# Options spécifiques

./scripts/optimize.sh --cache --images --responsive

````

### `fix.sh`

Script qui combine tous les outils de correction des erreurs.

```bash
# Corriger tous les problèmes
./scripts/fix.sh

# Options spécifiques
./scripts/fix.sh --lint --format --ts --react --bun --npm
````

### `check.sh`

Script de vérification qui combine tous les outils de vérification.

```bash
# Vérifier tout
./scripts/check.sh

# Options spécifiques
./scripts/check.sh --health --code --perf --config --lint
```

## 🛠️ Catégories de scripts

Les scripts du projet sont organisés dans les catégories suivantes :

### Scripts de développement

- `dev.sh` - Script de développement unifié
- `dev-fast.sh` - Développement optimisé pour la vitesse
- `dev-node.sh` - Développement avec Node.js
- `dev-universal.sh` - Script universel qui s'adapte à l'environnement

### Scripts de build

- `build.sh` - Script de build standard
- `build-unified.sh` - Script de build unifié

### Scripts d'optimisation

- `optimize.sh` - Script d'optimisation unifié
- `optimize-cache.sh` - Optimisation du cache
- `optimize-images.js` - Optimisation des images
- `generate-responsive-images.js` - Génération d'images responsives

### Scripts de correction

- `fix.sh` - Script de correction unifié
- `fix-all.sh` - Correction globale (ancien script)
- `fix-lint-format.sh` - Correction du linting et formatage
- `fix-typescript.sh` - Correction des problèmes TypeScript
- `fix-react-keys.sh` - Correction des clés React
- `fix-react-contexts.sh` - Correction des contextes React

### Scripts de vérification

- `check.sh` - Script de vérification unifié
- `check-health.sh` - Vérification de la santé du projet
- `check-code-quality.sh` - Vérification de la qualité du code
- `check-lint-errors.sh` - Vérification des erreurs de linting
- `analyze-performance.sh` - Analyse des performances

### Scripts d'installation

- `install-bun.sh` - Installation de Bun
- `install-deps.sh` - Installation des dépendances
- `install-netlify.sh` - Installation de Netlify CLI

## 📃 Matrice de compatibilité

Une matrice de compatibilité détaillée entre les anciens scripts et les nouveaux est disponible dans le fichier [scripts-compatibility.md](../docs/scripts-compatibility.md).

## ⚠️ Remarques

- Les anciens scripts individuels sont toujours disponibles mais leur utilisation est déconseillée au profit des scripts unifiés.
- Les scripts unifiés créent des sauvegardes avant de modifier les fichiers (pour les scripts de correction).
- Utilisez `bun run menu` pour un accès facile à tous les scripts via une interface interactive.
