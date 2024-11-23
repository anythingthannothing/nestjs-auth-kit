import { Module } from '@nestjs/common';

import { LoginController, SignUpController } from './controllers';
import { SignUpService } from './services/sign-up.service';

@Module({
  imports: [],
  controllers: [LoginController, SignUpController],
  providers: [SignUpService],
})
export class AuthModule {}
