import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountEntity,
  CheckDuplicateAccountByEmailRepository,
  CreateAccountRepository,
  CreateOauthAccountRepository,
  CreateRefreshTokenRepository,
  GetAccountByEmailRepository,
  GetOauthAccountByEmailRepository,
  GetRefreshTokenRepository,
  PasswordEntity,
  RefreshTokenEntity,
  UserEntity,
} from '../../infra/mysql';
import { JwtConfigService } from '../app-config/services';
import { DbContextProvider, UnitOfWorkProvider } from '../shared';
import {
  GoogleLoginController,
  LoginController,
  LogoutController,
  RefreshTokenController,
  SignUpController,
} from './controllers';
import { AccessTokenGuard } from './guards';
import {
  HashProvider,
  JwtTokenProvider,
  RefreshTokenProvider,
} from './providers';
import { GoogleLoginService, LoginService, SignUpService } from './services';

const controllers = [
  LoginController,
  SignUpController,
  GoogleLoginController,
  LogoutController,
];

const providers = [
  HashProvider,
  JwtTokenProvider,
  UnitOfWorkProvider,
  DbContextProvider,
  RefreshTokenProvider,
];

const services = [LoginService, SignUpService, GoogleLoginService];

const repositories = [
  CheckDuplicateAccountByEmailRepository,
  CreateAccountRepository,
  CreateRefreshTokenRepository,
  GetRefreshTokenRepository,
  GetAccountByEmailRepository,
  GetOauthAccountByEmailRepository,
  CreateOauthAccountRepository,
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
  controllers: [...controllers, RefreshTokenController],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    ...providers,
    ...services,
    ...repositories,
  ],
})
export class AuthModule {}
