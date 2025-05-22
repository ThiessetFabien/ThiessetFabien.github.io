# Notes sur les avertissements CSS

## Avertissement sur le support CSS intégré

Si vous voyez cet avertissement lors du démarrage du serveur de développement :

```
Warning: Built-in CSS support is being disabled due to custom CSS configuration being detected.
See here for more info: https://nextjs.org/docs/messages/built-in-css-disabled
```

**Ne vous inquiétez pas !** Cet avertissement est normal et ne représente pas un problème. Il indique simplement que Next.js utilise notre configuration CSS personnalisée (PostCSS, Tailwind, etc.) au lieu de son traitement CSS par défaut.

### Pourquoi cela se produit-il ?

Ce projet utilise :

- PostCSS avec plusieurs plugins
- Tailwind CSS
- Des règles webpack personnalisées pour les fichiers CSS dans next.config.js

### Comment masquer l'avertissement ?

Si vous souhaitez masquer cet avertissement, vous pouvez ajouter cette variable d'environnement :

```bash
NEXT_SUPPRESS_BUILT_IN_CSS_SUPPORT_WARNING=1
```

dans un fichier `.env.local` à la racine du projet.
