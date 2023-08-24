import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(NotificationsModule);
  const configService: ConfigService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      // To bind to all the available IP adresses on the machine
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
