import { registerAs } from '@nestjs/config';

export default registerAs('googleOauth', () => ({
  webGoogleClientId: process.env.GOOGLE_CLIENT_ID,
  webGoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  androidGoogleClientId: process.env.GOOGLE_CLIENT_ID,
  androidGoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  iosGoogleClientId: process.env.GOOGLE_CLIENT_ID,
  iosGoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
