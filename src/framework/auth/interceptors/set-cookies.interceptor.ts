import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { authConst } from '../../shared';
import { SignUpResDto } from '../controllers/sign-up/sign-up-res.dto';

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
export class SetCookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.headers[authConst.X_PLATFORM_KEY] === 'app') {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse() as Response;

    return next.handle().pipe(
      map(
        ({
          accessToken,
          refreshToken,
          tokenExpiresInSeconds,
        }: SignUpResDto) => {
          response.cookie('Authorization', accessToken, tokenCookieOptions);
          response.cookie(
            'RefreshToken',
            refreshToken.toString(),
            tokenCookieOptions,
          );
          return { tokenExpiresInSeconds };
        },
      ),
    );
  }
}
