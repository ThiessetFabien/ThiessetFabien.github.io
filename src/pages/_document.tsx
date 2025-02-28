import { Head, Html, Main, NextScript } from 'next/document';
import { metadata } from '../config/metadata';

export default function Document() {
  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <title>{`${metadata.title}`}</title>
        <meta name='description' content={`${metadata.description}`} />
        <meta name='keywords' content={`${metadata.keywords}`} />
        <meta
          name='author'
          content={
            Array.isArray(metadata.authors)
              ? metadata.authors.map((author) => author.name).join(', ')
              : metadata.authors?.name
          }
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
