import { AccountDomain } from './account.domain';

export enum oauthProviderEnum {
  google = 'google',
  apple = 'apple',
}

export interface OauthProviderDomain {
  oauthProviderType: oauthProviderEnum;
  oauthProviderId: bigint;
  accountId: number;
  account: AccountDomain;
}
