import 'express';

declare module 'express' {
  interface Request {
    ['accessToken']: string;
    ['request-user']: unknown;
    ['RefreshToken']: string;
    ['google-user']: unknown;
  }
}
