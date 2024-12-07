import { HttpStatus } from '@nestjs/common';

import { CustomHttpException } from '../custom-http-exception';
import { ExceptionCode } from '../exception-code';

export const throwNotFoundException = (
  message: string,
  code: ExceptionCode,
): never => {
  throw new CustomHttpException(message, HttpStatus.NOT_FOUND, code);
};
