import { PrismaModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
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
  providers: [CategoriesService, CategoriesRepository, CategoriesResolver],
  exports: [CategoriesService],
})
export class CategoriesModule {}
