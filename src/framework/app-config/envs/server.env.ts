import { registerAs } from '@nestjs/config';

export default registerAs('serverEnv', () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
}));
