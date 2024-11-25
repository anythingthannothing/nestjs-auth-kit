import { RefreshTokenDomain } from '../../domain';
import { ICreateEntityRepository } from '../../i-repositories';

export class CreateRefreshTokenRepositoryInput {
  userId: number;
  token: string;
  expiresAt: number;
}

export type ICreateRefreshTokenRepository = ICreateEntityRepository<
  CreateRefreshTokenRepositoryInput,
  RefreshTokenDomain
>;
