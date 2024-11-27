import { AccountDomain } from './account.domain';

export enum OauthProviderEnum {
  google = 'google',
  apple = 'apple',
}

export interface OauthProviderDomain {
  oauthProviderType: OauthProviderEnum;
  oauthProviderId: string;
  accountId: number;
  account: AccountDomain;
}
