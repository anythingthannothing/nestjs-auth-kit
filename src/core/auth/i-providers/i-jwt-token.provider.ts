export interface IJwtTokenProvider {
  sign(payload: unknown): Promise<string>;
  verify(token: string): Promise<unknown>;
  decode<Payload>(token: string): Promise<Payload>;
}
