export class VerifyRefreshTokenInput {
  userId: number;
  token: string;
}

export interface IRefreshTokenProvider {
  generate(payload: unknown): Promise<string>;
  verify(token: VerifyRefreshTokenInput): Promise<boolean>;
}
