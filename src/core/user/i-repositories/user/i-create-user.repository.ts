import { UserDomain } from '../../../domain';
import { ICreateEntityRepository } from '../../../i-repositories/base';

export type ICreateUserRepository = ICreateEntityRepository<UserDomain>;
