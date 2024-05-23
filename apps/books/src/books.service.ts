import { Injectable } from '@nestjs/common';
import { BookRepository } from './books.repository';
import { OrderService } from 'apps/orders/src/order.service';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,

    private readonly orderService: OrderService,
  ) {}

  async findAll() {
    const books = await this.bookRepository.findAll();
    const final = books.map((book) => {
      const lastedPrice = book.prices[0];
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });
    return final;
  }

  async createBookPrice(data: any) {
    const price = await this.bookRepository.createBookPrice(data);
    return price;
  }

  async getRecommendBooks() {
    const books = await this.bookRepository.getRecommendBooksByRating();
    return books;
  }

  async getBookPopular() {
    const books = await this.orderService.getAllOrderCompletedOfBook();
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
