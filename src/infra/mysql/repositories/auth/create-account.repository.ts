import { Inject, Injectable } from '@nestjs/common';
import { AccountDomain } from 'src/core/domain';
import { DataSource } from 'typeorm';

import {
  CreateAccountRepositoryInput,
  ICreateAccountRepository,
  IUnitOfWorkProvider,
} from '../../../../core';
import { UnitOfWorkProvider } from '../../../../framework/shared';
import { AccountEntity, PasswordEntity, UserEntity } from '../../entities';

@Injectable()
export class CreateAccountRepository implements ICreateAccountRepository {
  constructor(
    @Inject(UnitOfWorkProvider)
    private readonly unitOfWorkProvider: IUnitOfWorkProvider<DataSource>,
  ) {}

  public async execute({
    email,
    password,
  }: CreateAccountRepositoryInput): Promise<AccountDomain> {
    const dataSource = this.unitOfWorkProvider.dataSource;
    const newAccount = dataSource
      .getRepository(AccountEntity)
      .create({ email });

    newAccount.user = dataSource.getRepository(UserEntity).create();
    newAccount.password = dataSource
      .getRepository(PasswordEntity)
      .create({ password });

    await dataSource.getRepository(AccountEntity).save(newAccount);

    return newAccount;
  }
}
