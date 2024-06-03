import { PrismaModule } from '@app/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorModule } from 'apps/author/src/author.module';
import { BooksModule } from 'apps/books/src/books.module';
import { CartModule } from 'apps/cart/src/cart.module';
import { CategoriesModule } from 'apps/categories/src/categories.module';
import { OrderModule } from 'apps/orders/src/order.module';
import { PromotionsModule } from 'apps/promotions/src/promotions.module';
import { PublisherModule } from 'apps/publisher/src/publisher.module';
import { ReviewsModule } from 'apps/reviews/src/reviews.module';
import { UserModule } from 'apps/user/src/user.module';
import { AppService } from './app.service';
import { GatewayResolver } from './getway.resolver';

@Module({
  imports: [
    AuthorModule,
    BooksModule,
    CategoriesModule,
    OrderModule,
    PromotionsModule,
    PublisherModule,
    ReviewsModule,
    PrismaModule,
    UserModule,
    CartModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: '~schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [AppService, GatewayResolver],
})
export class AppModule {}
