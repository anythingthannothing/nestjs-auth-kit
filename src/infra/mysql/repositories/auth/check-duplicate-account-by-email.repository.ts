import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICheckDuplicateAccountByEmailRepository } from '../../../../core';
import { AccountEntity } from '../../entities';

@Injectable()
export class CheckDuplicateAccountByEmailRepository
  implements ICheckDuplicateAccountByEmailRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  public async execute(email: string): Promise<boolean> {
    return this.accountRepository.existsBy({ email });
  }
}
