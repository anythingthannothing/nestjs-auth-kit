import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './framework/app.module';
import { initApiDocsModule } from './framework/app-config/init-api-docs-module';
import { throwIfInvalidUrl } from './framework/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const corsOrigins = (
    configService.get<string>('CORS_ORIGINS') as string
  ).split(',');

  for (const corsOrigin of corsOrigins) {
    throwIfInvalidUrl(corsOrigin);
  }

  app.enableCors({ origin: corsOrigins, credentials: true });

  const port = +(configService.get<string>('PORT') as string);

  await initApiDocsModule(app, port);

  await app.listen(port);
}

bootstrap();
