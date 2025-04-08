/**
 * Interface définissant les propriétés d'un élément de menu
 *
 * @interface MenuItemProps
 * @property {string} id - Identifiant unique de l'élément
 * @property {string} icon - Nom de l'icône à afficher (utilisé par IconLoader)
 * @property {string} label - Texte d'affichage de l'élément de menu
 * @property {string} [href] - Lien de redirection de l'élément (optionnel)
 * @property {string} [target] - Cible d'ouverture du lien (_blank, _self, etc.) (optionnel)
 * @property {string} [rel] - Attribut rel pour les liens externes (optionnel)
 * @property {() => void} [onClick] - Fonction à exécuter au clic sur l'élément (optionnel)
 * @property {boolean} [disabled] - Détermine si l'élément est désactivé (optionnel)
 * @property {Array<{id: string, label: string, href?: string, onClick?: () => void, disabled?: boolean}>} [items] - Sous-menu d'éléments (optionnel)
 */
export interface MenuItemProps {
  id: string;
  icon: string;
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  disabled?: boolean;
  items?: {
    id: string;
    label: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
  }[];
}
