import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CategoriesModule } from 'apps/categories/src/categories.module';
import { BooksModule } from 'apps/books/src/books.module';
import { AuthorModule } from 'apps/author/src/author.module';
import { ReviewsModule } from 'apps/reviews/src/reviews.module';
import { PublisherModule } from 'apps/publisher/src/publisher.module';
import { ProcessModule } from 'apps/process/src/process.module';
import { PromotionsModule } from 'apps/promotions/src/promotions.module';
import { CloudinaryModule } from '@app/common';
import { CacheModule } from '@app/cache';
import { AuthModule } from 'apps/auth/src/auth.module';
import { UserModule } from 'apps/user/src/user.module';

@Module({
  imports: [
    CategoriesModule,
    BooksModule,
    AuthorModule,
    ReviewsModule,
    CacheModule.register(),
    UserModule,
    AuthModule,
    PublisherModule,
    ProcessModule,
    PromotionsModule,
    CloudinaryModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
