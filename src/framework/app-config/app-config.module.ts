import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envValidationSchema } from './env-validation.schema';
import { googleOauthEnv, mysqlEnv, serverEnv, tokenEnv } from './envs';
import { CustomHttpExceptionFilter } from './filters';
import { UncaughtExceptionFilter } from './filters/uncaught-exception.filter';
import { JwtConfigService, MysqlDbConfigService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      load: [googleOauthEnv, mysqlEnv, serverEnv, tokenEnv],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlDbConfigService,
      inject: [MysqlDbConfigService],
    }),
    JwtModule.registerAsync({
      inject: [JwtConfigService],
      useClass: JwtConfigService,
    }),
  ],
  providers: [
    { provide: APP_FILTER, useClass: UncaughtExceptionFilter },
    { provide: APP_FILTER, useClass: CustomHttpExceptionFilter },
  ],
})
export class AppConfigModule {}
