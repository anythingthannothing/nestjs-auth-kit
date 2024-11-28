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

import { googleOauthEnv } from '../../app-config/envs';
import { oauthConst } from '../lib';

const oauthClient = new OAuth2Client();

@Injectable()
export class GoogleGuard implements CanActivate {
  constructor(
    @Inject(googleOauthEnv.KEY)
    private readonly googleOauthConfig: ConfigType<typeof googleOauthEnv>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // const platform = request.headers[authConst.X_PLATFORM_KEY];

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
      given_name,
      family_name,
      googleId,
    };

    return true;
  }
}

export interface GoogleUserInfo {
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
  googleId: string;
}
