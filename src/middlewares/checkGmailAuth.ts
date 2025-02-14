import { NextResponse } from 'next/server';

import { gmail } from '@config/gmailAuth';

export async function checkGmailAuth() {
  try {
    const credentials = await gmail.context._options.auth?.getAccessToken();

    if (!credentials) {
      throw new Error('No credentials found');
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error checking Gmail auth:', error);

    return NextResponse.json(
      { error: 'Error authenticating' },
      { status: 401 }
    );
  }
}
