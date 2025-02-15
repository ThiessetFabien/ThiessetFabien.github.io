import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.string().default('development'),
  GMAIL_CLIENT_ID: z.string(),
  GMAIL_CLIENT_SECRET: z.string(),
  GMAIL_REFRESH_TOKEN: z.string(),
  GMAIL_REDIRECT_URI: z.string(),
  SMTP_SERVER_USERNAME: z.string(),
});

export const env = envSchema.parse(process.env);
