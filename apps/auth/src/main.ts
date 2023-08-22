import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AuthModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));
  await app.listen(3022);
}
bootstrap();
