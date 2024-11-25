import { RefreshTokenDomain } from '../../domain';
import { IGetEntityRepository } from '../../i-repositories';

export class GetRefreshTokenRepositoryInput {
  userId: number;
  token: string;
}

export type IGetRefreshTokenRepository = IGetEntityRepository<
  GetRefreshTokenRepositoryInput,
  RefreshTokenDomain
>;
