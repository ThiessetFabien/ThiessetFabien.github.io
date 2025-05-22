/**
 * Configuration for menu items used in the application.
 * Each menu item represents a navigational link or action with associated metadata.
 */

import type { MenuItemProps } from '@src/types/MenuItemProps';

/**
 * Type definition for a menu item.
 */
export interface MenuItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  target?: '_self' | '_blank';
  rel?: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'home',
    icon: 'Home',
    label: 'Accueil',
    href: '#home',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'about',
    icon: 'User',
    label: 'À propos',
    href: '#about',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'portfolio',
    icon: 'Grid2x2Plus',
    label: 'Portfolio',
    href: '#portfolio',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'experiences',
    icon: 'BriefcaseBusiness',
    label: 'Expériences',
    href: '#experiences',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'contact',
    icon: 'Send',
    label: 'Contact',
    href: '#contact',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'resume',
    icon: 'ClipboardList',
    label: 'CV',
    href: '/documents/resume.pdf',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'motivation',
    icon: 'PenTool',
    label: 'Lettre de motivation',
    href: '/documents/motivation.pdf',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'linkedin',
    icon: 'Linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/fabien-thiesset',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'github',
    icon: 'Github',
    label: 'GitHub',
    href: 'https://github.com/ThiessetFabien?tab=repositories',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'mail',
    icon: 'Mail',
    label: 'Envoyez-moi un message',
    href: 'mailto:thiessetfabienpro@gmail.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'phone',
    icon: 'Phone',
    label: 'Appelez-moi directement',
    href: 'tel:+33610920974',
  },
];

export const menuItemsMobile = (items: MenuItemProps[]): MenuItemProps[] =>
  items.filter(
    (item) =>
      ![
        'home',
        'about',
        'portfolio',
        'contact',
        'experiences',
        'resume',
        'motivation',
      ].includes(item.id)
  );

export const menuItemsTabletteAndDesktop = (
  items: MenuItemProps[]
): MenuItemProps[] => items.filter((item) => item.id !== 'scrollTop');
