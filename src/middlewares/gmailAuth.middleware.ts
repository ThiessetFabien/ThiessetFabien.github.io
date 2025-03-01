import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

import { gmail } from '@/src/config/gmailAuth.config';

export async function checkGmailAuth(): Promise<NextResponse> {
  try {
    const auth = gmail.context._options.auth as OAuth2Client;

    if (!auth) {
      console.error('Auth object is missing');
      throw new Error('No auth found');
    }

    console.log('Attempting to get access token...');
    const credentials = await auth.getAccessToken();
    console.log('Credentials obtained:', !!credentials);

    if (!credentials) {
      console.error('No credentials returned from getAccessToken');
      throw new Error('No credentials found');
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Gmail Auth Error:', error);

    return NextResponse.json(
      {
        error: `Error authenticating ! ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 401 }
    );
  }
}
