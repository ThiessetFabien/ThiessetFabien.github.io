# Plan de migration vers Next.js App Router

## Changements effectués

1. ✅ Mise à jour du fichier `src/app/layout.tsx` pour utiliser l'approche App Router
   - Utilisation de l'export `metadata` pour les métadonnées
   - Suppression des balises meta manuelles dans le head
2. ✅ Suppression de `src/app/metadata-export.tsx` qui n'est plus nécessaire

## Changements à faire ultérieurement

1. Supprimer le composant `MetaHead.tsx` obsolète

   ```bash
   rm -f /home/fabien/Projets/Portfolio/src/components/layouts/MetaHead.tsx
   ```

2. Supprimer le dossier pages quand vous êtes prêt

   ```bash
   rm -rf /home/fabien/Projets/Portfolio/src/pages
   ```

3. Mettre à jour les imports dans les composants qui utilisaient MetaHead

## Avantages de l'App Router

- **Génération automatique des métadonnées** : Next.js gère automatiquement l'insertion des balises meta
- **Approche plus moderne** : Suit les recommandations officielles de Next.js
- **Routing basé sur les fichiers** : Organisation plus intuitive du code
- **Meilleure performance** : Optimisations intégrées pour le chargement des pages

## Ressources utiles

- [Documentation App Router](https://nextjs.org/docs/app)
- [Guide de migration du Pages Router vers App Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
