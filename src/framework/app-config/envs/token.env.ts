import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresInSeconds: +(process.env.JWT_EXPIRES_IN_SECONDS as string),
  refreshTokenLength: +(process.env.REFRESH_TOKEN_LENGTH as string),
  refreshExpiresInDays: +(process.env.REFRESH_EXPIRES_IN_DAYS as string),
}));
