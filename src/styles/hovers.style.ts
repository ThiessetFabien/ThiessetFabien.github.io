/**
 * CSS class for adding a primary shadow effect on hover.
 *
 * This constant represents a Tailwind CSS utility class that applies
 * a shadow with the primary color when an element is hovered.
 *
 * @example
 * ```tsx
 * <div className={`some-base-class ${cnHoverShadowPrimary}`}>
 *   Hover over me to see primary shadow
 * </div>
 * ```
 */
export const cnHoverShadowPrimary = 'hover:shadow-primary';

/**
 * CSS classes pour les effets de transition et de visibilité pendant le chargement.
 *
 * Ces constantes représentent des classes Tailwind CSS qui contrôlent
 * les animations et la visibilité des éléments pendant le chargement initial.
 *
 * @example
 * ```tsx
 * <div className={`${cnHiddenDuringLoading} ${isLoaded ? cnVisibleAfterLoading : ''}`}>
 *   Ce contenu est caché pendant le chargement
 * </div>
 * ```
 */
export const cnHiddenDuringLoading = 'invisible opacity-0';
export const cnVisibleAfterLoading =
  'visible opacity-100 transition-opacity duration-500';
