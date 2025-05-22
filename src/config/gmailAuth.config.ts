import dotenv from 'dotenv';
import { google } from 'googleapis';

// Détermine le fichier .env à utiliser en fonction de l'environnement
let envFile = '.env';
if (process.env.NODE_ENV === 'development') {
  envFile = '.env.development.local';
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}

dotenv.config({ path: envFile });

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// Remplacer les console.log par des commentaires explicatifs
// Environnement et vérification des variables d'environnement nécessaires
// eslint-disable-next-line no-console
console.log('Environnement:', process.env.NODE_ENV);

// Vérifie la présence des identifiants sans les afficher
const hasRequiredCredentials =
  !!process.env.GMAIL_CLIENT_ID &&
  !!process.env.GMAIL_CLIENT_SECRET &&
  !!process.env.GMAIL_REDIRECT_URI &&
  !!process.env.GMAIL_REFRESH_TOKEN;

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

async function refreshGmailToken() {
  if (!hasRequiredCredentials) {
    throw new Error('Gmail credentials is required');
  }

  try {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    const token = credentials.access_token;
    // eslint-disable-next-line no-console
    console.log('Access token refreshed');
    return token;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

oAuth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // eslint-disable-next-line no-console
    console.log('New tokens received');
  }
});

// Rafraîchir le token toutes les 58 minutes (3500 secondes)
setInterval(refreshGmailToken, 3500000);

export const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
