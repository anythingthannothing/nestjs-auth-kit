import { Inject, Injectable } from '@nestjs/common';
import { AccountDomain } from 'src/core/domain';

import {
  CreateAccountRepositoryInput,
  ICreateAccountRepository,
} from '../../../../core';
import { DbContextProvider } from '../../../../framework/shared/providers/db-context.provider';
import { AccountEntity, PasswordEntity, UserEntity } from '../../entities';

@Injectable()
export class CreateAccountRepository implements ICreateAccountRepository {
  constructor(
    @Inject(DbContextProvider)
    private readonly dbContextProvider: DbContextProvider,
  ) {}

  public async execute({
    email,
    password,
  }: CreateAccountRepositoryInput): Promise<AccountDomain> {
    const accountRepository =
      this.dbContextProvider.getRepository(AccountEntity);
    const newAccount = accountRepository.create({ email });

    newAccount.user = this.dbContextProvider.getRepository(UserEntity).create();
    newAccount.password = this.dbContextProvider
      .getRepository(PasswordEntity)
      .create({ password });

    await this.dbContextProvider.getRepository(AccountEntity).save(newAccount);

    return newAccount;
  }
}
