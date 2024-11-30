import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  IJwtTokenProvider,
  IOauthLoginService,
  IRefreshTokenProvider,
} from '../../../../core';
import { tokenEnv } from '../../../app-config/envs';
import { Public } from '../../../shared';
import { GoogleUser } from '../../decorators';
import { GoogleGuard, GoogleUserInfo } from '../../guards';
import { SetCookiesInterceptor } from '../../interceptors';
import { authEndPointsConst } from '../../lib';
import { JwtTokenProvider, RefreshTokenProvider } from '../../providers';
import { GoogleLoginService } from '../../services';
import { ILoginResDto } from '../login/login.res.dto';
import { googleLoginMapper } from './google-login.mapper';

@Controller()
export class GoogleLoginController {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
    @Inject(GoogleLoginService)
    private readonly googleLoginService: IOauthLoginService,
    @Inject(JwtTokenProvider)
    private readonly jwtTokenProvider: IJwtTokenProvider,
    @Inject(RefreshTokenProvider)
    private readonly refreshTokenProvider: IRefreshTokenProvider,
  ) {}

  @Public()
  @Post(authEndPointsConst.GOOGLE_LOGIN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleGuard)
  @UseInterceptors(SetCookiesInterceptor)
  async execute(
    @GoogleUser() googleUserInfo: GoogleUserInfo,
  ): Promise<ILoginResDto> {
    const user = await this.googleLoginService.execute(
      googleLoginMapper.mapToOauthLoginServiceInput(googleUserInfo),
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
