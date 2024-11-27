import { Inject, Injectable } from '@nestjs/common';
import { AccountDomain } from 'src/core/domain';

import {
  CreateOauthAccountRepositoryInput,
  ICreateOauthAccountRepository,
} from '../../../../core';
import { DbContextProvider } from '../../../../framework/shared';
import { AccountEntity, OauthProviderEntity, UserEntity } from '../../entities';

@Injectable()
export class CreateOauthAccountRepository
  implements ICreateOauthAccountRepository
{
  constructor(
    @Inject(DbContextProvider)
    private readonly dbContextProvider: DbContextProvider,
  ) {}

  public async execute(
    dto: CreateOauthAccountRepositoryInput,
  ): Promise<AccountDomain> {
    const accountRepository =
      this.dbContextProvider.getRepository(AccountEntity);
    const newAccount = accountRepository.create(dto.mapToAccountDomain());

    newAccount.user = this.dbContextProvider
      .getRepository(UserEntity)
      .create(dto.mapToUserDomain());
    newAccount.oauthProviders = [
      this.dbContextProvider
        .getRepository(OauthProviderEntity)
        .create(dto.mapToOauthProvider()),
    ];

    await accountRepository.save(newAccount);

    return newAccount;
  }
}
