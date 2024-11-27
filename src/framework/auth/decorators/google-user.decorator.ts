import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { oauthConst } from '../lib';

export const GoogleUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[oauthConst.GOOGLE_USER];
  },
);
