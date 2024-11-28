import { registerAs } from '@nestjs/config';

export default registerAs('googleOauth', () => ({
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
