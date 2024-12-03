import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { mysqlEnv, serverEnv } from '../envs';

@Injectable()
export class MysqlDbConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(serverEnv.KEY) private serverConfig: ConfigType<typeof serverEnv>,
    @Inject(mysqlEnv.KEY) private mysqlConfig: ConfigType<typeof mysqlEnv>,
  ) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.mysqlConfig.host,
      port: this.mysqlConfig.port,
      username: this.mysqlConfig.username,
      password: this.mysqlConfig.password,
      database: this.mysqlConfig.database,
      synchronize: this.serverConfig.env !== 'production',
      poolSize: this.mysqlConfig.poolSize,
      logging: this.serverConfig.env === 'development',
      entities: [
        this.serverConfig.env === 'test'
          ? 'test-dist/src/infra/mysql/entities/**/*.entity.js'
          : 'dist/infra/mysql/entities/**/*.entity.js',
      ],
      bigNumberStrings: true,
      supportBigNumbers: true,
    };
  }
}
