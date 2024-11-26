import { AccountDomain } from '../../domain';
import { IGetEntityRepository } from '../../i-repositories';

export type IGetAccountByEmailRepository = IGetEntityRepository<
  string,
  AccountDomain
>;
