import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, HttpCode } from '@nestjs/common';

import { authEndPointsConst } from '../../lib';

@Controller()
export class LoginController {
  constructor() {}

  @TypedRoute.Post(authEndPointsConst.login)
  @HttpCode(200)
  public async execute(@TypedBody() body) {
    console.log(body);
  }
}
