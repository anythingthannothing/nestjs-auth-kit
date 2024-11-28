import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { authConst } from '../../shared';
import { checkIsApp } from '../../shared/lib/utils/check-is-app';

const tokenCookieOptions = {
  maxAge: 0,
} as const;

@Injectable()
export class ClearCookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (checkIsApp(request[authConst.X_PLATFORM_KEY])) {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse() as Response;

    return next.handle().pipe(
      map(() => {
        response.cookie('Authorization', '', tokenCookieOptions);
        response.cookie('RefreshToken', '', tokenCookieOptions);
        return;
      }),
    );
  }
}
