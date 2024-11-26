import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IJwtTokenProvider } from '../../../core';
import { authConst } from '../../shared';
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

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException();
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
