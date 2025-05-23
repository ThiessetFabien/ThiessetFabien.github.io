import { Head, Html, Main, NextScript } from 'next/document';

import { metadata } from '../config/metadata';

export default function Document() {
  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <meta charSet='utf-8' />
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

        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
          crossOrigin='anonymous'
        />

        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        <link
          rel='preconnect'
          href='https://tile.openstreetmap.org'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
