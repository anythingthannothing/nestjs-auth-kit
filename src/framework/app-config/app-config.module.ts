import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envValidationSchema } from './env-validation.schema';
import { mysqlEnv, serverEnv, tokenEnv } from './envs';
import { JwtConfigService, MysqlDbConfigService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
      load: [mysqlEnv, serverEnv, tokenEnv],
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
  providers: [MysqlDbConfigService],
})
export class AppConfigModule {}
