import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountEntity,
  CheckDuplicateAccountByEmailRepository,
  CreateAccountRepository,
  PasswordEntity,
  RefreshTokenEntity,
  UserEntity,
} from '../../infra/mysql';
import {
  CreateRefreshTokenRepository,
  GetRefreshTokenRepository,
} from '../../infra/mysql/repositories/refresh-token';
import { UnitOfWorkProvider } from '../shared';
import { LoginController, SignUpController } from './controllers';
import { HashProvider } from './providers/hash.provider';
import { JwtTokenProvider } from './providers/jwt-token.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';
import { SignUpService } from './services/sign-up.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      UserEntity,
      PasswordEntity,
      RefreshTokenEntity,
    ]),
  ],
  controllers: [LoginController, SignUpController],
  providers: [
    SignUpService,
    HashProvider,
    CheckDuplicateAccountByEmailRepository,
    CreateAccountRepository,
    UnitOfWorkProvider,
    JwtTokenProvider,
    RefreshTokenProvider,
    JwtService,
    CreateRefreshTokenRepository,
    GetRefreshTokenRepository,
  ],
})
export class AuthModule {}
