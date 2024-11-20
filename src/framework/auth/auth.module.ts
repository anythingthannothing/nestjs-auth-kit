import { Module } from '@nestjs/common';

import { LoginController } from './controllers';

@Module({
  controllers: [LoginController],
})
export class AuthModule {}
