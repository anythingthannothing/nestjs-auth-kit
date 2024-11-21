import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { authConst } from '../lib';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[authConst.REQUEST_USER_KEY];
  },
);
