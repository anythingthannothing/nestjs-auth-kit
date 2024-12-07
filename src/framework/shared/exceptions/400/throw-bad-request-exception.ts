import { HttpStatus } from '@nestjs/common';

import { CustomHttpException } from '../custom-http-exception';
import { ExceptionCode } from '../exception-code';

export const throwBadRequestException = (
  message: string,
  code: ExceptionCode,
  infos?: Record<string, any>,
): never => {
  throw new CustomHttpException(message, HttpStatus.BAD_REQUEST, code, infos);
};
