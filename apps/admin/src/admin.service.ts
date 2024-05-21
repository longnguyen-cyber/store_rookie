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
  async listRes(entityName: EntityNames, page: number = 1, limit: number = 5) {
    const entityService = this.getServiceFromEntityName(entityName);

    // Fetch the data for the current page
    const start = (page - 1) * limit;
    const end = page * limit;
    const allData = await entityService.findAll();
    const res = allData.slice(start, end);

    // Count the total number of items
    const total = allData.length;

    // Generate the pagination links
    const pagination = this.handlePagination(page, limit, total, entityName);

    return { data: res, pagination };
  }

  async deleteRes(entityName: EntityNames, id: string) {
    const entityService = this.getServiceFromEntityName(entityName);

    await entityService.delete(id);
  }

  async createRes(entityName: EntityNames, data: any) {
    const entityService = this.getServiceFromEntityName(entityName);
    if (entityName === 'promotions') {
      data.startDate = new Date(data.startDate);
      data.endDate = new Date(data.endDate);
      const books = await this.booksService.getBookByGenre(data.genre);
      delete data.genre;
      await Promise.all(
        books.map(async (book) => {
          await entityService.create({
            ...data,
            bookId: book.id,
            promotionType: 'discount',
          });
        }),
      );
      return true;
    } else {
      const rs = await entityService.create(data);
      return rs;
    }
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

  async getAllGerne() {
    const genres = await this.booksService.getAllGerne();
    console.log('Genres:', genres);
    return genres;
  }

  private handlePagination(
    pageStr: number,
    limit: number,
    total: number,
    entityName: EntityNames,
  ) {
    const page = parseInt(pageStr.toString());
    const totalPages = Math.ceil(total / limit);
    let nextPage = page + 1;
    if (nextPage > totalPages) {
      nextPage = totalPages;
    }

    let prevPage = page - 1;
    if (prevPage < 1) {
      prevPage = 1;
    }

    // Generate an array of page numbers
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return {
      nextPage: `/${entityName}?page=${nextPage}&limit=${limit}`,
      prevPage: `/${entityName}?page=${prevPage}&limit=${limit}`,
      pages,
      currentPage: page,
    };
  }
}
