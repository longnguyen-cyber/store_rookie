import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaModule } from '@app/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderRepository } from './order.repository';
import { OrderResolver } from './order.resolver';
import { CacheModule } from '@app/cache';
import { AuthModule } from 'apps/auth/src/auth.module';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register(),
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [OrderService, OrderRepository, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
