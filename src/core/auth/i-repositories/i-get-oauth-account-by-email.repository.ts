import { AccountDomain } from '../../domain';
import { IGetEntityRepository } from '../../i-repositories';

export type IGetOauthAccountByEmailRepository = IGetEntityRepository<
  string,
  AccountDomain
>;
