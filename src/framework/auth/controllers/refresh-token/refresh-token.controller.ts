import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { tokenEnv } from '../../../app-config/envs';
import { AccessToken } from '../../decorators';
import { RefreshTokenGuard } from '../../guards';
import { SetAccessTokenInterceptor } from '../../interceptors';
import { authEndPointsConst } from '../../lib';

@Controller()
export class RefreshTokenController {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
  ) {}

  @Get(authEndPointsConst.REFRESH_TOKEN)
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(SetAccessTokenInterceptor)
  public async execute(@AccessToken() accessToken: string) {
    return {
      accessToken,
      tokenExpiresAtInSeconds:
        Math.floor(Date.now() / 1000) + this.tokenConfig.jwtExpiresInSeconds,
    };
  }
}
