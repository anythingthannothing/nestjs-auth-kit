import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { TransactionManager } from '../shared/decorators/transactional/transaction-manager';
import { TypeormTransactionMiddleware } from '../shared/decorators/transactional/transaction-middleware';
import { TypeOrmDatabase } from '../shared/decorators/transactional/type-orm-database';
import { envValidationSchema } from './env-validation.schema';
import { mysqlEnv, serverEnv, tokenEnv } from './envs';
import { JwtConfigService } from './services';

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
    JwtModule.registerAsync({
      inject: [JwtConfigService],
      useClass: JwtConfigService,
    }),
  ],
  providers: [TransactionManager, TypeOrmDatabase],
  exports: [TransactionManager],
})
export class AppConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TypeormTransactionMiddleware).forRoutes('*');
  }
}
