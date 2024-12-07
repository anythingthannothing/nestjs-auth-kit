import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { CustomHttpException } from '../../shared';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter
  implements ExceptionFilter<CustomHttpException>
{
  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      code: exception.code,
      message: exception.message,
    });

    //   TODO: Handling custom http exception
    console.log(exception.infos);
  }
}
