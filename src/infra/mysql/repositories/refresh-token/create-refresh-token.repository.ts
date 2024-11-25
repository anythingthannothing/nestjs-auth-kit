import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenDomain } from 'src/core/domain';
import { Repository } from 'typeorm';

import {
  CreateRefreshTokenRepositoryInput,
  ICreateRefreshTokenRepository,
} from '../../../../core';
import { RefreshTokenEntity } from '../../entities';

@Injectable()
export class CreateRefreshTokenRepository
  implements ICreateRefreshTokenRepository
{
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  public async execute(
    dto: CreateRefreshTokenRepositoryInput,
  ): Promise<RefreshTokenDomain> {
    return this.refreshTokenRepository.save(dto);
  }
}
