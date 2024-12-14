import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export async function createDataSource(): Promise<DataSource> {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 43306,
        username: 'root',
        password: 'testdbpassword',
        database: 'nestjs-auth-kit-test',
        synchronize: false,
        entities: ['test-dist/src/infra/mysql/entities/**/*.entity.js'],
      }),
    ],
  }).compile();

  return module.get<DataSource>(DataSource);
}
