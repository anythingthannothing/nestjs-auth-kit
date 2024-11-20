import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './framework/app.module';
import { initApiDocsModule } from './framework/app-config/init-api-docs-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get<string>('CORS_ORIGIN')!],
    credentials: true,
  });

  const port = +(configService.get<string>('PORT') as string);

  await initApiDocsModule(app, port);

  await app.listen(port);
}

bootstrap();
