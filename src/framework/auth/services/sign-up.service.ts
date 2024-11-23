import { Inject, Injectable } from '@nestjs/common';
import { UserDomain } from 'src/core/domain';

import {
  ICheckDuplicateUserByEmailRepository,
  ICreateAccountRepository,
  IHashProvider,
  ISignUpService,
  SignUpServiceInput,
} from '../../../core';
import { CheckDuplicateUserByEmailRepository } from '../../../infra/mysql';
import { CreateAccountRepository } from '../../../infra/mysql/repositories/auth';
import { Transactional } from '../../shared';
import { HashProvider } from '../providers/hash.provider';

@Injectable()
export class SignUpService implements ISignUpService {
  constructor(
    @Inject(CheckDuplicateUserByEmailRepository)
    private readonly checkDuplicateUserByEmailRepository: ICheckDuplicateUserByEmailRepository,
    @Inject(HashProvider) private readonly hashProvider: IHashProvider,
    @Inject(CreateAccountRepository)
    private readonly createAccountRepository: ICreateAccountRepository,
  ) {}

  @Transactional()
  public async execute(dto: SignUpServiceInput): Promise<UserDomain> {
    const { email, password } = dto;

    await this.checkDuplicateUserByEmailRepository.execute(email);

    const hashedPassword = await this.hashProvider.hash(password);

    const newAccount = await this.createAccountRepository.execute(
      dto.mapToCreateAccountRepositoryInput(hashedPassword),
    );

    return newAccount.user;
  }
}
