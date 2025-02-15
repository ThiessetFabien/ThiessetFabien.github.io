import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

import { gmail } from '@config/gmailAuth';

export async function checkGmailAuth(): Promise<NextResponse> {
  try {
    const auth = gmail.context._options.auth as OAuth2Client;

    if (!auth) {
      throw new Error('No auth found');
    }

    const credentials = await auth.getAccessToken();

    if (!credentials) {
      throw new Error('No credentials found');
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      {
        error: `Error authenticating ! ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 401 }
    );
  }
}
