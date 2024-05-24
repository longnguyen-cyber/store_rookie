import { CommonService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { AuthorService } from 'apps/author/src/author.service';
import { BookService } from 'apps/books/src/books.service';
import { CategoriesService } from 'apps/categories/src/categories.service';
import { OrderService } from 'apps/orders/src/order.service';
import { PromotionsService } from 'apps/promotions/src/promotions.service';
import { PublisherService } from 'apps/publisher/src/publisher.service';
import { ReviewsService } from 'apps/reviews/src/reviews.service';
import { UserService } from 'apps/user/src/user.service';

type Service =
  | CategoriesService
  | AuthorService
  | OrderService
  | BookService
  | PublisherService
  | PromotionsService
  | ReviewsService;

export type EntityNames =
  | 'author'
  | 'categories'
  | 'order'
  | 'books'
  | 'publisher'
  | 'promotions'
  | 'reviews';

@Injectable()
export class AdminService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly authorService: AuthorService,
    private readonly orderService: OrderService,
    private readonly booksService: BookService,
    private readonly publisherService: PublisherService,
    private readonly promotionsService: PromotionsService,
    private readonly reviewsService: ReviewsService,
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) {}

  async login(userLoginDto: any) {
    const login = await this.userService.login(userLoginDto);
    return login;
  }

  getServiceFromEntityName(entityName: EntityNames): Service {
    return this[`${entityName}Service`] as Service;
  }
  async listRes(entityName: EntityNames, page: number = 1, limit: number = 5) {
    const entityService = this.getServiceFromEntityName(entityName);

    // Fetch the data for the current page
    const start = (page - 1) * limit;
    const end = page * limit;
    const allData = (await entityService.findAll()).map((item) =>
      this.commonService.deleteField(item, ['']),
    );
    const res = allData.slice(start, end);

    // Count the total number of items
    const total = allData.length;

    // Generate the pagination links
    const pagination = this.handlePagination(page, limit, total, entityName);
    console.log('data');
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
      console.log('Data:', data);
      const books = await this.categoriesService.getBookByCategory(
        data.category,
      );
      delete data.category;
      await Promise.all(
        books.map(async (book) => {
          await this.booksService.createBookPrice({
            bookId: book.id,
            originalPrice: book.prices[0].originalPrice,
            old_price_id: book.prices[0].id,
          });

          await entityService.create({
            ...data,
            bookId: book.id,
            promotionType: 'percent',
          });
        }),
      );
      return true;
    } else if (entityName === 'books') {
      data.originalPrice = parseFloat(data.price);
      data.images = JSON.parse(data.images);
      const rs = await entityService.create(data);
      return rs;
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

  async getAllAuthors() {
    const authors = await this.authorService.findAll();
    return authors;
  }

  async getAllCategories() {
    const categories = await this.categoriesService.findAll();
    return categories;
  }

  async getAllPublishers() {
    const publishers = await this.publisherService.findAll();
    return publishers;
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
