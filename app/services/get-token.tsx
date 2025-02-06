import { getRefreshToken } from './generateToken';

const CODE = process.env.GMAIL_REFRESH_TOKEN;

if (CODE) {
  getRefreshToken(CODE).then((token) => {
    console.log('Add this token to your .env file:', token);
  });
} else {
  console.error(
    'GMAIL_REFRESH_TOKEN is not defined in the environment variables.'
  );
}
