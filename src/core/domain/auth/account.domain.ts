import { UserDomain } from '../user';
import { OauthProviderDomain } from './oauth-provider.domain';
import { PasswordDomain } from './password.domain';

export interface AccountDomain {
  accountId: number;
  // userId: number;
  user: UserDomain;
  email: string;
  deletedAt?: Date;
  password: PasswordDomain;
  oauthProviders: OauthProviderDomain[];
}
