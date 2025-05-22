# Guide de qualité du code

Ce document fournit des lignes directrices pour maintenir la qualité du code dans le projet.

## Outils de qualité

Nous utilisons plusieurs outils pour assurer la qualité du code :

- **ESLint** : Pour analyser le code et détecter les problèmes potentiels
- **Prettier** : Pour formater le code de manière cohérente
- **TypeScript** : Pour la vérification statique des types
- **Husky** : Pour exécuter des vérifications avant les commits
- **lint-staged** : Pour appliquer le linting uniquement aux fichiers modifiés

## Commandes disponibles

### Vérification de la qualité

```bash
# Vérifier la qualité globale du code (ESLint, TypeScript, Prettier, dépendances)
bun run quality

# Vérifier uniquement les erreurs ESLint
bun run lint:check

# Vérifier le formatage
bun run format:check

# Vérifier les types TypeScript
bun run type-check
```

### Correction automatique

```bash
# Corriger automatiquement tous les problèmes
bun run fix:all

# Corriger uniquement les problèmes de formatage et de linting
bun run fix:code

# Corriger les problèmes spécifiques aux clés React
bun run fix:react-keys

# Corriger les problèmes liés aux contextes React
bun run fix:react-contexts
```

## Bonnes pratiques

### ESLint

1. **Ne pas désactiver les règles ESLint sans raison valable**

   ```typescript
   // Évitez ceci sauf si absolument nécessaire
   // eslint-disable-next-line no-console
   console.log('Debug info');
   ```

2. **Utilisez les scripts de correction automatique** plutôt que de corriger manuellement chaque erreur

3. **Si vous ajoutez de nouvelles règles**, assurez-vous qu'elles sont compatibles avec le reste de la configuration

### Ternaires et conditions

1. **Évitez les ternaires imbriqués** - Utilisez plutôt des instructions if/else ou des fonctions utilitaires :

   ```typescript
   // Évitez
   return condition1 ? valueA : condition2 ? valueB : valueC;

   // Préférez
   if (condition1) return valueA;
   if (condition2) return valueB;
   return valueC;
   ```

2. **Évitez les expressions conditionnelles complexes** - Extractez-les dans des fonctions ou variables nommées

### React

1. **Utilisez des identifiants uniques pour les clés** plutôt que des indices de tableau

   ```tsx
   // Évitez
   {
     items.map((item, index) => <Component key={index} />);
   }

   // Préférez
   {
     items.map((item) => <Component key={item.id} />);
   }
   ```

2. **Mémorisez les valeurs de contexte** avec useMemo pour éviter les rendus inutiles

   ```tsx
   // Utilisez useMemo pour les valeurs de contexte
   const contextValue = useMemo(() => ({ value, setValue }), [value, setValue]);

   return (
     <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
   );
   ```

3. **Mémorisez les fonctions de gestion d'événements** avec useCallback
   ```tsx
   // Utilisez useCallback pour les gestionnaires d'événements
   const handleClick = useCallback(() => {
     // Logique
   }, [dépendances]);
   ```

## Rapports de qualité

Le script `maintenance-qualite.sh` génère des rapports détaillés dans le dossier `reports/` qui vous aideront à identifier les problèmes récurrents et les tendances. Consultez ces rapports régulièrement pour améliorer progressivement la qualité du code.

## Intégration continue

Envisagez d'ajouter ces vérifications à votre flux d'intégration continue pour empêcher que du code de mauvaise qualité ne soit fusionné dans les branches principales.
