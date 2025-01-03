import { Inject, Injectable } from '@nestjs/common';
import { AccountDomain, UserDomain } from 'src/core/domain';

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
import {
  ExceptionCode,
  throwConflictException,
  UnitOfWorkProvider,
} from '../../shared';
import { HashProvider } from '../providers';

@Injectable()
export class SignUpService implements ISignUpService {
  constructor(
    @Inject(CheckDuplicateAccountByEmailRepository)
    private readonly checkDuplicateAccountByEmailRepository: ICheckDuplicateAccountByEmailRepository,
    @Inject(HashProvider) private readonly hashProvider: IHashProvider,
    @Inject(CreateAccountRepository)
    private readonly createAccountRepository: ICreateAccountRepository,
    @Inject(UnitOfWorkProvider)
    private readonly unitOfWorkProvider: UnitOfWorkProvider,
  ) {}

  public async execute(dto: SignUpServiceInput): Promise<UserDomain> {
    const { email, password } = dto;

    const isDuplicate =
      await this.checkDuplicateAccountByEmailRepository.execute(email);

    if (isDuplicate) {
      throwConflictException(
        'This email is already registered. How about trying a different one?',
        ExceptionCode.DUPLICATE_EMAIL,
      );
    }

    const hashedPassword = await this.hashProvider.hash(password);

    const newAccount = await this.unitOfWorkProvider.commit<AccountDomain>(
      async () => {
        return await this.createAccountRepository.execute(
          dto.mapToCreateAccountRepositoryInput(hashedPassword),
        );
      },
    );

    return newAccount.user;
  }
}
