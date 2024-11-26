import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDomain } from 'src/core/domain';
import { Repository } from 'typeorm';

import { IGetAccountByEmailRepository } from '../../../../core';
import { AccountEntity } from '../../entities';

@Injectable()
export class GetAccountByEmailRepository
  implements IGetAccountByEmailRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}
  public async execute(email: string): Promise<AccountDomain | null> {
    return this.accountRepository.findOne({
      relations: {
        user: true,
        password: true,
      },
      where: { email },
    });
  }
}
