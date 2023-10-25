import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(PaymentsModule);
  const configService: ConfigService = app.get(ConfigService);

  // app.connectMicroservice({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: PAYMENTS_PACKAGE_NAME,
  //     protoPath: join(__dirname, '../../../proto/payments.proto'),
  //     url: configService.getOrThrow('PAYMENTS_GRPC_URL'),
  //   },
  // });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.getOrThrow<number>('PORT_TCP'),
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(configService.getOrThrow<number>('PORT_HTTP'));
}
bootstrap();
