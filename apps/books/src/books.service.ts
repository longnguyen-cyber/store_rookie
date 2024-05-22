import { Injectable } from '@nestjs/common';
import { BookRepository } from './books.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll() {
    const books = await this.bookRepository.findAll();

    const final = books.map((book) => {
      const lastedPrice = this.lastedPrice(book.prices);
      return {
        ...book,
        prices: [lastedPrice],
        createdAt: lastedPrice.createdAt,
      };
    });
    return final;
  }

  private lastedPrice(prices: any[]) {
    return prices.reduce((acc, cur) => {
      if (acc.createdAt < cur.createdAt) {
        return cur;
      }
      return acc;
    });
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

  async getAllGerne() {
    const genres = await this.bookRepository.getAllGerne();
    return [...new Set(genres.map((genre) => genre.genre))];
  }

  async getBookByGenre(genre: string) {
    const books = await this.bookRepository.getBookByGenre(genre);
    return books;
  }
}
