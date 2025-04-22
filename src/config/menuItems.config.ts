/**
 * Configuration for menu items used in the application.
 * Each menu item represents a navigational link or action with associated metadata.
 */
/**
 * Type definition for a menu item.
 */
export interface MenuItem {
  /**
   * Unique identifier for the menu item.
   */
  id: string;

  /**
   * Icon name associated with the menu item.
   */
  icon: string;

  /**
   * Display label for the menu item.
   */
  label: string;

  /**
   * Hyperlink reference for the menu item.
   * Can be an anchor link, external URL, or file path.
   */
  href: string;

  /**
   * Specifies where to open the linked document.
   * Common values: '_self', '_blank'.
   */
  target?: '_self' | '_blank';

  /**
   * Relationship between the current document and the linked document.
   * Common values: 'noopener noreferrer'.
   */
  rel?: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'services',
    icon: 'Home',
    label: 'Mes services',
    href: '#card-0',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'about',
    icon: 'User',
    label: 'À propos',
    href: '#card-1',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'portfolio',
    icon: 'GalleryHorizontal',
    label: 'Portfolio',
    href: '#card-2',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'experience',
    icon: 'BriefcaseBusiness',
    label: 'Expériences',
    href: '#card-3',
    target: '_self',
    rel: 'noopener noreferrer',
  },
  {
    id: 'contact',
    icon: 'Send',
    label: 'Contact',
    href: '#card-4',
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
    href: 'www.linkedin.com/in/fabien-thiesset',
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
