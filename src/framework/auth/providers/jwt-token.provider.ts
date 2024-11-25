import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IJwtTokenProvider } from '../../../core';

interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}

interface JwtVerifyResult {
  payload: JwtPayload | null;
  isValid: boolean;
  error: 'expired' | 'invalid token' | null;
}

@Injectable()
export class JwtTokenProvider implements IJwtTokenProvider {
  constructor(private readonly jwtService: JwtService) {}

  public async sign(payload: Partial<JwtPayload>): Promise<string> {
    return this.jwtService.sign(payload);
  }
  public async verify(token: string): Promise<JwtVerifyResult> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const isValid = payload.exp > payload.iat;

      return { payload, isValid, error: isValid ? null : 'expired' };
    } catch (_) {
      return { payload: null, isValid: false, error: 'invalid token' };
    }
  }
  public async decode<JwtPayload>(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.decode<JwtPayload>(token);
    } catch (_) {
      throw new BadRequestException();
    }
  }
}
