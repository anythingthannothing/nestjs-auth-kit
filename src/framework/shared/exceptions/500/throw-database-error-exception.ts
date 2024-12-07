import { HttpStatus } from '@nestjs/common';

import { CustomHttpException } from '../custom-http-exception';
import { ExceptionCode } from '../exception-code';

export const throwDatabaseErrorException = (
  options: Record<string, any>,
): never => {
  throw new CustomHttpException(
    'Unexpected error occurred.',
    HttpStatus.INTERNAL_SERVER_ERROR,
    ExceptionCode.INTERNAL_SERVER_ERROR,
    options,
  );
};
