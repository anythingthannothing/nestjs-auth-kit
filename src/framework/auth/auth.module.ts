import { Module } from '@nestjs/common';

import { LoginController, SignUpController } from './controllers';

@Module({
  imports: [],
  controllers: [LoginController, SignUpController],
})
export class AuthModule {}
