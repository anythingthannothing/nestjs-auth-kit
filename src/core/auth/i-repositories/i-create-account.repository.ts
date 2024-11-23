import { AccountDomain } from '../../domain';
import { ICreateEntityRepository } from '../../i-repositories';

export class CreateAccountRepositoryInput {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export type ICreateAccountRepository = ICreateEntityRepository<
  CreateAccountRepositoryInput,
  AccountDomain
>;
