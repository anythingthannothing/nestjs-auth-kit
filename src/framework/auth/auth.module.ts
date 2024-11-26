import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountEntity,
  CheckDuplicateAccountByEmailRepository,
  CreateAccountRepository,
  CreateRefreshTokenRepository,
  GetAccountByEmailRepository,
  GetRefreshTokenRepository,
  PasswordEntity,
  RefreshTokenEntity,
  UserEntity,
} from '../../infra/mysql';
import { JwtConfigService } from '../app-config/services';
import { UnitOfWorkProvider } from '../shared';
import { LoginController, SignUpController } from './controllers';
import { AccessTokenGuard } from './guards';
import {
  HashProvider,
  JwtTokenProvider,
  RefreshTokenProvider,
} from './providers';
import { LoginService, SignUpService } from './services';

const controllers = [LoginController, SignUpController];

const providers = [
  HashProvider,
  JwtTokenProvider,
  UnitOfWorkProvider,
  RefreshTokenProvider,
];

const services = [LoginService, SignUpService];

const repositories = [
  CheckDuplicateAccountByEmailRepository,
  CreateAccountRepository,
  CreateRefreshTokenRepository,
  GetRefreshTokenRepository,
  GetAccountByEmailRepository,
];

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
  controllers: [...controllers],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    ...providers,
    ...services,
    ...repositories,
  ],
})
export class AuthModule {}
