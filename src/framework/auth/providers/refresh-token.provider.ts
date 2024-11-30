import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  ICreateRefreshTokenRepository,
  IGetRefreshTokenRepository,
  IRefreshTokenProvider,
  VerifyRefreshTokenInput,
} from '../../../core';
import {
  CreateRefreshTokenRepository,
  GetRefreshTokenRepository,
} from '../../../infra/mysql';
import { tokenEnv } from '../../app-config/envs';
import { generateRandomString } from '../../shared';

@Injectable()
export class RefreshTokenProvider implements IRefreshTokenProvider {
  constructor(
    @Inject(tokenEnv.KEY)
    private readonly tokenConfig: ConfigType<typeof tokenEnv>,
    @Inject(CreateRefreshTokenRepository)
    private readonly createRefreshTokenRepository: ICreateRefreshTokenRepository,
    @Inject(GetRefreshTokenRepository)
    private readonly getRefreshTokenRepository: IGetRefreshTokenRepository,
  ) {}

  public async generate(userId: number): Promise<string> {
    const token = generateRandomString(this.tokenConfig.refreshTokenLength);
    const expiresAt =
      Date.now() / 1000 + this.tokenConfig.refreshExpiresInDays * 3600 * 24;

    await this.createRefreshTokenRepository.execute({
      userId,
      token,
      expiresAt,
    });

    return token;
  }
  public async verify(dto: VerifyRefreshTokenInput): Promise<boolean> {
    const refreshToken = await this.getRefreshTokenRepository.execute(dto);

    return refreshToken !== null;
  }
}
