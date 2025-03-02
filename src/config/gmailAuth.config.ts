import dotenv from 'dotenv';
import { google } from 'googleapis';

const logEnvironmentSetup = () => {
  console.log('Configuration environnement:', {
    NODE_ENV: process.env.NODE_ENV,
    GMAIL_CONFIG: {
      hasClientId: !!process.env.GMAIL_CLIENT_ID,
      hasClientSecret: !!process.env.GMAIL_CLIENT_SECRET,
      hasRefreshToken: !!process.env.GMAIL_REFRESH_TOKEN,
      hasRedirectUri: !!process.env.GMAIL_REDIRECT_URI,
    },
  });
};

dotenv.config({
  path:
    process.env.NODE_ENV === 'development'
      ? '.env.development.local'
      : '.env.production',
});

logEnvironmentSetup();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

async function refreshGmailToken() {
  if (
    !process.env.GMAIL_CLIENT_ID ||
    !process.env.GMAIL_CLIENT_SECRET ||
    !process.env.GMAIL_REFRESH_TOKEN ||
    !process.env.GMAIL_REDIRECT_URI
  )
    throw new Error('Gmail credentials is required');

  try {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    const token = credentials.access_token;
    console.log('Access token refreshed');
    return token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

oAuth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    console.log('New tokens received');
  }
  console.log('Access token refreshed');
});

setInterval(refreshGmailToken, 3500000); // 3500s = 58min

export const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
