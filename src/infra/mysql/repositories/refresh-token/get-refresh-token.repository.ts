import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';

import {
  GetRefreshTokenRepositoryInput,
  IGetRefreshTokenRepository,
} from '../../../../core';
import { RefreshTokenDomain } from '../../../../core/domain';
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
      expiresAt: LessThan(Date.now() / 1000),
    });
  }
}
