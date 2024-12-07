import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionCode } from './exception-code';

export class CustomHttpException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    public readonly code: ExceptionCode,
    public readonly infos: Record<string, any> | null = null,
  ) {
    super(message, statusCode);
    this.code = code;
  }
}
