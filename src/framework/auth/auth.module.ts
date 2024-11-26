import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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
import { JwtConfigService } from '../app-config/services';
import { UnitOfWorkProvider } from '../shared';
import { LoginController, SignUpController } from './controllers';
import {
  HashProvider,
  JwtTokenProvider,
  RefreshTokenProvider,
} from './providers';
import { SignUpService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      UserEntity,
      PasswordEntity,
      RefreshTokenEntity,
    ]),
    JwtModule.registerAsync({
      inject: [JwtConfigService],
      useClass: JwtConfigService,
    }),
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
    CreateRefreshTokenRepository,
    GetRefreshTokenRepository,
  ],
})
export class AuthModule {}
