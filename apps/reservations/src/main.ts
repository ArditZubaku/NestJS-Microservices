import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get<Logger>(Logger));
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
