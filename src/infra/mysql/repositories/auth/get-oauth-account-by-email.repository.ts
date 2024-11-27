import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AccountDomain,
  IGetOauthAccountByEmailRepository,
} from '../../../../core';
import { AccountEntity } from '../../entities';

@Injectable()
export class GetOauthAccountByEmailRepository
  implements IGetOauthAccountByEmailRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  public async execute(email: string): Promise<AccountDomain | null> {
    return await this.accountRepository.findOne({
      relations: {
        user: true,
        oauthProviders: true,
      },
      where: { email },
    });
  }
}
