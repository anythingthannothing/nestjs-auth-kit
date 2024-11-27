import {
  AccountDomain,
  OauthProviderDomain,
  OauthProviderEnum,
  UserDomain,
} from '../../domain';
import { ICreateEntityRepository } from '../../i-repositories';

export class CreateOauthAccountRepositoryInput {
  constructor(
    private readonly email: string,
    private readonly oauthProviderType: OauthProviderEnum,
    private readonly oauthProviderId: string,
    private readonly nickname?: string,
    private readonly thumbnailUrl?: string,
  ) {}

  mapToAccountDomain(): Partial<AccountDomain> {
    return {
      email: this.email,
    };
  }

  mapToUserDomain(): Partial<UserDomain> {
    return {
      nickname: this.nickname,
      thumbnailUrl: this.thumbnailUrl,
    };
  }

  mapToOauthProvider(): Partial<OauthProviderDomain> {
    return {
      oauthProviderType: this.oauthProviderType,
      oauthProviderId: this.oauthProviderId,
    };
  }
}

export type ICreateOauthAccountRepository = ICreateEntityRepository<
  CreateOauthAccountRepositoryInput,
  AccountDomain
>;
