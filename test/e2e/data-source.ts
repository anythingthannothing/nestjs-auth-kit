import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 43306,
  username: 'root',
  password: 'testdbpassword',
  database: 'nestjs-auth-kit-test',
  synchronize: false,
  entities: ['test-dist/src/infra/mysql/entities/**/*.entity.js'],
});
