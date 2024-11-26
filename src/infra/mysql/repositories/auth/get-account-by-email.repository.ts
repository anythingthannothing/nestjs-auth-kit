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
    return this.accountRepository
      .createQueryBuilder('account')
      .innerJoinAndSelect('account.user', 'user')
      .innerJoinAndSelect('account.password', 'password')
      .where('account.email = :email', { email })
      .andWhere('account.deleted_at IS NULL')
      .getOne();
  }
}
