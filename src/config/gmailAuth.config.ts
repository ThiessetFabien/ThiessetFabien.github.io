import dotenv from 'dotenv';
import { google } from 'googleapis';
dotenv.config(
  process.env.NODE_ENV === 'development'
    ? { path: '.env.development.local' }
    : { path: '.env.production' }
);

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

console.log('Environnement:', process.env.NODE_ENV);
console.log('Client ID exists:', !!process.env.GMAIL_CLIENT_ID);
console.log('Client Secret exists:', !!process.env.GMAIL_CLIENT_SECRET);
console.log('Redirect URI exists:', !!process.env.GMAIL_REDIRECT_URI);
console.log('Refresh Token exists:', !!process.env.GMAIL_REFRESH_TOKEN);

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
