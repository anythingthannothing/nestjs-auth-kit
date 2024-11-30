import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { IJwtTokenProvider, IRefreshTokenProvider } from '../../../core';
import { authConst, checkIsApp } from '../../shared';
import { PlatformType } from '../../shared/types';
import {
  JwtPayload,
  JwtTokenProvider,
  RefreshTokenProvider,
} from '../providers';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject(JwtTokenProvider)
    private readonly jwtTokenProvider: IJwtTokenProvider,
    @Inject(RefreshTokenProvider)
    private readonly refreshTokenProvider: IRefreshTokenProvider,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const refreshToken = checkIsApp(
      request.headers[authConst.X_PLATFORM_KEY] as PlatformType,
    )
      ? request.headers[authConst.REFRESH_TOKEN_KEY]
      : request.cookies[authConst.REFRESH_TOKEN_KEY];

    if (typeof refreshToken !== 'string') {
      return false;
    }

    const accessToken = checkIsApp(
      request.headers[authConst.X_PLATFORM_KEY] as PlatformType,
    )
      ? request.headers.authorization
      : request.cookies[authConst.AUTHORIZATION_KEY];

    const decodedData =
      await this.jwtTokenProvider.decode<JwtPayload>(accessToken);

    const isRefreshTokenVerified = await this.refreshTokenProvider.verify({
      userId: decodedData.userId,
      token: refreshToken,
    });

    if (!isRefreshTokenVerified) {
      return false;
    }

    request[authConst.ACCESS_TOKEN_KEY] = await this.jwtTokenProvider.sign({
      userId: decodedData.userId,
    });

    return true;
  }
}
