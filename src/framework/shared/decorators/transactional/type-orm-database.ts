import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { mysqlEnv, serverEnv } from '../../../app-config/envs';

@Injectable()
export class TypeOrmDatabase implements OnModuleInit {
  static MysqlDataSource: DataSource;

  constructor(
    @Inject(mysqlEnv.KEY)
    private readonly mysqlConfig: ConfigType<typeof mysqlEnv>,
    @Inject(serverEnv.KEY)
    private readonly serverConfig: ConfigType<typeof serverEnv>,
  ) {}

  async onModuleInit() {
    TypeOrmDatabase.MysqlDataSource = new DataSource({
      type: 'mysql',
      host: this.mysqlConfig.host,
      port: this.mysqlConfig.port,
      username: this.mysqlConfig.username,
      password: this.mysqlConfig.password,
      database: this.mysqlConfig.database,
      synchronize: this.serverConfig.env !== 'production',
      poolSize: this.mysqlConfig.poolSize,
      logging: this.serverConfig.env === 'development',
      entities: ['dist/infra/mysql/**/*.entity.js'],
      bigNumberStrings: true,
      supportBigNumbers: true,
    });

    await TypeOrmDatabase.MysqlDataSource.initialize();
  }
}
