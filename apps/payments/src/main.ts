import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(PaymentsModule);
  const configService: ConfigService = app.get(ConfigService);

  app.connectMicroservice({
    // RabbitMQ runs asynchronously so it doesn't overload like the TCP connection
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'payments',
      // Retries every time, bc the broker never gets the acknowledgement
      noAck: false,
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
