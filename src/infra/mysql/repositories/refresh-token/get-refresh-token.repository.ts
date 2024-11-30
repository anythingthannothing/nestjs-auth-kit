import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import {
  GetRefreshTokenRepositoryInput,
  IGetRefreshTokenRepository,
  RefreshTokenDomain,
} from '../../../../core';
import { RefreshTokenEntity } from '../../entities';

@Injectable()
export class GetRefreshTokenRepository implements IGetRefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  public async execute(
    dto: GetRefreshTokenRepositoryInput,
  ): Promise<RefreshTokenDomain | null> {
    return this.refreshTokenRepository.findOneBy({
      userId: dto.userId,
      token: dto.token,
      expiresAt: MoreThan(Math.floor(Date.now() / 1000)),
    });
  }
}
