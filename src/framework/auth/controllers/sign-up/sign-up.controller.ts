import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { tokenEnv } from '../../../app-config/envs';
import { authEndPointsConst } from '../../lib';
import { SignUpService } from '../../services/sign-up.service';
import { ISignUpResDto } from './i-sign-up-res.dto';
import { signUpMapper } from './sign-up.mapper';
import { ISignUpReqDto } from './sign-up.req.dto';

@Controller()
export class SignUpController {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
    @Inject(SignUpService)
    private readonly signUpService: SignUpService,
  ) {}

  @TypedRoute.Post(authEndPointsConst.signUp)
  async execute(@TypedBody() body: ISignUpReqDto): Promise<ISignUpResDto> {
    const user = await this.signUpService.execute(
      signUpMapper.mapToSignUpServiceInput(body),
    );

    return {
      accessToken: '',
      tokenExpiresInSeconds: this.tokenConfig.jwtExpiresInSeconds,
      refreshToken: '',
    };
  }
}
