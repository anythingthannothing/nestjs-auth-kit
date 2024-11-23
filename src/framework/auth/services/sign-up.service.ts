import { Injectable } from '@nestjs/common';
import { UserDomain } from 'src/core/domain';

import {
  ICheckDuplicateUserByEmailRepository,
  ICreateAccountRepository,
  IHashProvider,
  ISignUpService,
  SignUpServiceInput,
} from '../../../core';

@Injectable()
export class SignUpService implements ISignUpService {
  constructor(
    private readonly checkDuplicateUserByEmailRepository: ICheckDuplicateUserByEmailRepository,
    private readonly hashProvider: IHashProvider,
    private readonly createAccountRepository: ICreateAccountRepository,
  ) {}
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
