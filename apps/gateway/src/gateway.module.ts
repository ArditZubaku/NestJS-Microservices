import { AUTH_SERVICE, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { authContext } from './auth.context';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({
        server: {
          // Will call the authContext function every time a GraphQL request is sent to the gateway
          context: authContext,
        },
        gateway: {
          // The map for all the other subgraphs/GraphQL microservices
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'reservation',
                url: configService.getOrThrow<string>(
                  'RESERVATIONS_GRAPHQL_URL',
                ),
              },
            ],
          }),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    // Gateway microservice will send a request to the Auth microservice using TCP,
    // and it will be authenticated using the JWT process
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.getOrThrow<string>('AUTH_HOST'),
            port: configService.getOrThrow<number>('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
})
export class GatewayModule {}
