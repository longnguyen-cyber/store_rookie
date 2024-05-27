import { CacheModule } from '@app/cache';
import { PrismaModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from 'apps/auth/src/auth.module';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';

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
  providers: [CartService, CartResolver, CartRepository],
  exports: [CartService],
})
export class CartModule {}
