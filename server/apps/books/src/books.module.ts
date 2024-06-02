import { AuthorModule } from '@app/author/author.module';
import { CacheModule } from '@app/cache';
import { PrismaModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { CategoriesModule } from 'apps/categories/src/categories.module';
import { OrderModule } from 'apps/orders/src/order.module';
import { BookRepository } from './books.repository';
import { BookResolver } from './books.resolver';
import { BookService } from './books.service';

@Module({
  imports: [
    PrismaModule,
    OrderModule,
    CategoriesModule,
    AuthorModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [BookService, BookRepository, BookResolver],
  exports: [BookService],
})
export class BooksModule {}
