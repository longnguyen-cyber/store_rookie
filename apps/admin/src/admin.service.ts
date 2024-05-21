import { Injectable } from '@nestjs/common';
import { AuthorService } from 'apps/author/src/author.service';
import { BookService } from 'apps/books/src/books.service';
import { CategoriesService } from 'apps/categories/src/categories.service';
import { ProcessService } from 'apps/process/src/process.service';
import { PromotionsService } from 'apps/promotions/src/promotions.service';
import { PublisherService } from 'apps/publisher/src/publisher.service';
import { ReviewsService } from 'apps/reviews/src/reviews.service';

type Service =
  | CategoriesService
  | AuthorService
  | ProcessService
  | BookService
  | PublisherService
  | PromotionsService
  | ReviewsService;

export type EntityNames =
  | 'author'
  | 'categories'
  | 'process'
  | 'books'
  | 'publisher'
  | 'promotions'
  | 'reviews';

@Injectable()
export class AdminService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly authorService: AuthorService,
    private readonly processService: ProcessService,
    private readonly booksService: BookService,
    private readonly publisherService: PublisherService,
    private readonly promotionsService: PromotionsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  getServiceFromEntityName(entityName: EntityNames): Service {
    return this[`${entityName}Service`] as Service;
  }

  async listRes(entityName: EntityNames) {
    const entityService = this.getServiceFromEntityName(entityName);

    const res = await entityService.findAll();
    return res;
  }

  async deleteRes(entityName: EntityNames, id: string) {
    const entityService = this.getServiceFromEntityName(entityName);

    await entityService.delete(id);
  }

  async createRes(entityName: EntityNames, data: any) {
    const entityService = this.getServiceFromEntityName(entityName);

    await entityService.create(data);
  }

  async updateRes(entityName: EntityNames, id: string, data: any) {
    const entityService = this.getServiceFromEntityName(entityName);

    const rs = await entityService.update(id, data);
    return rs;
  }

  async getRes(entityName: EntityNames, id: string) {
    const entityService = this.getServiceFromEntityName(entityName);

    const res = await entityService.findOne(id);
    return res;
  }
}
