import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AuthModule);
  // app.get allows us to retrieve any injectable
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'auth',
    },
  });

  // Middleware
  // Parses the incoming cookies in to the request object
  // Use it before validation
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get<Logger>(Logger));

  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
