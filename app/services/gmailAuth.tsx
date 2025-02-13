import { google } from 'googleapis';

if (!process.env.GMAIL_CLIENT_ID)
  throw new Error('GMAIL_CLIENT_ID is required');
if (!process.env.GMAIL_CLIENT_SECRET)
  throw new Error('GMAIL_CLIENT_SECRET is required');
if (!process.env.GMAIL_REFRESH_TOKEN)
  throw new Error('GMAIL_REFRESH_TOKEN is required');
if (!process.env.GMAIL_REDIRECT_URI)
  throw new Error('GMAIL_REDIRECT_URI is required');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

oAuth2Client.on('tokens', (tokens) => {
  console.log('New tokens received.');
});

export const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
