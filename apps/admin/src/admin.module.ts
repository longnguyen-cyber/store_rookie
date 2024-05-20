import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CategoriesModule } from 'apps/categories/src/categories.module';

@Module({
  imports: [CategoriesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
