import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { CustomHttpException, ExceptionCode } from '../../shared';

@Catch()
export class UncaughtExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    if (exception instanceof CustomHttpException) {
      throw exception;
    }

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      code: ExceptionCode.INTERNAL_SERVER_ERROR,
      message: 'Unexpected error occurred.',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    // TODO: Handling Uncaught error
    console.log(request.url);
  }
}
