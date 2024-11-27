import { OauthProviderEnum, UserDomain } from '../../domain';
import { CreateOauthAccountRepositoryInput } from '../i-repositories';

export class OauthLoginServiceInput {
  constructor(
    public readonly email: string,
    public readonly oauthProviderType: OauthProviderEnum,
    public readonly oauthProviderId: string,
    public readonly nickname?: string,
    public readonly thumbnailUrl?: string,
  ) {}

  public mapToCreateOauthAccountRepositoryInput =
    (): CreateOauthAccountRepositoryInput => {
      return new CreateOauthAccountRepositoryInput(
        this.email,
        this.oauthProviderType,
        this.oauthProviderId,
        this.nickname,
        this.thumbnailUrl,
      );
    };
}

export interface IOauthLoginService {
  execute(dto: OauthLoginServiceInput): Promise<UserDomain>;
}
