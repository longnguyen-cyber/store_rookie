import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { PrismaModule } from '@app/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ReviewRepository } from './reviews.repository';
import { ReviewsResolver } from './reviews.resolver';

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
  providers: [ReviewsService, ReviewRepository, ReviewsResolver],
  exports: [ReviewsService],
})
export class ReviewsModule {}
