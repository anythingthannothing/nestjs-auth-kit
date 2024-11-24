import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountEntity,
  CheckDuplicateAccountByEmailRepository,
  CreateAccountRepository,
  PasswordEntity,
  UserEntity,
} from '../../infra/mysql';
import { UnitOfWorkProvider } from '../shared';
import { LoginController, SignUpController } from './controllers';
import { HashProvider } from './providers/hash.provider';
import { SignUpService } from './services/sign-up.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, UserEntity, PasswordEntity]),
  ],
  controllers: [LoginController, SignUpController],
  providers: [
    SignUpService,
    HashProvider,
    CheckDuplicateAccountByEmailRepository,
    CreateAccountRepository,
    UnitOfWorkProvider,
  ],
})
export class AuthModule {}
