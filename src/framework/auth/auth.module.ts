import { Module } from '@nestjs/common';

import { CheckDuplicateUserByEmailRepository } from '../../infra/mysql';
import { CreateAccountRepository } from '../../infra/mysql/repositories/auth';
import { LoginController, SignUpController } from './controllers';
import { HashProvider } from './providers/hash.provider';
import { SignUpService } from './services/sign-up.service';

@Module({
  imports: [],
  controllers: [LoginController, SignUpController],
  providers: [
    SignUpService,
    HashProvider,
    CheckDuplicateUserByEmailRepository,
    CreateAccountRepository,
  ],
})
export class AuthModule {}
