import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
import { createAssert } from 'typia';

import { googleOauthEnv } from '../../app-config/envs';
import { authConst } from '../../shared';
import { checkIsApp } from '../../shared';
import { PlatformType } from '../../shared/lib/platform-type';
import { IGoogleLoginReqDto } from '../controllers';
import { oauthConst } from '../lib';

const oauthClient = new OAuth2Client();

@Injectable()
export class GoogleGuard implements CanActivate {
  constructor(
    @Inject(googleOauthEnv.KEY)
    private readonly googleOauthConfig: ConfigType<typeof googleOauthEnv>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest() as Request;
    const platform = request.headers[authConst.X_PLATFORM_KEY] as PlatformType;

    // Oauth logic for ios or android
    if (checkIsApp(platform)) {
      const assert = createAssert<IGoogleLoginReqDto>();
      assert(request.body);
      request[oauthConst.GOOGLE_USER] = request.body;
      return true;
    }

    // Oauth logic for web(with @react-oauth/google library)
    const { credential } = request.body;
    const audience = this.googleOauthConfig.googleClientId;

    let ticket: LoginTicket;

    try {
      ticket = await oauthClient.verifyIdToken({
        idToken: credential,
        audience,
      });
    } catch (err) {
      return false;
    }

    const payload = ticket.getPayload();

    const {
      email,
      picture,
      given_name,
      family_name,
      sub: googleId,
    } = payload as TokenPayload;

    request[oauthConst.GOOGLE_USER] = {
      email,
      picture,
      givenName: given_name,
      familyName: family_name,
      googleId,
    };

    return true;
  }
}

export interface GoogleUserInfo {
  email: string;
  picture: string;
  givenName: string;
  familyName: string;
  googleId: string;
}
