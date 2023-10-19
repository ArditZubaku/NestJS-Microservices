import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({
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
  ],
})
export class GatewayModule {}
