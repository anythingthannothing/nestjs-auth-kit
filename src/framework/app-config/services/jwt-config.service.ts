import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { tokenEnv } from '../envs';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
  ) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      global: true,
      secret: this.tokenConfig.jwtSecret,
      signOptions: {
        expiresIn: this.tokenConfig.jwtExpiresInSeconds,
      },
      verifyOptions: {
        ignoreExpiration: true,
      },
    };
  }
}
