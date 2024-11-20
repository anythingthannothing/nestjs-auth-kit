import { registerAs } from '@nestjs/config';

export default registerAs('mysqlEnv', () => ({
  host: process.env.MYSQL_HOST,
  port: +(process.env.MYSQL_PORT as string),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  poolSize: +(process.env.MYSQL_POOL_SIZE as string),
}));
