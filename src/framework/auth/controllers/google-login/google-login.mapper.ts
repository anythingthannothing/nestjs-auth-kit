import { OauthLoginServiceInput } from '../../../../core';
import { OauthProviderEnum } from '../../../../core/domain';
import { GoogleUserInfo } from '../../guards';

export const googleLoginMapper = {
  mapToOauthLoginServiceInput(dto: GoogleUserInfo): OauthLoginServiceInput {
    return new OauthLoginServiceInput(
      dto.email,
      OauthProviderEnum.google,
      dto.googleId,
      undefined,
      dto.picture,
    );
  },
};
