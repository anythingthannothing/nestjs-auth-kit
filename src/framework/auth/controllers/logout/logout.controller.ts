import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { ClearCookiesInterceptor } from '../../interceptors';

@Controller()
export class LogoutController {
  @Get('/auth/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(ClearCookiesInterceptor)
  public execute() {
    return;
  }
}
