# Guide de migration de pnpm à Bun

Ce document explique comment nous avons migré notre projet Portfolio de pnpm vers Bun.

## Pourquoi Bun ?

[Bun](https://bun.sh) est un runtime JavaScript tout-en-un qui inclut :

- Un gestionnaire de paquets (alternative à npm/yarn/pnpm)
- Un bundler (alternative à webpack/parcel)
- Un transpileur (alternative à babel)
- Un exécuteur de tests (alternative à jest)
- Un runtime JavaScript (alternative à Node.js)

Bun est conçu pour être extrêmement rapide et offre une compatibilité avec l'écosystème Node.js/npm.

## Changements effectués

### 1. Configuration de Bun

- Création d'un fichier `bunfig.toml` à la racine du projet pour configurer Bun.
- Mise à jour des scripts dans `package.json` pour utiliser `bun` au lieu de `pnpm`.
- Remplacement de la section `pnpm` par une section `bun` dans `package.json`.

### 2. Gestion des dépendances

- Suppression du fichier de verrouillage `pnpm-lock.yaml`.
- Installation des dépendances avec `bun install` pour générer `bun.lock`.

### 3. Ajustements pour Next.js

- Mise à jour des scripts pour utiliser `bun --bun next` au lieu de simplement `next`.
- Suppression des options obsolètes de la configuration Next.js.

### 4. Configuration pour Netlify

- Mise à jour du fichier `netlify.toml` pour utiliser Bun.
- Création d'un plugin Netlify personnalisé pour installer Bun pendant le déploiement.
- Création d'un script de build personnalisé `netlify/build.sh`.

## Comment utiliser Bun

### Commandes courantes

```bash
# Installation des dépendances
bun install

# Ajout d'une dépendance
bun add nom-du-paquet

# Ajout d'une dépendance de développement
bun add -d nom-du-paquet

# Suppression d'une dépendance
bun remove nom-du-paquet

# Lancement du serveur de développement
bun run dev

# Construction pour la production
bun run build

# Lancement des tests
bun test
```

### Résolution des problèmes courants

1. **Erreur de cache** : En cas d'erreur liée au cache de Bun, vous pouvez le nettoyer avec :

   ```bash
   rm -rf .bun && bun install
   ```

2. **Compatibilité avec Node.js** : Si un paquet ne fonctionne pas correctement avec Bun, vous pouvez utiliser Node.js pour l'exécuter :

   ```bash
   NODE_NO_WARNINGS=1 node ./node_modules/.bin/next build
   ```

3. **Problèmes avec les modules natifs** : Certains modules natifs peuvent nécessiter une configuration spéciale. Dans ce cas, ajoutez-les à la section `dependencies.nativeNodeModules` dans la configuration `bun` du fichier `package.json`.

4. **Avertissement CSS de Next.js** : Vous pourriez voir cet avertissement :
   ```
   Warning: Built-in CSS support is being disabled due to custom CSS configuration being detected.
   See here for more info: https://nextjs.org/docs/messages/built-in-css-disabled
   ```
   Cet avertissement est normal lorsque vous utilisez une configuration CSS personnalisée comme Tailwind CSS. Next.js désactive simplement sa propre gestion CSS intégrée pour éviter des conflits avec votre configuration personnalisée. Aucune action n'est nécessaire.

## Ressources utiles

- [Documentation officielle de Bun](https://bun.sh/docs)
- [Migration guide from npm/yarn/pnpm](https://bun.sh/docs/installation/migration)
- [Bun avec Next.js](https://bun.sh/guides/ecosystem/nextjs)
- [Déploiement sur Netlify avec Bun](https://bun.sh/guides/ecosystem/netlify)
