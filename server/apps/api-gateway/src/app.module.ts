import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderResolver } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from 'apps/author/src/author.module';
import { BooksModule } from 'apps/books/src/books.module';
import { CategoriesModule } from 'apps/categories/src/categories.module';
import { OrderModule } from 'apps/orders/src/order.module';
import { PromotionsModule } from 'apps/promotions/src/promotions.module';
import { PublisherModule } from 'apps/publisher/src/publisher.module';
import { ReviewsModule } from 'apps/reviews/src/reviews.module';
import { UserModule } from 'apps/user/src/user.module';

@Module({
  imports: [
    AuthorModule,
    BooksModule,
    CategoriesModule,
    OrderModule,
    PromotionsModule,
    PublisherModule,
    ReviewsModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [AppService, OrderResolver],
})
export class AppModule {}
