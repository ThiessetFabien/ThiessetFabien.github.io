# Correctif Meta Viewport

## Problème résolu

Le problème était que la balise meta viewport était placée dans le composant `<Head>` du fichier `_document.tsx`, ce qui est considéré comme une mauvaise pratique dans Next.js et provoquait un avertissement.

## Solution

La solution consistait à :

1. Supprimer la balise meta viewport du fichier `_document.tsx`
2. Ajouter la propriété viewport à l'objet metadata dans `src/app/metadata.ts`
3. Créer un fichier d'exportation pour s'assurer que les métadonnées sont correctement appliquées

## Bonnes pratiques

Selon les recommandations de Next.js :

- La balise meta viewport ne doit pas être dans `_document.tsx`
- Avec l'App Router, les métadonnées doivent être définies dans l'objet metadata
- Avec le Pages Router, les balises meta doivent être dans des composants utilisant `next/head`

## Ressources

- [Documentation Next.js sur les métadonnées](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Message d'erreur référencé](https://nextjs.org/docs/messages/no-document-viewport-meta)
