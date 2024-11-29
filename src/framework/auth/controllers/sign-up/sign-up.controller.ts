import { TypedBody } from '@nestia/core';
import { Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  IJwtTokenProvider,
  IRefreshTokenProvider,
  ISignUpService,
} from '../../../../core';
import { tokenEnv } from '../../../app-config/envs';
import { Public } from '../../../shared';
import { SetCookiesInterceptor } from '../../interceptors';
import { authEndPointsConst } from '../../lib';
import { JwtTokenProvider, RefreshTokenProvider } from '../../providers';
import { SignUpService } from '../../services';
import { ISignUpReqDto } from './i-sign-up.req.dto';
import { ISignUpResDto } from './i-sign-up-res.dto';
import { signUpMapper } from './sign-up.mapper';

@Controller()
export class SignUpController {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
    @Inject(SignUpService)
    private readonly signUpService: ISignUpService,
    @Inject(JwtTokenProvider)
    private readonly jwtTokenProvider: IJwtTokenProvider,
    @Inject(RefreshTokenProvider)
    private readonly refreshTokenProvider: IRefreshTokenProvider,
  ) {}

  @Public()
  @Post(authEndPointsConst.SIGN_UP)
  @UseInterceptors(SetCookiesInterceptor)
  public async execute(
    @TypedBody() body: ISignUpReqDto,
  ): Promise<ISignUpResDto> {
    const user = await this.signUpService.execute(
      signUpMapper.mapToSignUpServiceInput(body),
    );

    const accessTokenPromise = this.jwtTokenProvider.sign({
      userId: user.userId,
    });

    const refreshTokenPromise = this.refreshTokenProvider.generate(user.userId);

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
      tokenExpiresInSeconds:
        Math.floor(Date.now() / 1000) + this.tokenConfig.jwtExpiresInSeconds,
    };
  }
}
