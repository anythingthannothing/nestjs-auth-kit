import { AccountDomain } from '../../domain';
import { ICreateEntityRepository } from '../../i-repositories';

export class CreateAccountRepositoryInput {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}
}

export type ICreateAccountRepository = ICreateEntityRepository<
  CreateAccountRepositoryInput,
  AccountDomain
>;
