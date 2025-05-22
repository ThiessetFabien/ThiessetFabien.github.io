import Head from 'next/head';

/**
 * Props pour le composant MetaHead
 */
interface MetaHeadProps {
  /**
   * Titre de la page
   */
  title?: string;
  /**
   * Description de la page pour les métadonnées
   */
  description?: string;
}

/**
 * Composant pour gérer les balises meta et le titre des pages
 *
 * @param props - Propriétés du composant
 * @param props.title - Titre de la page
 * @param props.description - Description de la page pour les métadonnées
 * @returns Composant Head avec les métadonnées configurées
 */
export const MetaHead = ({
  title,
  description,
}: MetaHeadProps): JSX.Element => (
  <Head>
    <title>{title}</title>
    <meta name='description' content={description} />
  </Head>
);
