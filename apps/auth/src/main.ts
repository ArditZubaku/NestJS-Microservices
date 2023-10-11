import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AuthModule);
  // app.get allows us to retrieve any injectable
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/auth.proto'),
      url: configService.getOrThrow('AUTH_GRPC_URL'),
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
