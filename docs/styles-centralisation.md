# Centralisation des Styles

## Objectif

Ce document décrit la centralisation des styles dans le dossier `src/styles` pour améliorer la cohérence et la maintenabilité du code.

## Changements effectués

### 1. Création du fichier `text.style.ts`

- Ajout de `cnCenteredText` pour le texte centré avec césure automatique
- Ajout de `cnResponsiveTextPadding` pour le padding responsif des descriptions
- Ajout de `cnInteractiveLink` pour les liens interactifs

### 2. Mise à jour de `flex.style.ts`

- Ajout de `cnFlexCard` pour les cartes flexibles

### 3. Mise à jour de `boxModel.style.ts`

- Ajout de `cnMediumGap` pour les espaces moyens entre éléments
- Ajout de `cnLargeGap` pour les grands espaces entre éléments

### 4. Mise à jour de `index.ts`

- Export du nouveau fichier `text.style.ts`

### 5. Migration depuis `css-classes.ts`

Les constantes suivantes ont été migrées depuis `src/config/css-classes.ts` vers les fichiers de styles appropriés :

| Ancienne constante                | Nouvelle constante        | Fichier                        |
| --------------------------------- | ------------------------- | ------------------------------ |
| `TEXT_CLASSES.CENTERED_TEXT`      | `cnCenteredText`          | `text.style.ts`                |
| `TEXT_CLASSES.RESPONSIVE_PADDING` | `cnResponsiveTextPadding` | `text.style.ts`                |
| `TEXT_CLASSES.INTERACTIVE_LINK`   | `cnInteractiveLink`       | `text.style.ts`                |
| `CONTAINER_CLASSES.FLEX_CARD`     | `cnFlexCard`              | `flex.style.ts`                |
| `CONTAINER_CLASSES.SMALL_GAP`     | `cnSmallGap`              | `boxModel.style.ts` (existant) |
| `CONTAINER_CLASSES.MEDIUM_GAP`    | `cnMediumGap`             | `boxModel.style.ts`            |
| `CONTAINER_CLASSES.LARGE_GAP`     | `cnLargeGap`              | `boxModel.style.ts`            |

## Utilisation

Pour utiliser les styles centralisés, importez-les depuis `@styles` :

```typescript
import { cnCenteredText, cnFlexCard, cnMediumGap } from '@styles';
```

Ou importez un style spécifique directement :

```typescript
import { cnInteractiveLink } from '@styles/text.style';
```

## Avantages

1. **Cohérence** : Tous les styles sont définis et documentés au même endroit
2. **Maintenabilité** : Facilite les modifications et évite les duplications
3. **Performance** : Permet l'optimisation des imports avec tree-shaking
4. **Lisibilité** : Les noms des constantes suivent une convention cohérente (`cn` prefix)
