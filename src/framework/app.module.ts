import { Module } from '@nestjs/common';

import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { LoginController } from './auth/controllers';

@Module({
  imports: [AppConfigModule, AuthModule],
  controllers: [LoginController],
  providers: [],
})
export class AppModule {}
