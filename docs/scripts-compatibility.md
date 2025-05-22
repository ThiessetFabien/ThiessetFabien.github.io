# Matrice de compatibilité des scripts

Ce document liste les scripts originaux et leurs équivalents dans le nouveau système de scripts unifié.

## Scripts de développement

| Ancien script         | Nouvel équivalent                                     | Description                                |
| --------------------- | ----------------------------------------------------- | ------------------------------------------ |
| `dev`                 | `dev` (inchangé)                                      | Développement standard avec Bun            |
| `dev:prod`            | `dev:prod` (inchangé)                                 | Développement avec variables de production |
| `dev:universal`       | `dev:universal` → `./scripts/dev.sh`                  | Script universel adaptatif                 |
| `dev:universal:prod`  | `./scripts/dev.sh --env=prod`                         | Universal avec variables de production     |
| `dev:universal:clean` | `./scripts/dev.sh --clean`                            | Universal avec nettoyage préalable         |
| `dev:bun`             | `./scripts/dev.sh --runtime=bun`                      | Développement spécifique avec Bun          |
| `dev:bun:prod`        | `./scripts/dev.sh --env=prod --runtime=bun`           | Développement Bun avec variables prod      |
| `dev:node`            | `dev:node` → `./scripts/dev.sh --runtime=node`        | Développement avec Node.js                 |
| `dev:fast`            | `dev:fast` → `./scripts/dev.sh --mode=fast`           | Développement optimisé pour vitesse        |
| `dev:stable`          | `./scripts/dev.sh --mode=normal`                      | Développement en mode stable               |
| `dev:turbo`           | `dev:turbo` (inchangé)                                | Développement avec Turbo                   |
| `dev:analyze`         | `dev:analyze` (inchangé)                              | Développement avec analyse du bundle       |
| `dev:optimized`       | `dev:optimized` → `./scripts/dev.sh --mode=optimized` | Développement avec cache optimisé          |
| `preheat-cache`       | `./scripts/optimize.sh --cache`                       | Préchauffe le cache                        |

## Scripts de build

| Ancien script         | Nouvel équivalent                                           | Description                     |
| --------------------- | ----------------------------------------------------------- | ------------------------------- |
| `build`               | `build` (inchangé)                                          | Build standard                  |
| `build:analyze`       | `build:analyze` (inchangé)                                  | Build avec analyse du bundle    |
| `build:fast`          | `build:fast` → `./scripts/build-unified.sh --fast`          | Build rapide                    |
| `build:optimized`     | `build:optimized` → `./scripts/build-unified.sh --optimize` | Build avec optimisations        |
| `optimize-images`     | `optimize:images`                                           | Optimisation des images         |
| `generate-responsive` | `optimize:responsive`                                       | Génération d'images responsives |

## Scripts de correction

| Ancien script        | Nouvel équivalent           | Description                            |
| -------------------- | --------------------------- | -------------------------------------- |
| `fix:all`            | `fix` ou `./scripts/fix.sh` | Correction globale                     |
| `fix:code`           | `fix:lint` et `fix:format`  | Correction du linting et formatage     |
| `fix:react-keys`     | `fix:react`                 | Correction des problèmes de clés React |
| `fix:react-contexts` | `fix:react`                 | Correction des contextes React         |
| `lint:check`         | `check:lint`                | Vérification des erreurs de linting    |

## Scripts d'optimisation

| Ancien script         | Nouvel équivalent     | Description                     |
| --------------------- | --------------------- | ------------------------------- |
| `optimize-cache`      | `optimize:cache`      | Optimisation du cache           |
| `optimize-images`     | `optimize:images`     | Optimisation des images         |
| `generate-responsive` | `optimize:responsive` | Génération d'images responsives |

## Scripts de nettoyage

| Ancien script          | Nouvel équivalent                     | Description                                   |
| ---------------------- | ------------------------------------- | --------------------------------------------- |
| Commandes manuelles    | `clean:temp` → `./scripts/cleanup.sh` | Nettoyage des fichiers temporaires et backups |
| Commandes de nettoyage | `clean:backups`                       | Suppression des dossiers de sauvegarde        |
| `clean:.next`          | `clean:.next` (inchangé)              | Suppression du dossier .next                  |
| `clean:node_modules`   | `clean:node_modules` (inchangé)       | Suppression des node_modules                  |
| `clean:all`            | `clean:all` (inchangé)                | Suppression de .next et node_modules          |
| `clean:empty`          | `clean:empty` (inchangé)              | Suppression des dossiers vides                |

## Scripts d'analyse

| Ancien script  | Nouvel équivalent | Description                                 |
| -------------- | ----------------- | ------------------------------------------- |
| Divers scripts | `analyze:scripts` | Analyse et détection des scripts redondants |

## Scripts de vérification

| Ancien script         | Nouvel équivalent       | Description                            |
| --------------------- | ----------------------- | -------------------------------------- |
| `check-health`        | `check:health`          | Vérification de la santé du projet     |
| `check:code`          | `check:code` (inchangé) | Vérification de la qualité du code     |
| `analyze:performance` | `check:perf`            | Analyse des performances               |
| `validate-config`     | `check:config`          | Validation de la configuration Next.js |

## Scripts d'installation

| Ancien script         | Nouvel équivalent      | Description                           |
| --------------------- | ---------------------- | ------------------------------------- |
| `install-bun`         | `install:bun`          | Installation de Bun                   |
| `install-deps`        | `install:deps`         | Installation des dépendances          |
| `install-netlify`     | `install:netlify`      | Installation de Netlify CLI           |
| `install:global-deps` | Supprimé (non utilisé) | Installation des dépendances globales |

## Autres scripts

| Ancien script | Nouvel équivalent          | Description                            |
| ------------- | -------------------------- | -------------------------------------- |
| `pre-deploy`  | Remplacé par `deploy:full` | Vérification avant déploiement         |
| `quality`     | `quality` (inchangé)       | Exécution des vérifications de qualité |
| `help`        | `help` ou `menu`           | Aide et documentation des scripts      |
