import { Injectable } from '@nestjs/common';
import { BookRepository } from './books.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll() {
    const categories = await this.bookRepository.findAll();
    return categories;
  }

  async findOne(id: string) {
    const category = await this.bookRepository.findOne(id);
    return category;
  }

  async create(data: any) {
    const category = await this.bookRepository.create(data);
    return category;
  }

  async update(id: string, data: any) {
    const category = await this.bookRepository.update(id, data);
    return category;
  }

  async delete(id: string) {
    const category = await this.bookRepository.delete(id);
    return category;
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
