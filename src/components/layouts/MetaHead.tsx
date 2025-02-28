import Head from 'next/head';

interface MetaHeadProps {
  title?: string;
  description?: string;
}

export const MetaHead = ({ title, description }: MetaHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  );
};
