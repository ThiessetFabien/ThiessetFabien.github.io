import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

export const CLIENT_ID = process.env.GMAIL_CLIENT_ID;

export const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;

export const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;

export const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

export const { SMTP_SERVER_USERNAME, SMTP_SERVER_SERVICE, PORT } = process.env;
