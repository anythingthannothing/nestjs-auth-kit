import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDomain } from 'src/core/domain';
import { Repository } from 'typeorm';

import {
  CreateAccountRepositoryInput,
  ICreateAccountRepository,
} from '../../../../core';
import { AccountEntity, PasswordEntity, UserEntity } from '../../entities';

@Injectable()
export class CreateAccountRepository implements ICreateAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PasswordEntity)
    private readonly passwordRepository: Repository<PasswordEntity>,
  ) {}

  public async execute({
    email,
    password,
  }: CreateAccountRepositoryInput): Promise<AccountDomain> {
    const newAccount = this.accountRepository.create({ email });

    newAccount.user = this.userRepository.create();
    newAccount.password = this.passwordRepository.create({ password });

    await this.accountRepository.save(newAccount);

    return newAccount;
  }
}
