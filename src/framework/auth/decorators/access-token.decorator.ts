import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { authConst } from '../../shared';

export const AccessToken = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[authConst.ACCESS_TOKEN_KEY];
  },
);
