import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from 'src/core/domain';

import {
  ICheckDuplicateAccountByEmailRepository,
  ICreateAccountRepository,
  IHashProvider,
  ISignUpService,
  SignUpServiceInput,
} from '../../../core';
import {
  CheckDuplicateAccountByEmailRepository,
  CreateAccountRepository,
} from '../../../infra/mysql';
import { HashProvider } from '../providers/hash.provider';

@Injectable()
export class SignUpService implements ISignUpService {
  constructor(
    @Inject(CheckDuplicateAccountByEmailRepository)
    private readonly checkDuplicateAccountByEmailRepository: ICheckDuplicateAccountByEmailRepository,
    @Inject(HashProvider) private readonly hashProvider: IHashProvider,
    @Inject(CreateAccountRepository)
    private readonly createAccountRepository: ICreateAccountRepository,
  ) {}

  public async execute(dto: SignUpServiceInput): Promise<UserDomain> {
    const { email, password } = dto;

    await this.checkDuplicateAccountByEmailRepository.execute(email);

    const hashedPassword = await this.hashProvider.hash(password);

    const newAccount = await this.createAccountRepository.execute(
      dto.mapToCreateAccountRepositoryInput(hashedPassword),
    );
    return newAccount.user;
  }
}
