import { PrismaModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BookService } from './books.service';
import { BookRepository } from './books.repository';
import { BookResolver } from './books.resolver';
import { OrderModule } from 'apps/orders/src/order.module';
import { CategoriesModule } from 'apps/categories/src/categories.module';
import { AuthorModule } from 'apps/author/src/author.module';

@Module({
  imports: [
    PrismaModule,
    OrderModule,
    CategoriesModule,
    AuthorModule,

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
