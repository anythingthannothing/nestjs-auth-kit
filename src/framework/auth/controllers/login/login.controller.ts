import { TypedBody } from '@nestia/core';
import { Controller, HttpCode, Post } from '@nestjs/common';

import { authEndPointsConst } from '../../lib';

@Controller()
export class LoginController {
  constructor() {}

  @Post(authEndPointsConst.login)
  @HttpCode(200)
  public async execute(@TypedBody() body) {
    console.log(body);
  }
}
