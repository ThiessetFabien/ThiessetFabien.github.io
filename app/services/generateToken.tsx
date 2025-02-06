import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

const REQUIRED_ENV_VARS = [
  'GMAIL_CLIENT_ID',
  'GMAIL_CLIENT_SECRET',
  'GMAIL_REFRESH_TOKEN',
  'PORT',
];

const checkEnvVars = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
};

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
  prompt: 'consent',
});

console.log('1. Visit this URL:', url);
console.log('2. Copy the code from the redirect URL');
console.log('3. Use this code in getRefreshToken()');

export async function getRefreshToken(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.refresh_token) {
      throw new Error('No refresh token returned');
    }
    return tokens.refresh_token;
  } catch (error) {
    console.error('Error getting refresh token:', error);
    throw error;
  }
}

export async function getOAuthToken() {
  try {
    checkEnvVars();

    // Set refresh token
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    // Debug logs
    console.log('Attempting to refresh token...');
    console.log(
      'Client ID:',
      process.env.GMAIL_CLIENT_ID?.substring(0, 8) + '...'
    );
    console.log(
      'Refresh Token:',
      process.env.GMAIL_REFRESH_TOKEN?.substring(0, 8) + '...'
    );

    // Get new access token
    const { credentials } = await oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error('No access token returned from refresh');
    }

    console.log('Successfully obtained new access token');
    return credentials.access_token;
  } catch (error: any) {
    console.error('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    if (error.message.includes('invalid_grant')) {
      throw new Error(
        'Le refresh token est invalide ou expiré. Veuillez le regénérer.'
      );
    }

    throw new Error(`Erreur d'authentification: ${error.message}`);
  }
}
