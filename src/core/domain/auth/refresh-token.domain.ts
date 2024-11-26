import { UserDomain } from '../user';

export interface RefreshTokenDomain {
  refreshTokenId: string;
  userId: number;
  token: string;
  expiresAt: number;
  user: UserDomain;
}
