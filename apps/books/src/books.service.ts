import { Injectable } from '@nestjs/common';
import { BookRepository } from './books.repository';
import { OrderService } from 'apps/orders/src/order.service';
import { CategoriesService } from 'apps/categories/src/categories.service';
import { AuthorService } from 'apps/author/src/author.service';
import { QUERY_ORDER } from '@app/common';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly categoriesService: CategoriesService,
    private readonly orderService: OrderService,
    private readonly authorService: AuthorService,
  ) {}

  async findAll() {
    const books = await this.bookRepository.findAll();
    const final = books.map((book) => {
      const lastedPrice = book.prices.find((p) => p.endDate === null);
      console.log(lastedPrice);
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });
    return final;
  }

  async getBookByCategory(category_id: string) {
    const books = await this.categoriesService.getBookByCategory(category_id);
    return books;
  }

  async createBookPrice(data: any) {
    const price = await this.bookRepository.createBookPrice(data);
    return price;
  }

  async getRecommendBooks() {
    const books = await this.bookRepository.getRecommendBooksByRating();
    return books;
  }

  async getBookByPrice(type: QUERY_ORDER) {
    const books = await this.findAll();
    if (type === QUERY_ORDER.ASC) {
      return books.sort(
        (a, b) => a.prices[0].originalPrice - b.prices[0].originalPrice,
      );
    } else {
      return books.sort(
        (a, b) => b.prices[0].originalPrice - a.prices[0].originalPrice,
      );
    }
  }

  async getBookByRating(star: number) {
    const books = await this.bookRepository.getBookByRating(star);
    return books;
  }

  async getBookPopular() {
    const books = await this.orderService.getAllOrderCompletedOfBook();
    return books;
  }

  async getBookByAuthor(author_id: string) {
    const books = await this.authorService.getBookByAuthor(author_id);
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne(id);
    return book;
  }

  async create(data: any) {
    const book = await this.bookRepository.create(data);
    return book;
  }

  async update(id: string, data: any) {
    const book = await this.bookRepository.update(id, data);
    return book;
  }

  async delete(id: string) {
    const book = await this.bookRepository.delete(id);
    return book;
  }
}
