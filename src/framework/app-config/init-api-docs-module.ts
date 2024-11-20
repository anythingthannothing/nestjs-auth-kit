import { NestiaSwaggerComposer } from '@nestia/sdk';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

export const initApiDocsModule = async (
  app: INestApplication,
  port: number,
) => {
  const document = await NestiaSwaggerComposer.document(app, {
    openapi: '3.1',
    servers: [{ url: `http://localhost:${port}`, description: 'Staging' }],
    info: {
      title: 'NestJS Auth Kit',
    },
  });
  SwaggerModule.setup('api-docs', app, document as any);
};
