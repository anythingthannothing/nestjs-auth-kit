import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppConfigModule, AuthModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
