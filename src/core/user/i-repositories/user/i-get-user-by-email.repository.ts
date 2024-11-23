import { UserDomain } from '../../../domain';
import { IGetEntityRepository } from '../../../i-repositories';

export type IGetUserByEmailRepository = IGetEntityRepository<
  string,
  UserDomain
>;
