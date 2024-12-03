import { ConflictException, Injectable } from '@nestjs/common';
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
    const duplicate = await this.accountRepository.existsBy({ email });

    if (duplicate) {
      throw new ConflictException();
    }

    return false;
  }
}
