import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envValidationSchema } from './env-validation.schema';
import { mysqlEnv, serverEnv } from './envs';
import { MysqlDbConfigService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      load: [serverEnv, mysqlEnv],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlDbConfigService,
      inject: [MysqlDbConfigService],
    }),
  ],
  providers: [MysqlDbConfigService],
})
export class AppConfigModule {}
