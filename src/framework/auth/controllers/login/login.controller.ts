import { TypedBody } from '@nestia/core';
import {
  Controller,
  HttpCode,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  IJwtTokenProvider,
  ILoginService,
  IRefreshTokenProvider,
} from '../../../../core';
import { tokenEnv } from '../../../app-config/envs';
import { SetCookiesInterceptor } from '../../interceptors';
import { authEndPointsConst } from '../../lib';
import { JwtTokenProvider, RefreshTokenProvider } from '../../providers';
import { LoginService } from '../../services';
import { ILoginReqDto } from './login.req.dto';
import { ILoginResDto } from './login.res.dto';

@Controller()
export class LoginController {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
    @Inject(LoginService) private readonly loginService: ILoginService,
    @Inject(JwtTokenProvider)
    private readonly jwtTokenProvider: IJwtTokenProvider,
    @Inject(RefreshTokenProvider)
    private readonly refreshTokenProvider: IRefreshTokenProvider,
  ) {}

  @Post(authEndPointsConst.login)
  @UseInterceptors(SetCookiesInterceptor)
  @HttpCode(200)
  public async execute(@TypedBody() body: ILoginReqDto): Promise<ILoginResDto> {
    const user = await this.loginService.execute(body);

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
