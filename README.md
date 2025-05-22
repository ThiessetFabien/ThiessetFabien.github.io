# Portfolio Personnel

Un portfolio moderne et interactif construit avec Next.js, permettant de présenter mes compétences, expériences et projets de façon élégante.

## 🚀 Technologies utilisées

- **Next.js** - Framework React pour le rendu côté serveur
- **TypeScript** - Pour un typage statique robuste
- **Framer Motion** - Pour des animations fluides
- **TailwindCSS** - Pour le styling avec une approche utility-first
- **React Hooks** - Pour la gestion de l'état et des effets
- **Bun** - Gestionnaire de paquets et runtime JavaScript ultra-rapide

## ✨ Fonctionnalités

- Design responsive basé sur un système de cartes modulaires
- Chargement dynamique et paresseux (lazy loading) des composants lourds
- Sections personnalisables:
  - Présentation / Hero
  - Expériences professionnelles
  - Compétences techniques
  - Projets réalisés
  - Accomplissements
  - Témoignages (carousel)
  - Carte interactive
  - Formulaire de contact

## 🛠️ Installation

```bash
# Cloner le dépôt
git clone <url-du-dépôt>

# Accéder au répertoire
cd Portfolio

# Installer les dépendances avec Bun
bun install

# Lancer le serveur de développement
bun run dev

# Ou utiliser le menu interactif pour accéder à tous les scripts
bun run menu
```

## 🧰 Scripts disponibles

Les scripts ont été réorganisés pour plus de cohérence et moins de redondance :

```bash
# Menu interactif (recommandé)
bun run menu

# Développement
bun run dev               # Développement standard
bun run dev:universal     # Script de développement unifié et adaptable
bun run dev:optimized     # Développement avec optimisations

# Build
bun run build             # Build standard
bun run build:optimized   # Build avec optimisations

# Vérification et correction
bun run check             # Vérifications complètes
bun run fix               # Corrections automatiques

# Optimisation
bun run optimize          # Exécute toutes les optimisations
bun run optimize:images   # Optimisation des images uniquement

# Nettoyage
bun run clean:temp        # Nettoie les fichiers temporaires
bun run clean:all         # Nettoie .next et node_modules
```

Pour plus de détails sur les scripts, consultez :

- [Documentation des scripts](./scripts/README.md)
- [Matrice de compatibilité](./docs/scripts-compatibility.md)

# Menu interactif pour accéder à tous les scripts

bun run menu

# Scripts de développement

bun run dev # Développement standard
bun run dev:universal # Script universel adaptatif
bun run dev:fast # Développement optimisé pour la vitesse
bun run dev:optimized # Développement avec cache optimisé

# Scripts de build

bun run build # Build standard
bun run build:optimized # Build avec optimisations d'images

# Scripts d'optimisation

bun run optimize # Optimisation globale
bun run optimize:images # Optimisation des images uniquement

# Scripts de correction

bun run fix # Correction globale
bun run fix:lint # Correction du linting uniquement

# Scripts de vérification

bun run check # Vérification globale
bun run check:code # Vérification de la qualité du code

# Documentation complète des scripts

bun run help

```

Consultez le fichier [scripts-compatibility.md](./docs/scripts-compatibility.md) pour la liste complète des scripts et leurs équivalents.

## 📁 Structure du projet

```

Portfolio/
├── public/ # Ressources statiques
├── src/
│ ├── api/ # Données JSON et endpoints API
│ ├── app/ # Pages de l'application (Next.js App Router)
│ ├── components/ # Composants React réutilisables
│ │ └── ui/ # Interface utilisateur (cartes, carousel, etc.)
│ ├── hooks/ # Hooks React personnalisés
│ ├── styles/ # Styles et utilitaires CSS
│ ├── types/ # Types TypeScript
│ └── utils/ # Fonctions utilitaires
└── README.md # Ce fichier

````

## 🌐 Déploiement

Le portfolio est configuré pour être facilement déployé sur des plateformes comme Vercel ou Netlify.

## ⚡ Optimisations de performance

Ce projet inclut plusieurs optimisations pour des performances maximales :

### Scripts d'optimisation

- **optimize-cache.sh** - Gère intelligemment les caches de Next.js et Bun pour des builds plus rapides
- **optimize-images.js** - Compresse et optimise les images pour réduire la taille des fichiers
- **generate-responsive-images.js** - Crée des versions responsives des images pour différentes tailles d'écran
- **check-health.sh** - Vérifie l'état de santé global du projet
- **analyze-performance.sh** - Analyse complète des performances et de la taille du bundle
- **pre-deploy-check.sh** - Vérifie que tout est prêt avant le déploiement

### Commandes d'optimisation

```bash
# Optimiser toutes les images
bun run optimize-images

# Générer des variantes responsives des images
bun run generate-responsive

# Optimiser le cache pour des builds plus rapides
bun run optimize-cache

# Build optimisé avec optimisation des images et du cache
bun run build:optimized

# Vérifier l'état de santé du projet
bun run check-health

# Analyser les performances
bun run analyze-perf

# Vérifier les prérequis avant déploiement
bun run pre-deploy

# Déploiement complet avec vérifications et optimisations
bun run deploy:full

# Nettoyer les dossiers vides
bun run clean:empty
````

### Modes de développement

- **dev** - Mode standard de développement
- **dev:fast** - Mode de développement ultra-rapide avec optimisations Turbo
- **dev:fast:prod** - Mode de développement ultra-rapide avec l'environnement de production
- **build:fast** - Build optimisé pour la vitesse

### Compatibilité Netlify

Le projet est configuré pour un déploiement optimal sur Netlify avec Bun :

```bash
# Déployer sur Netlify
bun run deploy

# Déploiement complet avec toutes les optimisations
bun run deploy:full
```

## 📝 Personnalisation

Toutes les données du portfolio sont gérées via des fichiers JSON, permettant une mise à jour facile du contenu sans modifier le code.

## 🔍 Qualité du code

Ce projet inclut plusieurs outils pour maintenir la qualité du code :

- **ESLint** - Analyse statique du code pour détecter les problèmes
- **Prettier** - Formatage cohérent du code
- **TypeScript** - Typage statique
- **Husky** - Hooks Git pour vérifier le code avant le commit
- **Scripts personnalisés** - Outils d'automatisation pour la maintenance

Consultez [le guide de qualité du code](./docs/guide-qualite-code.md) pour en savoir plus sur les bonnes pratiques et les commandes disponibles.

```bash
# Vérifier la qualité du code
bun run quality

# Corriger automatiquement les problèmes
bun run fix:all
```

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

En tant que projet open source, n'hésitez pas à :

- Forker le dépôt
- Soumettre des pull requests
- Adapter le code pour vos propres besoins
- Partager et distribuer votre version

L'open source permet la collaboration, l'amélioration continue et donne à chacun la liberté d'utiliser, d'étudier, de modifier et de distribuer le logiciel. C'est un excellent moyen de contribuer à la communauté des développeurs tout en présentant vos compétences techniques.
