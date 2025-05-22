# Guide de Qualité du Code

Ce guide présente les bonnes pratiques mises en place dans ce projet pour maintenir un code propre, lisible et maintenable.

## 1. Structure des Types

- Types placés dans des fichiers dédiés dans le répertoire `/src/types/`
- Types organisés par domaine fonctionnel (ex: `FooterProps.ts`, `HeaderProps.ts`)
- Documentation JSDoc complète pour chaque type et propriété
- Éviter les types imbriqués complexes

## 2. Constantes et Valeurs

- Valeurs numériques et chaînes hardcodées évitées au profit de constantes
- Constantes regroupées par domaine dans `/src/config/`
  - `constants.ts` : Délais, z-index, informations de contact
  - `css-classes.ts` : Classes CSS réutilisables

## 3. Composants React

- Typage explicite des propriétés avec interfaces dédiées
- Documentation JSDoc claire et complète
- Un composant par fichier
- Nommage cohérent et explicite
- Séparation des préoccupations (contenu / présentation)
- Réutilisation des composants

## 4. Utilitaires

- Fonctions utilitaires dédiées pour manipulations répétitives
- Utilitaires organisés par domaine (formatText, motion, etc.)
- Arguments et retours typés
- Documentation sur le rôle et l'usage de chaque fonction

## 5. Styles CSS

- Classes réutilisables via `css-classes.ts`
- Utilisation de l'utilitaire `cn()` pour combiner les classes
- Styles responsifs avec préfixes de taille (`sm:`, `md:`, etc.)
- Éviter les styles en ligne

## 6. Optimisations React

- Utilisation de React.memo pour les composants purement fonctionnels
- Éviter les re-rendus inutiles
- Utilisation appropriée des hooks (useCallback, useMemo, etc.)

## 7. Accessibilité

- Attributs `aria-label` pour tous les éléments interactifs
- Structure HTML sémantique (header, footer, etc.)
- Bonne hiérarchie des niveaux de titres (h1, h2, h3, etc.)
- Textes alternatifs pour les images

## 8. Gestion des Erreurs

- Validation des propriétés avec valeurs par défaut appropriées
- Gestion des cas undefined/null
- Try/catch pour les opérations asynchrones

## 9. Documentation

- Documentation JSDoc complète et à jour
- Commentaires sur le code complexe ou non-évident
- Préférer l'auto-documentation par un bon nommage

## 10. Performance

- Lazy loading des composants lourds
- Optimisation des images
- Réduction des dépendances externes
