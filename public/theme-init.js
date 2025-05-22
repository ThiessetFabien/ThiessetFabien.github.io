// Ce script s'exécute AVANT l'hydratation React pour initialiser le thème
// Il évite le flash de contenu incorrect et les erreurs d'hydratation

// IIFE pour éviter la pollution de l'espace global
(function () {
  try {
    // Vérifier que nous sommes dans un environnement navigateur
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      typeof localStorage === 'undefined' ||
      typeof window.matchMedia === 'undefined'
    ) {
      return;
    }

    // Variables pour le suivi du thème
    let themeSource = 'system'; // 'system', 'localStorage' ou 'default'
    let colorMode = 'light'; // 'light' ou 'dark'

    // 1. Essayer de récupérer depuis localStorage (plus haute priorité)
    const persistedTheme = localStorage.getItem('theme');
    if (persistedTheme) {
      colorMode = persistedTheme === 'dark' ? 'dark' : 'light';
      themeSource = 'localStorage';
    }
    // 2. Sinon, utiliser la préférence système
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      colorMode = 'dark';
      themeSource = 'system';
    }
    // 3. Sinon, utiliser le thème par défaut (light)
    else {
      themeSource = 'default';
    }

    // Appliquer le thème immédiatement pour éviter les flashes
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Stocker une variable pour que React puisse savoir ce qui a été fait
    window.__THEME_INIT_SOURCE__ = themeSource;
    window.__INITIAL_THEME__ = colorMode;

    // Message de debug
    console.debug(`Thème initialisé: ${colorMode} (source: ${themeSource})`);
  } catch (e) {
    // Capture silencieuse des erreurs pour éviter les problèmes de chargement
    console.error("Erreur lors de l'initialisation du thème:", e);

    // Appliquer un thème par défaut en cas d'erreur
    try {
      document.documentElement.classList.remove('dark');
    } catch (e) {}
  }
})();
