import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { IJwtTokenProvider } from '../../../core';
import {
  authConst,
  checkIsApp,
  ExceptionCode,
  throwUnauthenticatedException,
} from '../../shared';
import { PlatformType } from '../../shared/lib/platform-type';
import { JwtTokenProvider } from '../providers';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(JwtTokenProvider) private readonly jwtService: IJwtTokenProvider,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      authConst.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;

    const token = checkIsApp(
      request.headers[authConst.X_PLATFORM_KEY] as PlatformType,
    )
      ? request.headers.authorization
      : request.cookies[authConst.AUTHORIZATION_KEY];

    if (!token) {
      throwUnauthenticatedException(
        'Session expired. Please login again.',
        ExceptionCode.NO_TOKEN,
      );
    }

    try {
      request[authConst.REQUEST_USER_KEY] = await this.jwtService.verify(token);
    } catch (_) {
      // TODO: add verifying refresh token logic
      return false;
    }

    return true;
  }
}
