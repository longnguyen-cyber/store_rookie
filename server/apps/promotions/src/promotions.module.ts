import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PrismaModule } from '@app/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PromotionRepository } from './promotions.repository';
import { PromotionsResolver } from './promotions.resolver';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [PromotionsService, PromotionRepository, PromotionsResolver],
  exports: [PromotionsService],
})
export class PromotionsModule {}
