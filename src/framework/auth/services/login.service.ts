import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from 'src/core/domain';

import { IGetAccountByEmailRepository, IHashProvider } from '../../../core';
import { ILoginService, LoginServiceInput } from '../../../core';
import { GetAccountByEmailRepository } from '../../../infra/mysql';
import { ExceptionCode, throwBadRequestException } from '../../shared';
import { HashProvider } from '../providers';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(GetAccountByEmailRepository)
    private readonly getAccountByEmailRepository: IGetAccountByEmailRepository,
    @Inject(HashProvider) private readonly hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: LoginServiceInput): Promise<UserDomain> {
    const account = await this.getAccountByEmailRepository.execute(email);

    if (
      !account ||
      !account.password ||
      !(await this.hashProvider.compare(password, account.password.password))
    ) {
      return throwBadRequestException(
        'Invalid credentials. Please try a different credentials',
        ExceptionCode.INVALID_CREDENTIALS,
      );
    }

    return account.user;
  }
}
