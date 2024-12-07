import { HttpStatus } from '@nestjs/common';

import { CustomHttpException } from '../custom-http-exception';
import { ExceptionCode } from '../exception-code';

export const throwUnauthenticatedException = (
  message: string,
  code: ExceptionCode,
): never => {
  throw new CustomHttpException(message, HttpStatus.UNAUTHORIZED, code);
};
