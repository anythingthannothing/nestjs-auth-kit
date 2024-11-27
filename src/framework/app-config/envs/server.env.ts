import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
}));
