import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import {
  AccountDomain,
  IOauthLoginService,
  OauthLoginServiceInput,
  UserDomain,
} from '../../../core';
import {
  ICreateOauthAccountRepository,
  IGetOauthAccountByEmailRepository,
} from '../../../core';
import {
  CreateOauthAccountRepository,
  GetOauthAccountByEmailRepository,
} from '../../../infra/mysql';
import { UnitOfWorkProvider } from '../../shared';

@Injectable()
export class GoogleLoginService implements IOauthLoginService {
  constructor(
    @Inject(UnitOfWorkProvider)
    private readonly unitOfWorkProvider: UnitOfWorkProvider,
    @Inject(GetOauthAccountByEmailRepository)
    private readonly getOauthAccountByEmailRepository: IGetOauthAccountByEmailRepository,
    @Inject(CreateOauthAccountRepository)
    private readonly createOauthAccountRepository: ICreateOauthAccountRepository,
  ) {}

  public async execute(dto: OauthLoginServiceInput): Promise<UserDomain> {
    const account = await this.getOauthAccountByEmailRepository.execute(
      dto.email,
    );

    if (account && account.oauthProviders.length === 0) {
      throw new BadRequestException();
    }

    if (account) {
      return account.user;
    }

    const newAccount = await this.unitOfWorkProvider.commit<AccountDomain>(
      async () => {
        return await this.createOauthAccountRepository.execute(
          dto.mapToCreateOauthAccountRepositoryInput(),
        );
      },
    );

    return newAccount.user;
  }
}
