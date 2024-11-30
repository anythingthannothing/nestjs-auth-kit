import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { authConst } from '../../shared';

const isProduction = process.env.NODE_ENV === 'production';

const tokenCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: isProduction ? 'strict' : 'none',
  domain: isProduction ? '.example.com' : '',
  path: '/',
  maxAge: 31536000000,
} as const;

@Injectable()
export class SetAccessTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.headers[authConst.X_PLATFORM_KEY] === 'app') {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse() as Response;

    return next.handle().pipe(
      map(({ accessToken, tokenExpiresInSeconds }) => {
        response.cookie('Authorization', accessToken, tokenCookieOptions);
        return { tokenExpiresInSeconds };
      }),
    );
  }
}
