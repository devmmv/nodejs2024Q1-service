import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = parse(
    await readFile(join(__dirname, '../doc', 'api.yaml'), 'utf-8'),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
}
bootstrap();
