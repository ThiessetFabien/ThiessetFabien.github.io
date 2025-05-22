import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

import { gmail } from '@src/config/gmailAuth.config';

export async function checkGmailAuth(): Promise<NextResponse> {
  try {
    // Accès direct à _options pour éviter l'erreur TypeScript
    const { auth } = gmail.context._options;
    const oAuth2Client = auth as OAuth2Client;

    if (!oAuth2Client) {
      // console.error supprimé pour éviter l'avertissement ESLint
      throw new Error('No auth found');
    }

    // console.log supprimé pour éviter l'avertissement ESLint
    const credentials = await oAuth2Client.getAccessToken();
    // console.log supprimé pour éviter l'avertissement ESLint

    if (!credentials) {
      // console.error supprimé pour éviter l'avertissement ESLint
      throw new Error('No credentials found');
    }

    return NextResponse.next();
  } catch (error) {
    // Ce console.error est conservé car c'est important de loguer les erreurs
    // eslint-disable-next-line no-console
    console.error('Gmail Auth Error:', error);

    return NextResponse.json(
      {
        error: `Error authenticating ! ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 401 }
    );
  }
}
