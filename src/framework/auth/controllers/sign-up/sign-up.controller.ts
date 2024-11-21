import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { tokenEnv } from '../../../app-config/envs';
import { authEndPointsConst } from '../../lib';
import { signUpMapper } from './sign-up.mapper';
import { SignUpReqDto } from './sign-up.req.dto';
import { SignUpResDto } from './sign-up-res.dto';

@Controller()
export class SignUpController {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
  ) {}

  @TypedRoute.Post(authEndPointsConst.signUp)
  async execute(@TypedBody() body: SignUpReqDto): Promise<SignUpResDto> {
    return {
      accessToken: '',
      tokenExpiresInSeconds: this.tokenConfig.jwtExpiresInSeconds,
      refreshToken: '',
    };
  }
}
