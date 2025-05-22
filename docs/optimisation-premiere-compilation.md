# Guide d'optimisation de la première compilation

Ce guide explique comment utiliser les outils mis en place pour améliorer significativement les performances de la première compilation du projet Portfolio.

## Problématique

La première compilation d'un projet Next.js peut être particulièrement lente car :

- Aucun cache n'est disponible
- Tous les modules doivent être analysés et traités
- TypeScript effectue des vérifications complètes
- Les optimisations de compilation ne sont pas encore appliquées
- Les alias d'importation doivent être résolus pour chaque fichier

## Solutions implémentées

Nous avons mis en place plusieurs optimisations pour améliorer la vitesse de la première compilation :

1. **Scripts d'optimisation** :

   - `scripts/fast-first-compile.sh` - Script principal qui orchestre toutes les optimisations
   - `scripts/preheat-cache.sh` - Préchauffage du cache pour les fichiers critiques (utilisant esbuild)
   - `scripts/optimize-cache.sh` - Configurations optimisées pour le système de cache
   - `scripts/analyze-performance.sh` - Mesure précise des gains de performance

2. **Utilitaires de chargement dynamique** :

   - `src/utils/dynamicLoading.util.ts` - Fonctions pour charger les composants et ressources dynamiquement

3. **Configurations optimisées** :

   - `.swcrc` - Configuration SWC optimisée avec support des alias d'importation
   - Optimisations webpack dans `next.config.js` (cache filesystem, compression désactivée pour la première compilation)

4. **Optimisations spécifiques** :
   - Utilisation d'esbuild à la place de SWC pour la précompilation
   - Désactivation de la minification pour la première compilation
   - Préchargement intelligent des composants fréquemment utilisés

## Utilisation

### Pour une première compilation rapide

```bash
# Utiliser la commande créée dans package.json
bun run dev:first-compile

# Ou exécuter le script directement
bash ./scripts/fast-first-compile.sh
```

### Pour mesurer les gains de performance

```bash
# Utiliser la commande créée dans package.json
bun run analyze:performance

# Ou exécuter le script directement
bash ./scripts/analyze-performance.sh
```

### Pour optimiser manuellement le cache

```bash
# Optimiser le cache avant développement
bash ./scripts/optimize-cache.sh
```

### Dans votre code : Utilisation du chargement dynamique

Pour les composants non critiques pour le premier rendu, utilisez le chargement dynamique :

```tsx
import { lazyLoadComponent } from '@src/utils/dynamicLoading.util';

// Chargement différé du composant
const MonComposant = lazyLoadComponent(
  () =>
    import('@src/components/MonComposant').then((mod) => ({
      default: mod.MonComposant,
    })),
  300 // Délai optionnel en ms
);

// Préchargement d'un composant qui sera bientôt utilisé
import { preloadComponent } from '@src/utils/dynamicLoading.util';

useEffect(() => {
  // Précharge le composant en arrière-plan mais ne le rend pas immédiatement
  preloadComponent(() => import('@src/components/AutreComposant'));
}, []);
```

Pour les images, utilisez le chargeur optimisé :

```tsx
import { optimizedImageLoader } from '@src/utils/dynamicLoading.util';

// Dans votre composant
useEffect(() => {
  optimizedImageLoader(imageSrc, 'medium', () => {
    setImageLoaded(true);
  });
}, [imageSrc]);
```

### Optimisation des composants avec useMemo

Pour les composants qui effectuent des calculs coûteux, utilisez `useMemo` pour éviter les recalculs inutiles :

```tsx
// Exemple d'utilisation de useMemo dans un composant
const memoizedValue = useMemo(() => {
  // Calcul coûteux ou transformation de données
  return data.map((item) => transformItem(item));
}, [data]); // Ne recalcule que si data change
```

## Résultats attendus

Les optimisations mises en place devraient permettre :

- Une **réduction de 40-60%** du temps de première compilation
- Un démarrage plus rapide du serveur de développement
- Une meilleure expérience développeur
- Réduction des erreurs liées aux alias d'importation
- Amélioration du temps de réponse pour les modifications pendant le développement

## Fonctionnement technique

### Préchauffage du cache

Le script `preheat-cache.sh` utilise esbuild pour précompiler les fichiers TypeScript essentiels avant le démarrage de Next.js. Cette approche est plus rapide que d'attendre que SWC/babel compile ces fichiers lors du démarrage.

### Configuration SWC optimisée

Le fichier `.swcrc` a été configuré pour :

1. Supporter correctement les alias d'importation définis dans `tsconfig.json`
2. Désactiver la minification pour la première compilation
3. Utiliser un mode de transformation "loose" plus rapide
4. Désactiver la génération de sourcemaps pour la première compilation

### Chargement dynamique des composants

L'utilitaire `dynamicLoading.util.ts` fournit des fonctions qui permettent de :

1. Charger les composants à la demande plutôt qu'à l'initialisation
2. Précharger les composants qui seront utilisés prochainement
3. Optimiser le chargement des images avec plusieurs tailles et priorités

## Remarques importantes

- Ces optimisations sont spécifiques à la première compilation et n'affectent pas la qualité du build final
- Après la première compilation, le système revient automatiquement aux configurations normales
- Les optimisations sont particulièrement efficaces sur les machines avec des ressources limitées
- L'analyse de performance (`analyze-performance.sh`) permet de mesurer l'impact réel des optimisations sur votre environnement spécifique

---

Pour toute question ou suggestion d'amélioration, consultez la documentation ou contactez l'équipe de développement.

## Dépannage

### Erreurs d'alias d'importation

Si vous rencontrez des erreurs du type "Package could not be found" :

1. Vérifiez que les alias sont correctement définis dans `tsconfig.json`
2. Assurez-vous que `.swcrc` contient la section `paths` correspondante
3. Exécutez `bash ./scripts/optimize-cache.sh` pour recréer la configuration optimisée

### Lenteurs lors de la première compilation

Si la première compilation reste lente malgré les optimisations :

1. Vérifiez que Bun est bien installé et à jour (`bun upgrade`)
2. Utilisez `bash ./scripts/analyze-performance.sh` pour identifier les goulots d'étranglement
3. Optimisez davantage les imports dans les fichiers critiques
4. Considérez l'utilisation de `--turbo` pour les développements quotidiens
